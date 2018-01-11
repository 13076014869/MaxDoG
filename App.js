/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import codePush from "react-native-code-push";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  AppState
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

class App extends Component<{}> {
  componentDidMount() {

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

    
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          {/* Welcome to React Native! */}
          我更新了
        </Text>
        <Text style={styles.instructions}>
          {/* To get started, edit App.js */}
          测试更新模式
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
      </View>
    );
  }
}
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
