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

const home_active = require('./component/images/home_active.png');
const home_normal = require('./component/images/home_normal.png');
const me_active = require('./component/images/me_active.png');
const me_normal = require('./component/images/me_normal.png');

export default class Main extends React.Component {
    render() {
        return (
            <View style={Styles.container}>
                <TabBar
                    render={[
                        {
                            activeIcon: home_active, // 激活时的icon
                            normalIcon: home_normal, // 正常情况下的icon
                            title: "主页",
                            component: Home
                        },
                        {
                            activeIcon: me_active, // 激活时的icon
                            normalIcon: me_normal, // 正常情况下的icon
                            title: "我",
                            component: Person
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