FROM --platform=linux/amd64 eclipse-temurin:21-jdk

RUN apt-get update && apt-get install -y --no-install-recommends \
    curl unzip zip \
    && rm -rf /var/lib/apt/lists/*

# Install apktool v2.10.0
RUN curl -L -o /usr/local/bin/apktool.jar \
    https://github.com/iBotPeaches/Apktool/releases/download/v2.10.0/apktool_2.10.0.jar \
    && printf '#!/bin/bash\njava -jar /usr/local/bin/apktool.jar "$@"\n' > /usr/local/bin/apktool \
    && chmod +x /usr/local/bin/apktool

# Install smali assembler + baksmali disassembler
RUN curl -L -o /usr/local/bin/smali.jar \
    https://bitbucket.org/JesusFreke/smali/downloads/smali-2.5.2.jar \
    && printf '#!/bin/bash\njava -jar /usr/local/bin/smali.jar "$@"\n' > /usr/local/bin/smali \
    && chmod +x /usr/local/bin/smali \
    && curl -L -o /usr/local/bin/baksmali.jar \
    https://bitbucket.org/JesusFreke/smali/downloads/baksmali-2.5.2.jar \
    && printf '#!/bin/bash\njava -jar /usr/local/bin/baksmali.jar "$@"\n' > /usr/local/bin/baksmali \
    && chmod +x /usr/local/bin/baksmali

# Install Android build-tools (zipalign + apksigner)
# Using linux/amd64 platform so all native binaries work correctly
ENV ANDROID_HOME=/opt/android-sdk
RUN mkdir -p ${ANDROID_HOME}/cmdline-tools \
    && curl -sL -o /tmp/cmdline-tools.zip \
       "https://dl.google.com/android/repository/commandlinetools-linux-11076708_latest.zip" \
    && unzip -q /tmp/cmdline-tools.zip -d ${ANDROID_HOME}/cmdline-tools \
    && mv ${ANDROID_HOME}/cmdline-tools/cmdline-tools ${ANDROID_HOME}/cmdline-tools/latest \
    && rm /tmp/cmdline-tools.zip \
    && yes | ${ANDROID_HOME}/cmdline-tools/latest/bin/sdkmanager --sdk_root=${ANDROID_HOME} "build-tools;34.0.0" "platforms;android-34" 2>/dev/null \
    && rm -rf ${ANDROID_HOME}/cmdline-tools ${ANDROID_HOME}/emulator ${ANDROID_HOME}/patcher
ENV PATH="${ANDROID_HOME}/build-tools/34.0.0:${PATH}"

# Generate debug keystore for signing
RUN keytool -genkey -v -keystore /opt/debug.keystore -alias androiddebugkey \
    -keyalg RSA -keysize 2048 -validity 10000 \
    -storepass android -keypass android \
    -dname "CN=Debug,O=Android,C=US"

# Compile Java tools
COPY ManifestPatcher.java ApkAssembler.java /opt/src/
RUN javac -d /opt /opt/src/*.java && rm -rf /opt/src

WORKDIR /work
