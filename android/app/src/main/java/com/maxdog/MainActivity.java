package com.maxdog;

import android.content.Intent;
import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.facebook.react.bridge.JSApplicationIllegalArgumentException;

import java.util.concurrent.ArrayBlockingQueue;

public class MainActivity extends ReactActivity {

    // 用于阻塞react 打开原生activity后，再关闭原生activity后的回调
    // public static ArrayBlockingQueue arrayBlockingQueue = new ArrayBlockingQueue(1);
    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "MaxDog";
    }
}
