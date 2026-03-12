#!/bin/bash
# ============================================================
# Build adverify.dex for MT Manager integration
# No Gradle needed — uses javac + d8 directly
# ============================================================

set -e
cd "$(dirname "$0")"

SDK_DIR="$HOME/Library/Android/sdk"
ANDROID_JAR="$SDK_DIR/platforms/android-34/android.jar"
D8="$SDK_DIR/build-tools/34.0.0/d8"
SRC_DIR="adverify/src/main/java"
OUT_DIR="out"
BUILD_DIR="$OUT_DIR/classes"

# Check tools exist
if [ ! -f "$ANDROID_JAR" ]; then
    echo "❌ android.jar not found. Install Android SDK Platform 34."
    exit 1
fi
if [ ! -f "$D8" ]; then
    echo "❌ d8 not found. Install Android SDK Build-Tools 34."
    exit 1
fi

# Clean
rm -rf "$OUT_DIR"
mkdir -p "$BUILD_DIR"

echo "📦 Compiling Java files..."
find "$SRC_DIR" -name "*.java" > "$OUT_DIR/sources.txt"
javac \
    --release 11 \
    -classpath "$ANDROID_JAR" \
    -d "$BUILD_DIR" \
    @"$OUT_DIR/sources.txt" \
    2>&1

echo "🔧 Converting to DEX..."
# Create JAR from classes
jar cf "$OUT_DIR/adverify.jar" -C "$BUILD_DIR" .

# Convert to DEX
"$D8" --lib "$ANDROID_JAR" --output "$OUT_DIR" "$OUT_DIR/adverify.jar"

# Rename to adverify.dex
mv "$OUT_DIR/classes.dex" "$OUT_DIR/adverify.dex"

# Cleanup
rm -rf "$BUILD_DIR" "$OUT_DIR/sources.txt" "$OUT_DIR/adverify.jar"

echo ""
echo "✅ Build successful!"
echo "📁 Output: $OUT_DIR/adverify.dex"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "MT Manager steps:"
echo "1. Copy out/adverify.dex into your APK"
echo "2. Add smali hook (see mt-manager-hook.smali)"
echo "3. Make sure AndroidManifest.xml has INTERNET permission"
echo "4. Rebuild & sign"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
