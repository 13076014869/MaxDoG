package com.dog.component.audio;

import android.content.Context;
import android.media.MediaPlayer;
import android.media.MediaRecorder;
import android.os.Environment;
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Timer;
import java.util.TimerTask;

import javax.annotation.Nullable;

/**
 * Created by zxy on 2017/12/21.
 */

public class ZxyAudioModul  extends ReactContextBaseJavaModule {
    private final String AudioModelName = "ZxyAudio";

    private static final String DocumentDirectoryPath = "DocumentDirectoryPath";
    private static final String PicturesDirectoryPath = "PicturesDirectoryPath";
    private static final String MainBundlePath = "MainBundlePath";
    private static final String CachesDirectoryPath = "CachesDirectoryPath";
    private static final String LibraryDirectoryPath = "LibraryDirectoryPath";
    private static final String MusicDirectoryPath = "MusicDirectoryPath";
    private static final String DownloadsDirectoryPath = "DownloadsDirectoryPath";

    private Context context;
    private MediaRecorder recorder = null;     // 录音handler
    private MediaPlayer mPlayer = null;         // 播放音频handle
    private boolean isRecording = false;        // 是否正在录音
    private Timer timer;                        // 计时器
    private int recorderSecondsElapsed = 0;         // 秒数计数器
    private String currentOutputFile;           // 当前输出文件

    public ZxyAudioModul(ReactApplicationContext reactContext) {
        super(reactContext);
        this.context = reactContext;
    }

