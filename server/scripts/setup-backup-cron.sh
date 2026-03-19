#!/bin/bash
# ============================================================
# Setup automatic daily database backup to R2
# Runs daily at 11:55 PM IST (18:25 UTC)
#
# Usage:
#   bash scripts/setup-backup-cron.sh          # install cron
#   bash scripts/setup-backup-cron.sh --remove # remove cron
#   bash scripts/setup-backup-cron.sh --test   # run backup now
# ============================================================

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
SERVER_DIR="$(dirname "$SCRIPT_DIR")"
BACKUP_SCRIPT="$SERVER_DIR/scripts/db-backup.ts"
LOG_FILE="/var/log/adverify-backup.log"
CRON_TAG="# adverify-db-backup"

# IST 11:55 PM = UTC 18:25
CRON_SCHEDULE="25 18 * * *"
CRON_CMD="cd $SERVER_DIR && npx tsx $BACKUP_SCRIPT >> $LOG_FILE 2>&1 $CRON_TAG"

if [ "$1" = "--test" ]; then
    echo "Running backup now..."
    cd "$SERVER_DIR"
    npx tsx "$BACKUP_SCRIPT"
    exit 0
fi

if [ "$1" = "--remove" ]; then
    echo "Removing adverify backup cron..."
    crontab -l 2>/dev/null | grep -v "$CRON_TAG" | crontab -
    echo "Done. Cron removed."
    exit 0
fi

# Create log file if it doesn't exist
sudo touch "$LOG_FILE" 2>/dev/null || touch "$LOG_FILE"
sudo chmod 666 "$LOG_FILE" 2>/dev/null || true

# Remove existing adverify cron entry (if any) then add new one
(crontab -l 2>/dev/null | grep -v "$CRON_TAG"; echo "$CRON_SCHEDULE $CRON_CMD") | crontab -

echo "✅ Cron job installed!"
echo ""
echo "  Schedule: Daily at 11:55 PM IST (18:25 UTC)"
echo "  Log file: $LOG_FILE"
echo "  Script:   $BACKUP_SCRIPT"
echo ""
echo "Current crontab:"
crontab -l | grep adverify
echo ""
echo "Commands:"
echo "  Test now:    bash scripts/setup-backup-cron.sh --test"
echo "  Remove cron: bash scripts/setup-backup-cron.sh --remove"
echo "  View logs:   tail -f $LOG_FILE"
