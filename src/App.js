import * as React from "react"
import { 
  View,
  AppState
} from 'react-native';
import codePush from "react-native-code-push";
import { Provider } from 'react-redux';
import configure from './redux/store/store';   // store配置
import Main from './main';


let store = configure();

export default class Hello extends React.Component {

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
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}