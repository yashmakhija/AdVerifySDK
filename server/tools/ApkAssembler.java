import java.io.*;
import java.util.*;
import java.util.zip.*;

/**
 * Assembles a patched APK by copying entries from the original APK,
 * replacing/adding specified files, and skipping META-INF signatures.
 *
 * Usage: java ApkAssembler <input.apk> <output.apk> <add_dir>
 *
 * - All files in <add_dir> are added to the APK (replacing same-named entries)
 * - META-INF signature files (*.SF, *.RSA, *.DSA, *.EC, MANIFEST.MF) are stripped
 * - Non-signature META-INF files are preserved
 * - Original compression method is preserved for copied entries
 */
public class ApkAssembler {

    private static final Set<String> SIGNATURE_FILES = Set.of(
        "META-INF/MANIFEST.MF"
    );

    private static final Set<String> SIGNATURE_EXTENSIONS = Set.of(
        ".SF", ".RSA", ".DSA", ".EC"
    );

    public static void main(String[] args) throws Exception {
        if (args.length < 3) {
            System.err.println("Usage: java ApkAssembler <input.apk> <output.apk> <add_dir>");
            System.exit(1);
        }

        String inputPath = args[0];
        String outputPath = args[1];
        File addDir = new File(args[2]);

        // Collect files to add/replace
        Map<String, File> additions = new TreeMap<>();
        if (addDir.isDirectory()) {
            collectFiles(addDir, addDir, additions);
        }

        int copied = 0, replaced = 0, added = 0, skipped = 0;

        try (ZipFile input = new ZipFile(inputPath);
             FileOutputStream fos = new FileOutputStream(outputPath);
             ZipOutputStream output = new ZipOutputStream(fos)) {

            // Copy original entries
            Enumeration<? extends ZipEntry> entries = input.entries();
            while (entries.hasMoreElements()) {
                ZipEntry entry = entries.nextElement();
                String name = entry.getName();

                // Skip signature files
                if (isSignatureFile(name)) {
                    skipped++;
                    continue;
                }

                // Skip if we're replacing this entry
                if (additions.containsKey(name)) {
                    continue;
                }

                // Copy entry preserving compression method
                ZipEntry newEntry = new ZipEntry(name);
                newEntry.setMethod(entry.getMethod());
                newEntry.setTime(entry.getTime());

                if (entry.getMethod() == ZipEntry.STORED) {
                    newEntry.setSize(entry.getSize());
                    newEntry.setCompressedSize(entry.getCompressedSize());
                    newEntry.setCrc(entry.getCrc());
                }

                output.putNextEntry(newEntry);
                try (InputStream is = input.getInputStream(entry)) {
                    is.transferTo(output);
                }
                output.closeEntry();
                copied++;
            }

            // Add new/replacement files
            for (Map.Entry<String, File> e : additions.entrySet()) {
                String name = e.getKey();
                File file = e.getValue();

                ZipEntry newEntry = new ZipEntry(name);
                newEntry.setMethod(ZipEntry.DEFLATED);
                newEntry.setTime(file.lastModified());

                output.putNextEntry(newEntry);
                try (FileInputStream fis = new FileInputStream(file)) {
                    fis.transferTo(output);
                }
                output.closeEntry();

                // Check if this replaced an existing entry
                if (input.getEntry(name) != null) {
                    replaced++;
                } else {
                    added++;
                }
            }
        }

        System.out.println("OK: copied=" + copied + " replaced=" + replaced +
                           " added=" + added + " signaturesRemoved=" + skipped);
    }

    private static boolean isSignatureFile(String name) {
        if (!name.startsWith("META-INF/")) return false;

        if (SIGNATURE_FILES.contains(name)) return true;

        // Check for signature file extensions in META-INF root
        String fileName = name.substring("META-INF/".length());
        if (fileName.contains("/")) return false; // not in META-INF root

        for (String ext : SIGNATURE_EXTENSIONS) {
            if (fileName.toUpperCase().endsWith(ext)) return true;
        }

        // Also match CERT.* pattern
        if (fileName.toUpperCase().startsWith("CERT.")) return true;

        return false;
    }

    private static void collectFiles(File root, File dir, Map<String, File> files) {
        File[] children = dir.listFiles();
        if (children == null) return;

        for (File f : children) {
            if (f.isDirectory()) {
                collectFiles(root, f, files);
            } else {
                String relPath = root.toPath().relativize(f.toPath()).toString();
                files.put(relPath, f);
            }
        }
    }
}
