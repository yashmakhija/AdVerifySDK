import java.io.*;
import java.nio.*;
import java.nio.charset.*;
import java.util.*;

/**
 * Surgical binary AndroidManifest.xml (AXML) patcher.
 * Preserves original string pool bytes verbatim and appends new strings.
 * Injects a ContentProvider element as the first child of <application>.
 *
 * Usage: java ManifestPatcher <manifest.xml> <package>
 */
public class ManifestPatcher {

    static final int CHUNK_STRINGPOOL  = 0x001C0001;
    static final int CHUNK_RESOURCEIDS = 0x00080180;
    static final int CHUNK_START_TAG   = 0x00100102;
    static final int CHUNK_END_TAG     = 0x00100103;

    static final int ATTR_NAME        = 0x01010003;
    static final int ATTR_AUTHORITIES = 0x01010018;
    static final int ATTR_EXPORTED    = 0x01010010;

    static final int TYPE_STRING      = 0x03;
    static final int TYPE_INT_BOOLEAN = 0x12;

    public static void main(String[] args) throws Exception {
        if (args.length < 2) {
            System.err.println("Usage: java ManifestPatcher <manifest> <package>");
            System.exit(1);
        }
        byte[] data = readFile(args[0]);
        byte[] patched = patchManifest(data, args[1]);
        writeFile(args[0], patched);
        System.out.println("OK: provider injected");
    }

