# ============================================================
# AdVerify SDK — MT Manager Smali Hook
# ============================================================
#
# Add these 3 lines inside the launcher Activity's onCreate()
# method, AFTER the call to super.onCreate()
#
# Replace:
#   YOUR_API_KEY       → your actual API key from admin panel
#   YOUR_SERVER_URL    → your actual server URL
#
# ============================================================

# --- COPY FROM HERE ---

    const-string v0, "YOUR_API_KEY"

    const-string v1, "YOUR_SERVER_URL"

    invoke-static {p0, v0, v1}, Lcom/adverify/sdk/AdVerify;->start(Landroid/app/Activity;Ljava/lang/String;Ljava/lang/String;)V

# --- COPY TO HERE ---


# ============================================================
# FULL EXAMPLE — what it looks like inside an Activity:
# ============================================================
#
# .method protected onCreate(Landroid/os/Bundle;)V
#     .locals 2
#
#     invoke-super {p0, p1}, Landroid/app/Activity;->onCreate(Landroid/os/Bundle;)V
#
#     # --- AdVerify hook start ---
#     const-string v0, "a1b2c3d4e5f6"
#     const-string v1, "https://your-server.com"
#     invoke-static {p0, v0, v1}, Lcom/adverify/sdk/AdVerify;->start(Landroid/app/Activity;Ljava/lang/String;Ljava/lang/String;)V
#     # --- AdVerify hook end ---
#
#     # ... rest of original onCreate code ...
#     return-void
# .end method
#
# ============================================================
# IMPORTANT NOTES:
# ============================================================
#
# 1. Make sure .locals count is at least 2 (you need v0 and v1)
#    If it says ".locals 0" or ".locals 1", change it to ".locals 2"
#
# 2. The hook uses p0 (which is "this" = the Activity) —
#    this is always available, no extra register needed
#
# 3. If the APK doesn't have INTERNET permission, add this
#    to AndroidManifest.xml:
#    <uses-permission android:name="android.permission.INTERNET" />
#
# 4. If targeting HTTP (not HTTPS), also add to <application> tag:
#    android:usesCleartextTraffic="true"
# ============================================================
