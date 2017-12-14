import * as React from "react"
import {
    Text,
    View,
    StyleSheet
} from 'react-native';
import BaseStyles from '../../style/style';

// 主页头部
export default class HomeHeader extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.left}>
                </View>
                <View style={styles.center}>
                    <Text>主页</Text>
                </View>
                <View style={styles.right}>

                </View>
            </View>
        );
    }
}

// 个人信息头部
export class PersonHeader extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.left}>
                </View>
                <View style={styles.center}>
                    <Text>我</Text>
                </View>
                <View style={styles.right}>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 40,
        width: '100%',
        flexDirection: 'row',
        backgroundColor: '#eee'
    },
    left: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    right: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end'
    }
})