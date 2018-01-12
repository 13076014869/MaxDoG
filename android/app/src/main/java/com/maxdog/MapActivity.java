package com.maxdog;

import android.os.Bundle;
import android.view.Window;

import com.facebook.react.ReactActivity;

public class MapActivity extends ReactActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        setContentView(R.layout.activity_map);
    }
}
