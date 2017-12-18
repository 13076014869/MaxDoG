import * as React from "react"
import { 
  View
} from 'react-native';
import { Provider } from 'react-redux';
import configure from './redux/store/store';   // store配置
import Main from './main';

let store = configure();

export default class Hello extends React.Component{
    render() {
        return (
          <Provider store={store}>
            <Main />
          </Provider>
        );
    }
}