    @Override
    public String getName() {
        return AudioModelName;
    }

    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        Map<String, Object> constants = new HashMap<>();
        constants.put(DocumentDirectoryPath, this.getReactApplicationContext().getFilesDir().getAbsolutePath());
        constants.put(PicturesDirectoryPath, Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_PICTURES).getAbsolutePath());
        constants.put(MainBundlePath, "");
        constants.put(CachesDirectoryPath, this.getReactApplicationContext().getCacheDir().getAbsolutePath());
        constants.put(LibraryDirectoryPath, "");
        constants.put(MusicDirectoryPath, Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_MUSIC).getAbsolutePath());
        constants.put(DownloadsDirectoryPath, Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS).getAbsolutePath());
        return constants;
    }

    /**
     * 创建记录声音工作
     * @param successNext
     * @param failNext
     */
    @ReactMethod
    public void createRecordVoice(String recordingPath, ReadableMap recordingSettings, Callback successNext, Callback failNext) {

        if (isRecording != false) {
            failNext.invoke(
                    "Please call stopRecording before starting recording"
            );
            return;
        }

        try {
            /**
             * 下面介绍如何录制media音频资源：
             1、使用new创建一个实例android.media.MediaRecorder；
             2、创建一个android.content.ContentValues实例并设置一些标准的属性，像TITLE，TIMESTAMP，最重要的是MIME_TYPE;
             3、创建一个要放置的文件的路径，这可以通过android.content.ContentResolver在内容数据库中来创建一个入
             口，并且自动地标志一个取得这个文件的路径。
             4、使用MediaRecorder.setAudioSource()方法来设置音频资源；这将会很可能使用到MediaRecorder.AudioSource.MIC;
             5、使用MediaRecorder.setOutputFormat()方法设置输出文件格式；
             6、用MediaRecorder.setAudioEncoder()方法来设置音频编码；
             7、最后，prepare()和start()所录制的音频，stop()和release()在要结束的时候调用。
             */
            recorder = new MediaRecorder();

            recorder.setAudioSource(MediaRecorder.AudioSource.MIC);
            int outputFormat = getOutputFormatFromString(recordingSettings.getString("outFormat"));
            recorder.setOutputFormat(outputFormat);
            int audioEncoder = getAudioEncoderFromString(recordingSettings.getString("audioEncoding"));
            recorder.setAudioEncoder(audioEncoder);     //设置所录制的声音的编码格式。

            recorder.setAudioSamplingRate(recordingSettings.getInt("sampleRate"));  //设置所录制的声音的采样率。
            recorder.setAudioChannels(recordingSettings.getInt("channels"));        //设置录制的音频通道数。
            //recorder.setAudioEncodingBitRate(recordingSettings.getInt("audioEncodingBitRate")); //设置所录制的声音的编码位率。
            recorder.setOutputFile(recordingPath);  //设置录制的音频文件的保存位置。
        } catch (Exception e) {
            failNext.invoke(
                    "Make sure you've added RECORD_AUDIO permission to your AndroidManifest.xml file " + e.getMessage()
            );
            return;
        }


        // 准备录音
        try {
            currentOutputFile = recordingPath;
            recorder.prepare();
            successNext.invoke(
                    recordingPath
            );
            return;
        } catch (Exception e) {
            failNext.invoke(
                    "COULDNT_PREPARE_RECORDING_AT_PATH " + recordingPath, e.getMessage()
            );
        }
    }


    /**
     * 开始记录声音
     * @param promise
     */
    @ReactMethod
    public void startRecording(Promise promise) {
        if (recorder == null) {
            promise.reject(
                    "RECORDING_NOT_PREPARED", "Please call CreateRecordVoice before starting recording"
            );
            return;
        }

        if (isRecording ==  true) {
            promise.reject(
                    "INVALID_STATE", "Please call stopRecording before starting recording"
            );
            return;
        }
        /**
         * 开始录音
         */
        recorder.start();
        isRecording = true;
        startTimer();
        promise.resolve(currentOutputFile);
    }

    /**s
     * 停止录音
     * @param promise
     */
    @ReactMethod
    public void stopRecording(Promise promise){
        if (isRecording != true) {
            promise.reject(
                    "INVALID_STATE", "Please call startRecording before stopping recording"
            );
            return;
        }
        stopTimer();
        isRecording = false;

        // 停止录音
        try {
            recorder.setOnErrorListener(null);
            recorder.setOnInfoListener(null);
            recorder.setPreviewDisplay(null);
            recorder.stop();
            recorder.release();
        } catch (final RuntimeException e) {
            promise.reject(
                    "RUNTIME_EXCEPTION", "No valid audio data received. You may be using a device that can't record audio.  " + e.getMessage()
            );
            return;
        } finally {
            recorder = null;
        }

        promise.resolve(currentOutputFile);
        sendEvent("recordingFinished", null);
    }

    /**
     * 停止录音
     * @param promise
     */
    @ReactMethod
    public void pauseRecording(Promise promise) {
        stopRecording(promise);
    }

    /**
     * 播放音频
     * @param audioPath
     * @param promise
     */
    @ReactMethod
    public void playAudio(String audioPath, Promise promise) {
        if (mPlayer != null) {
            // 停止上一个音频
            try {
                mPlayer.stop();
                mPlayer.release();
                mPlayer = null;
            } catch (RuntimeException e) {
                promise.reject(
                        "RUNTIME_EXCEPTION", "中止播放音频失败 " + e.getMessage()
                );
            }

            // 开启播放新音频
            try {
                mPlayer = new MediaPlayer();
                mPlayer.setDataSource(audioPath);
                mPlayer.prepare();
                mPlayer.start();
            } catch (RuntimeException e) {
                promise.reject(
                        "RUNTIME_EXCEPTION", "播放音频失败 " + e.getMessage()
                );
                return;
            } catch (IOException e) {
                promise.reject(
                        "RUNTIME_EXCEPTION", "播放音频失败 " + e.getMessage()
                );
                return;
            }

            promise.resolve(audioPath + "播放成功");
        }
    }

    /**
     * 中止播放音频
     * @param promise
     */
    @ReactMethod
    public void stopAudio(Promise promise) {
        try {
            if (mPlayer != null) {
                mPlayer.stop();
                mPlayer.release();
                mPlayer = null;
            }
        } catch (RuntimeException e) {
            promise.reject(
                    "RUNTIME_EXCEPTION", "停止播放失败" + e.getMessage()
            );
            return;
        }
        promise.resolve(true);
    }

    /**
     * 暂停播放音频
     * @param promise
     */
    @ReactMethod
    public void pauseAudio(Promise promise) {
        try {
            if (mPlayer != null) {
                mPlayer.stop();
            }
        } catch (RuntimeException e) {
            promise.reject(
                    "RUNTIME_EXCEPTION", "停止播放失败" + e.getMessage()
            );
            return;
        }
        promise.resolve(true);
    }

    /**
     * 暂停播放音频
     * @param promise
     */
    @ReactMethod
    public void startAudio(Promise promise) {
        try {
            if (mPlayer != null) {
                mPlayer.start();
            }
        } catch (RuntimeException e) {
            promise.reject(
                    "RUNTIME_EXCEPTION", "继续播放失败" + e.getMessage()
            );
            return;
        }
        promise.resolve(true);
    }

    private void startTimer() {
        stopTimer();
        timer = new Timer();
        timer.scheduleAtFixedRate(new TimerTask() {
            @Override
            public void run() {
                WritableMap body = Arguments.createMap();
                body.putInt("currentTime", recorderSecondsElapsed);
                sendEvent("recordingProgress", body);
                recorderSecondsElapsed++;
            }
        }, 0, 1000);
    }

    private void stopTimer() {
        recorderSecondsElapsed = 0;
        if (timer != null) {
            timer.cancel(); // 暂停取消任务
            timer.purge();  // 从任务队列里移除
            timer = null;
        }
    }

    private int getOutputFormatFromString(String outputFormat) {
        switch (outputFormat) {
            case "mpeg_4":
                return MediaRecorder.OutputFormat.MPEG_4;
            case "aac_adts":
                return MediaRecorder.OutputFormat.AAC_ADTS;
            case "amr_nb":
                return MediaRecorder.OutputFormat.AMR_NB;
            case "amr_wb":
                return MediaRecorder.OutputFormat.AMR_WB;
            case "three_gpp":
                return MediaRecorder.OutputFormat.THREE_GPP;
            case "webm":
                return MediaRecorder.OutputFormat.WEBM;
            default:
                Log.d("INVALID_OUPUT_FORMAT", "USING MediaRecorder.OutputFormat.DEFAULT : "+MediaRecorder.OutputFormat.DEFAULT);
                return MediaRecorder.OutputFormat.DEFAULT;

        }
    }

    private int getAudioEncoderFromString(String audioEncoder) {
        switch (audioEncoder) {
            case "aac":
                return MediaRecorder.AudioEncoder.AAC;
            case "aac_eld":
                return MediaRecorder.AudioEncoder.AAC_ELD;
            case "amr_nb":
                return MediaRecorder.AudioEncoder.AMR_NB;
            case "amr_wb":
                return MediaRecorder.AudioEncoder.AMR_WB;
            case "he_aac":
                return MediaRecorder.AudioEncoder.HE_AAC;
            case "vorbis":
                return MediaRecorder.AudioEncoder.VORBIS;
            default:
                Log.d("INVALID_AUDIO_ENCODER", "USING MediaRecorder.AudioEncoder.DEFAULT instead of "+audioEncoder+": "+MediaRecorder.AudioEncoder.DEFAULT);
                return MediaRecorder.AudioEncoder.DEFAULT;
        }
    }

    /**
     * 发送事件通知
     * @param eventName
     * @param params
     */
    private void sendEvent(String eventName, Object params) {
        getReactApplicationContext()
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }

}
