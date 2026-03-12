package com.adverify.demo;

import android.os.Bundle;
import android.widget.Button;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.adverify.sdk.AdVerify;
import com.adverify.sdk.AdVerifyCallback;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        Button button = new Button(this);
        button.setText("Show Ad");
        button.setTextSize(16);
        setContentView(button);

        button.setOnClickListener(v -> {
            AdVerify.show(this, new AdVerifyCallback() {
                @Override
                public void onAdShown() {
                    Toast.makeText(MainActivity.this, "Ad shown", Toast.LENGTH_SHORT).show();
                }

                @Override
                public void onAdClosed() {
                    Toast.makeText(MainActivity.this, "Ad closed", Toast.LENGTH_SHORT).show();
                }

                @Override
                public void onAdClicked(String url) {
                    Toast.makeText(MainActivity.this, "Clicked: " + url, Toast.LENGTH_SHORT).show();
                }

                @Override
                public void onError(String message) {
                    Toast.makeText(MainActivity.this, "Error: " + message, Toast.LENGTH_SHORT).show();
                }
            });
        });

        // Auto-show ad on launch
        AdVerify.show(this);
    }
}
