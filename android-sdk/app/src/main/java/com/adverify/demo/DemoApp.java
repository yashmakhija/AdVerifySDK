package com.adverify.demo;

import android.app.Application;
import com.adverify.sdk.AdVerify;

public class DemoApp extends Application {

    @Override
    public void onCreate() {
        super.onCreate();

        // Replace with your actual API key and server URL
        AdVerify.init(this, "YOUR_API_KEY", "http://10.0.2.2:3042");
    }
}
