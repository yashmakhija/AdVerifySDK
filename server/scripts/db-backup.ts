/**
 * Database Backup → Cloudflare R2
 *
 * Takes a pg_dump snapshot and uploads it to R2 (S3-compatible).
 * Keeps last N backups and cleans up older ones.
 *
 * Usage:
 *   npx tsx scripts/db-backup.ts
 *   npx tsx scripts/db-backup.ts --keep 30
 *
 * Required env vars:
 *   DATABASE_URL       - PostgreSQL connection string
 *   R2_ENDPOINT        - e.g. https://<account-id>.r2.cloudflarestorage.com
 *   R2_ACCESS_KEY_ID   - R2 API token access key
 *   R2_SECRET_ACCESS_KEY - R2 API token secret
 *   R2_BUCKET          - Bucket name (default: adverify-backups)
 */

import { config } from "dotenv";
import { execSync } from "child_process";
import { createReadStream, statSync, unlinkSync, existsSync, mkdirSync } from "fs";
import { createHash } from "crypto";
import { basename, join } from "path";

config();

const DB_URL = process.env.DATABASE_URL;
const R2_ENDPOINT = process.env.R2_ENDPOINT;
const R2_ACCESS_KEY = process.env.R2_ACCESS_KEY_ID;
const R2_SECRET = process.env.R2_SECRET_ACCESS_KEY;
const R2_BUCKET = process.env.R2_BUCKET || "adverify-backups";
const KEEP_BACKUPS = parseInt(process.argv.find((a) => a.startsWith("--keep="))?.split("=")[1] || "14");

const TMP_DIR = join(process.cwd(), "tmp");
const PREFIX = "adverify-db";

function log(msg: string) {
  console.log(`[backup] ${new Date().toISOString()} ${msg}`);
}

function fatal(msg: string): never {
  console.error(`[backup] FATAL: ${msg}`);
  process.exit(1);
}

