# 1、热更新技术
    - 采用微软code-push技术方案
## 1.1 react-native 实践步骤
- 安装code-push服务 npm install -g code-push-cli
- 注册code-push账号
    - 1、运行cmd 输入 code-push register
    - 2、会自动弹出注册地址
    - 3、选择使用github账号来关联注册
    - 4、注册好以后 网站后返回一个key 复制好后即可登录使用code-push服务了
- 登录code-push
    - 1、运行cmd 输入 code-push login
    - 2、根据提示 网站里复制好的key
- 添加code-push app应用
    - 1、运行cmd 输入 code-push app add <应用程序名> <平台名> <开发平台(语言)>
        ```shell
        code-push app add testApp android react-native
        code-push app add testApp android cordova
        code-push app add testApp android java

        code-push app add testApp ios react-native
        code-push app add testApp ios cordova
        ...
        ```
    - 2、获取此应用的Deployment Key
        ```shell
        code-push deployment list maxdog-android -k
        ```
        返回如下信息：Production(发布成品时使用) Staging(测试使用)
┌────────────┬──────────────────────────────────────────────────────────────────┬───────────────────────────────┬───── ─────────────────┐
│ Name       │ Deployment Key                                                   │ Update Metadata               │ Install Metrics      │
├────────────┼──────────────────────────────────────────────────────────────────┼───────────────────────────────┼───── ─────────────────┤
│ Production │ 263WfI5kF2JfNWkuETEaSXvPfg6P3f4257f6-02c1-42ed-bc32-7147497c4640 │ No updates released           │ No installs recorded │
├────────────┼──────────────────────────────────────────────────────────────────┼───────────────────────────────┼───── ─────────────────┤
│ Staging    │ UkYG0AtUSNHiwy9np-BM6APslQi23f4257f6-02c1-42ed-bc32-7147497c4640 │ Label: v11                    │ No installs recorded │
│            │                                                                  │ App Version: 1.0              │                      │
│            │                                                                  │ Mandatory: Yes                │                      │
│            │                                                                  │ Release Time: 3 days ago      │                      │
│            │                                                                  │ Released By: 654207967@qq.com │                      │
│            │                                                                  │ Description: 测试更新android包     │                      │
└────────────┴──────────────────────────────────────────────────────────────────┴───────────────────────────────┴───── ─────────────────┘

- 创建react-native 项目
    - 1、运行cmd 输入 react-native init testApp
    - 2、安装插件
        ```shell
        npm i --save react-native-code-push
        npm i --save appcenter appcenter-analytics appcenter-crashes
        ```     
    - 3、编译链接插件
        运行cmd 输入 react-native link
            - 注意 如果提示link command不存在 则先在根项目路径上执行 npm install
    - 4、输入对应的key值
        - 注意,在link 编译链接时候：
            react-native-code-push 使用的key 是deployment key (Production / Staging)中任意一个都行
            appcenter appcenter-analytics appcenter-crashes 使用的key是应用的APP SECRET。在App Center网站对应的项目Getting Started页面可以查询到

    - react-native App中集成code-push
        - 1、在入口index.js(或者主组件页面)中，引用code-push
            import codePush from "react-native-code-push";
            import { AppState } from "react-native";
        - 2、在入口组件中的componentDidMount函数中添加以下代码：
            ```javascript
            class App extends Component {
                componentDidMount() {
                    ...
                    AppState.addEventListener("change", (newState) => {
                        newState === "active" && codePush.sync({
                            updateDialog: {
                            appendReleaseDescription: true, // 显示更新内容
                            descriptionPrefix: '\n\n更新内容：\n',
                            title: '版本更新',
                            mandatoryUpdateMessage: '',
                            mandatoryContinueButtonLabel: '立即更新',
                            },
                            mandatoryInstallMode: codePush.InstallMode.IMMEDIATE,
                        });
                    });
                    ...
                }

                ...
            }
            ```

- 发布应用
    - 1、首先手动在项目跟目录下的 [android/app/src/main] 文件目录下建立一个assets文件夹
    - 2、然后cmd 进入项目的根目录下执行(打包js及图片生存bundle文件)：
        ```shell
        react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res
        ```
    - 3、最后cmd 执行 react-native run-android 生存apk文件(安装在真机上等待测试)

- 更新测试
    - 1、手动修改js代码或者图片
    - 2、创建一个文件夹 保存新的bundle文件
        ```shell
        mkdir bundle
        ```
    - 3、打包新的bundle文件
        ```shell
        react-native bundle --platform android --entry-file index.js --bundle-output ./bundle/index.android.bundle --dev false
        ```
    - 4、发布更新
        ```shell
        code-push release MaxDog-android .\bundle\index.android.bundle 1.0 --description "aaaaa" --mandatory true

        其中：版本1.0 是对应的安装版本 即 在build.gradle 中 android.defaultConfig.versionName对应的值
        --description "aaaaa" 代表更新描述
        --mandatory true 代表强制更新
        ```shell

## 1.2 cordova-android@6.2.3 实践步骤

```shell
cordova plugin add cordova-plugin-code-push@latest
```

With the CodePush plugin installed, configure your app to use it via the following steps:

1. Add your deployment keys to the `config.xml` file, making sure to include the right key for each Cordova platform:

    ```xml
    <platform name="android">
        <preference name="CodePushDeploymentKey" value="YOUR-ANDROID-DEPLOYMENT-KEY" />
    </platform>
    <platform name="ios">
        <preference name="CodePushDeploymentKey" value="YOUR-IOS-DEPLOYMENT-KEY" />
    </platform>
    ```
    
2. If you're using an `<access origin="*" />` element in your `config.xml` file, then your app is already allowed to communicate with the CodePush servers and you can safely skip this step. Otherwise, add the following additional `<access />` elements:
 
    ```xml
    <access origin="https://codepush.azurewebsites.net" />
    <access origin="https://codepush.blob.core.windows.net" />
    <access origin="https://codepushupdates.azureedge.net" />
    ```
    
3. To ensure that your app can access the CodePush server on [CSP](https://developer.mozilla.org/en-US/docs/Web/Security/CSP/Introducing_Content_Security_Policy)-compliant platforms, add `https://codepush.azurewebsites.net` to the `Content-Security-Policy` `meta` tag in your `index.html` file:
  
    ```xml
    <meta http-equiv="Content-Security-Policy" content="default-src https://codepush.azurewebsites.net 'self' data: gap: https://ssl.gstatic.com 'unsafe-eval'; style-src 'self' 'unsafe-inline'; media-src *" />
    ```

4. 发布更新(两种方式)
    ```shell
    code-push release-cordova danger-android(项目名) android(平台) --description "gengxinceshi" 
    code-push release danger-android(项目名) ./platforms/android/assets/www(位置) 1.0.0(对应版本) --description "测试"
    ```