    static byte[] patchManifest(byte[] original, String pkg) throws Exception {
        ByteBuffer buf = ByteBuffer.wrap(original).order(ByteOrder.LITTLE_ENDIAN);

        // ─── 1. Parse string pool header ───
        int spChunkStart = 8; // right after XML file header (type:4 + size:4)
        buf.position(spChunkStart);
        int spType = buf.getInt();
        if (spType != CHUNK_STRINGPOOL) throw new RuntimeException("Expected string pool at offset 8");
        int spSize = buf.getInt();
        int stringCount = buf.getInt();
        int styleCount = buf.getInt();
        int spFlags = buf.getInt();
        int stringsStart = buf.getInt(); // offset from chunk start to string data
        int stylesStart = buf.getInt();  // offset from chunk start to style data (0 = none)
        boolean isUtf8 = (spFlags & 0x100) != 0;

        // String offset array
        int offsetsAbsStart = spChunkStart + 28; // 28 = header size
        int[] stringOffsets = new int[stringCount];
        for (int i = 0; i < stringCount; i++) {
            stringOffsets[i] = buf.getInt();
        }
        int styleOffsetsAbsStart = offsetsAbsStart + stringCount * 4;
        int styleOffsetsLen = styleCount * 4;

        // Decode strings (to find reusable indices and tag names)
        int strDataAbsStart = spChunkStart + stringsStart;
        String[] strings = new String[stringCount];
        for (int i = 0; i < stringCount; i++) {
            strings[i] = readString(original, strDataAbsStart + stringOffsets[i], isUtf8);
        }

        // String data and style data boundaries
        int strDataAbsEnd = (stylesStart > 0) ? (spChunkStart + stylesStart) : (spChunkStart + spSize);
        int origStrDataLen = strDataAbsEnd - strDataAbsStart;
        int styleDataAbsStart = (stylesStart > 0) ? (spChunkStart + stylesStart) : 0;
        int styleDataLen = (stylesStart > 0) ? (spChunkStart + spSize - styleDataAbsStart) : 0;

        // ─── 2. Parse resource ID table ───
        int resIdChunkPos = spChunkStart + spSize;
        buf.position(resIdChunkPos);
        int resIdType = buf.getInt();
        int resIdSize = buf.getInt();
        int[] resourceIds = new int[0];
        if (resIdType == CHUNK_RESOURCEIDS) {
            int count = (resIdSize - 8) / 4;
            resourceIds = new int[count];
            for (int i = 0; i < count; i++) resourceIds[i] = buf.getInt();
        }

        int nameAttrIdx = findResIdx(resourceIds, ATTR_NAME);
        int authAttrIdx = findResIdx(resourceIds, ATTR_AUTHORITIES);
        int expAttrIdx  = findResIdx(resourceIds, ATTR_EXPORTED);
        if (nameAttrIdx < 0 || authAttrIdx < 0 || expAttrIdx < 0) {
            throw new RuntimeException("Required attr IDs missing: name=" + nameAttrIdx
                + " authorities=" + authAttrIdx + " exported=" + expAttrIdx);
        }

        // Android namespace URI
        int androidNsIdx = -1;
        for (int i = 0; i < strings.length; i++) {
            if ("http://schemas.android.com/apk/res/android".equals(strings[i])) {
                androidNsIdx = i;
                break;
            }
        }
        if (androidNsIdx < 0) throw new RuntimeException("Android namespace not found");

        // ─── 3. Find <application> start tag ───
        int afterResIds = resIdChunkPos + resIdSize;
        buf.position(afterResIds);
        int appStartTagEnd = -1;

        while (buf.remaining() >= 8) {
            int pos = buf.position();
            int type = buf.getInt();
            int size = buf.getInt();
            if (type == CHUNK_START_TAG) {
                buf.position(pos + 16);
                buf.getInt(); // ns
                int ni = buf.getInt();
                if (ni >= 0 && ni < strings.length && "application".equals(strings[ni])) {
                    appStartTagEnd = pos + size;
                    break;
                }
            }
            buf.position(pos + size);
        }
        if (appStartTagEnd < 0) throw new RuntimeException("<application> not found");

        // ─── 4. Determine new strings ───
        String[] candidates = {
            "provider",
            "com.adverify.sdk.AdVerifyInitProvider",
            pkg + ".adverify.init",
        };

        Map<String, Integer> strMap = new HashMap<>();
        for (int i = 0; i < strings.length; i++) strMap.put(strings[i], i);

        int[] newIdx = new int[candidates.length];
        List<String> toAdd = new ArrayList<>();
        int nextI = stringCount;
        for (int i = 0; i < candidates.length; i++) {
            Integer ex = strMap.get(candidates[i]);
            if (ex != null) {
                newIdx[i] = ex;
            } else {
                newIdx[i] = nextI++;
                toAdd.add(candidates[i]);
                strMap.put(candidates[i], newIdx[i]);
            }
        }
        int addCount = toAdd.size();

        // ─── 5. Surgical string pool: copy original bytes, append new ───
        byte[][] encodedNew = new byte[addCount][];
        for (int i = 0; i < addCount; i++) {
            encodedNew[i] = encodeString(toAdd.get(i), isUtf8);
        }

        int appendOff = origStrDataLen;
        int[] addOffsets = new int[addCount];
        for (int i = 0; i < addCount; i++) {
            addOffsets[i] = appendOff;
            appendOff += encodedNew[i].length;
        }
        int addedDataLen = appendOff - origStrDataLen;

        int newCount = stringCount + addCount;
        int newStringsStart = 28 + newCount * 4 + styleCount * 4;
        int newStylesStart = (stylesStart > 0) ? (newStringsStart + origStrDataLen + addedDataLen) : 0;
        int rawSpSize = newStringsStart + origStrDataLen + addedDataLen + styleDataLen;
        int spPad = (4 - (rawSpSize % 4)) % 4;
        int newSpSize = rawSpSize + spPad;

        ByteBuffer sp = ByteBuffer.allocate(newSpSize).order(ByteOrder.LITTLE_ENDIAN);
        sp.putInt(CHUNK_STRINGPOOL);
        sp.putInt(newSpSize);
        sp.putInt(newCount);
        sp.putInt(styleCount);
        sp.putInt(spFlags);
        sp.putInt(newStringsStart);
        sp.putInt(newStylesStart);

        // Original string offsets — VERBATIM
        sp.put(original, offsetsAbsStart, stringCount * 4);
        // New string offsets
        for (int o : addOffsets) sp.putInt(o);
        // Style offsets — VERBATIM
        if (styleOffsetsLen > 0) sp.put(original, styleOffsetsAbsStart, styleOffsetsLen);
        // Original string data — VERBATIM (key difference from old version!)
        sp.put(original, strDataAbsStart, origStrDataLen);
        // New string data
        for (byte[] e : encodedNew) sp.put(e);
        // Style data — VERBATIM
        if (styleDataLen > 0) sp.put(original, styleDataAbsStart, styleDataLen);
        // Padding
        for (int i = 0; i < spPad; i++) sp.put((byte) 0);

        // ─── 6. Build provider element ───
        ByteArrayOutputStream inj = new ByteArrayOutputStream();
        writeStartTag(inj, -1, newIdx[0],
            new int[]{androidNsIdx, androidNsIdx, androidNsIdx},
            new int[]{nameAttrIdx, authAttrIdx, expAttrIdx},
            new int[]{newIdx[1], newIdx[2], -1},
            new int[]{TYPE_STRING, TYPE_STRING, TYPE_INT_BOOLEAN},
            new int[]{newIdx[1], newIdx[2], 0}); // 0 = false
        writeEndTag(inj, -1, newIdx[0]);
        byte[] injBytes = inj.toByteArray();

        // ─── 7. Assemble file ───
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        out.write(original, 0, 8);                                         // XML header
        out.write(sp.array());                                             // surgical string pool
        out.write(original, resIdChunkPos, resIdSize);                     // resource IDs (unchanged)
        out.write(original, afterResIds, appStartTagEnd - afterResIds);    // up to after <application>
        out.write(injBytes);                                               // provider (first child)
        out.write(original, appStartTagEnd, original.length - appStartTagEnd); // rest

        byte[] result = out.toByteArray();
        ByteBuffer.wrap(result).order(ByteOrder.LITTLE_ENDIAN).putInt(4, result.length);
        return result;
    }

