package com.maxdog;

import android.content.Intent;
import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.facebook.react.bridge.JSApplicationIllegalArgumentException;

import java.util.concurrent.ArrayBlockingQueue;

public class MainActivity extends ReactActivity {

    // 用于阻塞react 打开原生activity后，再关闭原生activity后的回调
    public static ArrayBlockingQueue arrayBlockingQueue = new ArrayBlockingQueue(1);
    public static final int s_MapRequestCode = 1;

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "MaxDog";
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == s_MapRequestCode) {
            if(resultCode == 1) {   // 成功
//                String  Name=data.getStringExtra("username");
//                Bundle bundle = data.getExtras();
//                String posx = bundle.getString("posx");
//                String posy = bundle.getString("posy");
//                OpenActivity.callbackContext_.success(posx + "," + posy);
                try {
                    Bundle bundle = data.getExtras();
                    int posy = bundle.getInt("posy");
                    if (posy == 12) {
                        arrayBlockingQueue.add(posy);
                    } else {
                        String posx = "1";
                        arrayBlockingQueue.add(posx);
                    }

                } catch (Exception e) {
                    throw new JSApplicationIllegalArgumentException(e.getMessage());
                }

            } else {
                //arrayBlockingQueue.add(false);
            }
        }
    }
}
