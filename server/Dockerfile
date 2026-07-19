FROM oven/bun:1

# Prisma needs openssl for its query engine
RUN apt-get update && apt-get install -y openssl ca-certificates \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Install deps first (better layer caching)
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# App source
COPY . .

# Generate Prisma client for the container's platform
RUN bunx prisma generate

EXPOSE 3042

# Apply pending migrations, then start the server
CMD ["sh", "-c", "bunx prisma migrate deploy && bun src/app.ts"]
