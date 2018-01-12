package com.maxdog;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.view.Window;
import android.widget.Button;
import android.widget.ImageButton;

import com.facebook.react.ReactActivity;

public class MapActivity extends ReactActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        setContentView(R.layout.activity_map);

        final Button fnhui = (Button)findViewById(R.id.mapreturnbtn);

        fnhui.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (v == fnhui) {
                    Intent mainIntent = new Intent();

                    mainIntent.putExtra("posx", 1);
                    mainIntent.putExtra("posy", 12);

                    setResult(1, mainIntent);
                    finish();
                }
            }
        });
    }
}