    static int findResIdx(int[] ids, int target) {
        for (int i = 0; i < ids.length; i++) if (ids[i] == target) return i;
        return -1;
    }

    static void writeStartTag(ByteArrayOutputStream out, int nsIdx, int nameIdx,
                               int[] aNs, int[] aName, int[] aRaw, int[] aType, int[] aData) {
        int n = aName.length;
        int size = 36 + n * 20;
        ByteBuffer b = ByteBuffer.allocate(size).order(ByteOrder.LITTLE_ENDIAN);
        b.putInt(CHUNK_START_TAG); b.putInt(size);
        b.putInt(0); b.putInt(0xFFFFFFFF);
        b.putInt(nsIdx < 0 ? 0xFFFFFFFF : nsIdx); b.putInt(nameIdx);
        b.putShort((short) 0x14); b.putShort((short) 0x14);
        b.putShort((short) n);
        b.putShort((short) 0); b.putShort((short) 0); b.putShort((short) 0);
        for (int i = 0; i < n; i++) {
            b.putInt(aNs[i]); b.putInt(aName[i]); b.putInt(aRaw[i]);
            b.putShort((short) 8); b.put((byte) 0); b.put((byte) aType[i]); b.putInt(aData[i]);
        }
        out.write(b.array(), 0, size);
    }

    static void writeEndTag(ByteArrayOutputStream out, int nsIdx, int nameIdx) {
        ByteBuffer b = ByteBuffer.allocate(24).order(ByteOrder.LITTLE_ENDIAN);
        b.putInt(CHUNK_END_TAG); b.putInt(24);
        b.putInt(0); b.putInt(0xFFFFFFFF);
        b.putInt(nsIdx < 0 ? 0xFFFFFFFF : nsIdx); b.putInt(nameIdx);
        out.write(b.array(), 0, 24);
    }

    static byte[] encodeString(String s, boolean isUtf8) {
        if (isUtf8) {
            byte[] utf8 = s.getBytes(StandardCharsets.UTF_8);
            ByteArrayOutputStream bos = new ByteArrayOutputStream();
            writeLen(bos, s.length(), 127);
            writeLen(bos, utf8.length, 127);
            bos.write(utf8, 0, utf8.length);
            bos.write(0);
            return bos.toByteArray();
        } else {
            byte[] utf16 = s.getBytes(StandardCharsets.UTF_16LE);
            ByteArrayOutputStream bos = new ByteArrayOutputStream();
            int charLen = s.length();
            bos.write(charLen & 0xFF);
            bos.write((charLen >> 8) & 0xFF);
            bos.write(utf16, 0, utf16.length);
            bos.write(0); bos.write(0);
            return bos.toByteArray();
        }
    }

    static void writeLen(ByteArrayOutputStream bos, int len, int max) {
        if (len > max) {
            bos.write(((len >> 8) & 0x7F) | 0x80);
            bos.write(len & 0xFF);
        } else {
            bos.write(len);
        }
    }

    static String readString(byte[] data, int offset, boolean isUtf8) {
        if (isUtf8) {
            int charLen = data[offset++] & 0xFF;
            if ((charLen & 0x80) != 0) { charLen = ((charLen & 0x7F) << 8) | (data[offset++] & 0xFF); }
            int byteLen = data[offset++] & 0xFF;
            if ((byteLen & 0x80) != 0) { byteLen = ((byteLen & 0x7F) << 8) | (data[offset++] & 0xFF); }
            return new String(data, offset, byteLen, StandardCharsets.UTF_8);
        } else {
            int charLen = (data[offset] & 0xFF) | ((data[offset + 1] & 0xFF) << 8);
            offset += 2;
            if ((charLen & 0x8000) != 0) {
                charLen = ((charLen & 0x7FFF) << 16) | ((data[offset] & 0xFF) | ((data[offset + 1] & 0xFF) << 8));
                offset += 2;
            }
            return new String(data, offset, charLen * 2, StandardCharsets.UTF_16LE);
        }
    }

    static byte[] readFile(String path) throws IOException {
        try (var fis = new FileInputStream(path)) { return fis.readAllBytes(); }
    }

    static void writeFile(String path, byte[] data) throws IOException {
        try (var fos = new FileOutputStream(path)) { fos.write(data); }
    }
}
