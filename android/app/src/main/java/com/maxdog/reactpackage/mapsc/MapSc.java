package com.maxdog.reactpackage.mapsc;


import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.JSApplicationIllegalArgumentException;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.maxdog.MainActivity;

import org.json.JSONArray;
import org.json.JSONObject;

import java.util.Timer;

/**
 * Created by zxy on 2018/1/12.
 */

public class MapSc extends ReactContextBaseJavaModule {

    private final String MapModelName = "MapSc";
    private Promise mPromise = null;
    private Callback mCallback = null;

    private final ActivityEventListener mActivityEventListener = new BaseActivityEventListener() {
        @Override
        public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {
            // super.onActivityResult(activity, requestCode, resultCode, data); //注意这里不需要使用 避免冲突
            if (requestCode == 1) {
                if (resultCode == 1) {
                    Bundle bundle = data.getExtras();
                    int posy = bundle.getInt("posy");
                    if (mPromise != null) {
                        mPromise.resolve("新方法：" + String.valueOf(posy));
                        mPromise = null;
                    } else if (mCallback != null){
                        mCallback.invoke("旧方法：" + String.valueOf(posy));
                        mCallback = null;
                    }
                }
            }
        }
    };

    public MapSc(ReactApplicationContext reactContext) {
        super(reactContext);
        reactContext.addActivityEventListener(mActivityEventListener);
    }


    @Override
    public String getName() {
        return MapModelName;
    }

    @ReactMethod
    public void OpenActivity(String className, ReadableMap params, Callback success, Callback error) {
        mCallback = success;
        try {
            Activity currentActivity = getCurrentActivity();

            if (currentActivity != null) {
                Class toActivity = Class.forName(className);
                Intent intent = new Intent(currentActivity, toActivity);
                intent.putExtra("params", params.toString());
                currentActivity.startActivityForResult(intent, 1);
            }

        } catch (Exception e) {
            mCallback = null;
            error.invoke("不能打开Activity : " + e.getMessage());
            throw new JSApplicationIllegalArgumentException("不能打开Activity : " + e.getMessage());
        }
    }

    @ReactMethod
    public void OpActivity(String className, ReadableMap params, Promise promise) {
        mPromise = promise;
        try {
            Activity currentActivity = getCurrentActivity();
            if (currentActivity != null) {
                Class toActivity = Class.forName(className);
                Intent intent = new Intent(currentActivity, toActivity);
                intent.putExtra("params", params.toString());
                currentActivity.startActivityForResult(intent, 1);
            }

        } catch (Exception e) {
            mPromise.reject("400", "不能打开Activity : " + e.getMessage());
            mPromise = null;
            throw new JSApplicationIllegalArgumentException("不能打开Activity : " + e.getMessage());
        }
    }

}