async function s3Request(method: string, path: string, body?: Buffer, headers: Record<string, string> = {}) {
  const { createHmac, createHash } = await import("crypto");

  const endpoint = R2_ENDPOINT!.replace(/\/$/, "");
  const host = endpoint.replace(/^https?:\/\//, "");
  const url = `${endpoint}/${R2_BUCKET}${path}`;

  const now = new Date();
  const dateStamp = now.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const shortDate = dateStamp.slice(0, 8);
  const region = "auto";
  const service = "s3";
  const scope = `${shortDate}/${region}/${service}/aws4_request`;

  // Payload hash
  const payloadHash = body
    ? createHash("sha256").update(body).digest("hex")
    : "UNSIGNED-PAYLOAD";

  // Canonical headers
  const canonicalHeaders = `host:${host}\nx-amz-content-sha256:${payloadHash}\nx-amz-date:${dateStamp}\n`;
  const signedHeaders = "host;x-amz-content-sha256;x-amz-date";

  // Canonical request
  const canonicalPath = `/${R2_BUCKET}${path.split("?")[0]}`;
  const canonicalQuery = path.includes("?") ? path.split("?")[1] : "";
  const canonicalRequest = [method, canonicalPath, canonicalQuery, canonicalHeaders, signedHeaders, payloadHash].join("\n");

  // String to sign
  const stringToSign = `AWS4-HMAC-SHA256\n${dateStamp}\n${scope}\n${createHash("sha256").update(canonicalRequest).digest("hex")}`;

  // Signing key
  const hmac = (key: Buffer | string, data: string) => createHmac("sha256", key).update(data).digest();
  const kDate = hmac(`AWS4${R2_SECRET}`, shortDate);
  const kRegion = hmac(kDate, region);
  const kService = hmac(kRegion, service);
  const kSigning = hmac(kService, "aws4_request");
  const signature = createHmac("sha256", kSigning).update(stringToSign).digest("hex");

  const authorization = `AWS4-HMAC-SHA256 Credential=${R2_ACCESS_KEY}/${scope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

  const res = await fetch(url, {
    method,
    headers: {
      Host: host,
      "x-amz-date": dateStamp,
      "x-amz-content-sha256": payloadHash,
      Authorization: authorization,
      ...headers,
    },
    body: body ?? undefined,
  });

  return res;
}

async function uploadToR2(filePath: string, key: string) {
  const stat = statSync(filePath);
  const buffer = await import("fs").then((fs) => fs.readFileSync(filePath));
  const md5 = createHash("md5").update(buffer).digest("base64");

  log(`Uploading ${basename(filePath)} (${(stat.size / 1024 / 1024).toFixed(2)} MB) → r2://${R2_BUCKET}/${key}`);

  const res = await s3Request("PUT", `/${key}`, buffer, {
    "Content-Type": "application/gzip",
    "Content-Length": String(stat.size),
  });

  if (!res.ok) {
    const text = await res.text();
    fatal(`R2 upload failed: ${res.status} ${text}`);
  }

  log(`Upload complete.`);
}

async function listBackups(): Promise<string[]> {
  const res = await s3Request("GET", `?prefix=${PREFIX}&max-keys=1000`);
  if (!res.ok) return [];

  const xml = await res.text();
  const keys: string[] = [];
  const regex = /<Key>([^<]+)<\/Key>/g;
  let match;
  while ((match = regex.exec(xml)) !== null) {
    keys.push(match[1]);
  }
  return keys.sort();
}

async function deleteFromR2(key: string) {
  log(`Deleting old backup: ${key}`);
  await s3Request("DELETE", `/${key}`);
}

async function cleanup() {
  const backups = await listBackups();
  if (backups.length <= KEEP_BACKUPS) {
    log(`${backups.length} backups exist, keeping all (limit: ${KEEP_BACKUPS})`);
    return;
  }

  const toDelete = backups.slice(0, backups.length - KEEP_BACKUPS);
  log(`Cleaning up ${toDelete.length} old backups...`);
  for (const key of toDelete) {
    await deleteFromR2(key);
  }
}

async function main() {
  // Validate env
  if (!DB_URL) fatal("DATABASE_URL is not set");
  if (!R2_ENDPOINT) fatal("R2_ENDPOINT is not set");
  if (!R2_ACCESS_KEY) fatal("R2_ACCESS_KEY_ID is not set");
  if (!R2_SECRET) fatal("R2_SECRET_ACCESS_KEY is not set");

  // Ensure tmp dir
  if (!existsSync(TMP_DIR)) mkdirSync(TMP_DIR, { recursive: true });

  // Generate filename with timestamp
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-").replace("T", "_").slice(0, 19);
  const filename = `${PREFIX}_${timestamp}.sql.gz`;
  const filepath = join(TMP_DIR, filename);

  // pg_dump — parse DATABASE_URL to extract parts for pg_dump env vars
  log("Taking database snapshot...");

  // Parse: postgresql://user:pass@host:port/dbname
  const dbUrl = new URL(DB_URL!);
  const pgEnv = {
    ...process.env,
    PGHOST: dbUrl.hostname,
    PGPORT: dbUrl.port || "5432",
    PGUSER: decodeURIComponent(dbUrl.username),
    PGPASSWORD: decodeURIComponent(dbUrl.password),
    PGDATABASE: dbUrl.pathname.slice(1), // remove leading /
  };

  log(`Database: ${pgEnv.PGDATABASE}@${pgEnv.PGHOST}:${pgEnv.PGPORT} as ${pgEnv.PGUSER}`);

  // Detect pg_dump: local binary or Docker container
  let useDocker = false;
  let dockerContainer = "";
  let pgDump = "";

  // Check local pg_dump first
  try {
    pgDump = execSync("which pg_dump 2>/dev/null", { encoding: "utf-8" }).trim();
  } catch {}

  if (!pgDump) {
    // Look for the right postgres Docker container by matching the DB user from DATABASE_URL
    try {
      // First try matching container name with the DB user/name
      const allContainers = execSync(
        'docker ps --filter "status=running" --format "{{.Names}}" 2>/dev/null',
        { encoding: "utf-8" }
      ).trim().split("\n").filter(Boolean);

      // Priority: match container name containing our db user or "freemodsapp"
      const dbUser = pgEnv.PGUSER || "";
      dockerContainer =
        allContainers.find(c => c.includes(dbUser)) ||
        allContainers.find(c => c.includes("freemodsapp")) ||
        allContainers.find(c => c.includes("adverify")) ||
        "";

      // Fallback: find any container with postgres image
      if (!dockerContainer) {
        dockerContainer = execSync(
          'docker ps --filter "status=running" --format "{{.Names}} {{.Image}}" 2>/dev/null | grep postgres | head -1',
          { encoding: "utf-8" }
        ).trim().split(" ")[0] || "";
      }
    } catch {}

    if (dockerContainer) {
      useDocker = true;
      log(`Using pg_dump via Docker container: ${dockerContainer}`);
    } else {
      fatal("pg_dump not found locally and no PostgreSQL Docker container found. Install postgresql-client or run PostgreSQL in Docker.");
    }
  } else {
    log(`Using pg_dump: ${pgDump}`);
  }

  const sqlFile = filepath.replace(".gz", "");

  try {
    if (useDocker) {
      // Run pg_dump inside Docker, stream output to local file
      // Use 127.0.0.1 inside container (localhost may resolve to IPv6 and fail)
      execSync(
        `docker exec -e PGPASSWORD="${pgEnv.PGPASSWORD}" ${dockerContainer} pg_dump -h 127.0.0.1 -p 5432 -U ${pgEnv.PGUSER} --no-owner --no-acl ${pgEnv.PGDATABASE} > "${sqlFile}"`,
        { stdio: ["pipe", "pipe", "inherit"], timeout: 120_000 }
      );
    } else {
      execSync(`"${pgDump}" --no-owner --no-acl -f "${sqlFile}"`, {
        env: pgEnv,
        stdio: ["pipe", "pipe", "inherit"],
        timeout: 120_000,
      });
    }
  } catch (e: any) {
    if (existsSync(sqlFile)) unlinkSync(sqlFile);
    fatal(`pg_dump failed: ${e.stderr?.toString() || e.message}`);
  }

  if (!existsSync(sqlFile) || statSync(sqlFile).size < 100) {
    if (existsSync(sqlFile)) unlinkSync(sqlFile);
    fatal("pg_dump produced empty output — check DATABASE_URL and that the database exists");
  }

  // Gzip
  execSync(`gzip -f "${sqlFile}"`, { timeout: 30_000 });

  const size = statSync(filepath).size;

  log(`Snapshot: ${filename} (${(size / 1024).toFixed(1)} KB)`);

  // Upload to R2
  await uploadToR2(filepath, filename);

  // Cleanup local file
  unlinkSync(filepath);
  log("Local temp file removed.");

  // Cleanup old backups in R2
  await cleanup();

  log("Done.");
}

main().catch((e) => {
  console.error("[backup] Unexpected error:", e);
  process.exit(1);
});
