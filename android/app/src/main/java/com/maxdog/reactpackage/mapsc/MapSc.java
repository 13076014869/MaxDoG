package com.maxdog.reactpackage.mapsc;


import android.app.Activity;
import android.content.Intent;

import com.facebook.react.bridge.JSApplicationIllegalArgumentException;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.Timer;

/**
 * Created by zxy on 2018/1/12.
 */

public class MapSc extends ReactContextBaseJavaModule {

    private final String MapModelName = "MapSc";


    public MapSc(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return MapModelName;
    }

    @ReactMethod
    public void OpenActivity(String className) {
        try {
            Activity currentActivity = getCurrentActivity();

            if (currentActivity != null) {
                Class toActivity = Class.forName(className);
                Intent intent = new Intent(currentActivity, toActivity);
                currentActivity.startActivity(intent);
            }

        } catch (Exception e) {
            throw new JSApplicationIllegalArgumentException("不能打开Activity : "+e.getMessage());
        }
    }

}
