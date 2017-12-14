import * as React from "react"
import {
    View,
    StyleSheet,
    ActivityIndicator
} from 'react-native';

import TabBar from "./component/tabbar/index";
import Home from './component/home/index';
import Person from './component/person/index';
import configure from './redux/store/store';   // store配置

let store = configure();

export default class Main extends React.Component {
    render() {
        return (
            <View style={Styles.container}>
                <TabBar
                    render={[
                        {
                            title: "主页",
                            component: <Home store={store} key={"主页"} />
                        },
                        {
                            title: "我",
                            component: <Person key={"我"} />
                        }
                    ]}
                >
                </TabBar>
            </View>
        );
    }
}

const Styles = StyleSheet.create({
    container: {
        flex: 1
    }
});