FROM eclipse-temurin:21-jdk-alpine

RUN apk add --no-cache bash curl

# Install apktool v3.0.1
RUN curl -L -o /usr/local/bin/apktool.jar \
    https://github.com/iBotPeaches/Apktool/releases/download/v3.0.1/apktool_3.0.1.jar \
    && printf '#!/bin/bash\njava -jar /usr/local/bin/apktool.jar "$@"\n' > /usr/local/bin/apktool \
    && chmod +x /usr/local/bin/apktool

# Generate debug keystore for signing
RUN keytool -genkey -v -keystore /opt/debug.keystore -alias androiddebugkey \
    -keyalg RSA -keysize 2048 -validity 10000 \
    -storepass android -keypass android \
    -dname "CN=Debug,O=Android,C=US"

WORKDIR /work
