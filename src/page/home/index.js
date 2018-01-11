import * as React from "react"
import {
    View,
    TouchableHighlight,
    StyleSheet,
    Text
} from 'react-native';
import { connect } from 'react-redux';
import { action } from '../../redux/action/index.js';
import HomeHeader from '../../component/header/header';
import Navigator from '../../component/navigator/index';


class HomeLayoutNavigator extends React.Component {
    render() {
        return (
            <Navigator
                tabbar={this.props.tabbar}  // tabbar必须传
                initPage={HomeComponentC}   // tabbar必须传
            >
            </Navigator>
        )
    }
}



class HomeComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getDangerHistoryInfo();
    }

    render() {
        var htmlStr = '';
        if (this.props.dangerData.items.length <= 0) {
            htmlStr = '无数据'
        } else {
            htmlStr = '有数据ss';
        }
        return (
            <View style={styles.container}>

                <HomeHeader>
                </HomeHeader>
                <TouchableHighlight
                    onPress={(e) => {
                        this.props.navigator.push(
                            TestPage,
                            {
                                key: '1',
                                name: '1'
                            }
                        );
                    }}
                >
                    <Text>{htmlStr}</Text>
                </TouchableHighlight>
            </View>
        )
    }
}

class TestPage extends React.Component {
    constructor(props) {
        super(props);
        // 可以接受上一个页面传递来的参数
        // console.log(this.props);
    }
    render() {
        return (
            <View style={{
                flex: 1
            }}>
                <HomeHeader>
                </HomeHeader>
                <TouchableHighlight
                    onPress={() => {
                        this.props.navigator.pop();
                    }}
                >
                    <Text>第二个页面</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    onPress={() => {
                        this.props.navigator.push(
                            TestPage2,
                            {
                                key: '2',
                                name: '1'
                            }
                        );
                    }}
                >
                    <Text>第三个页面</Text>
                </TouchableHighlight>
            </View>
        )
    }
}

class TestPage2 extends React.Component {
    constructor(props) {
        super(props);
        // 可以接受上一个页面传递来的参数
        // console.log(this.props);
    }
    render() {
        return (
            <View style={{
                flex: 1
            }}>
                <HomeHeader>
                </HomeHeader>
                <TouchableHighlight
                    onPress={() => {
                        this.props.navigator.pop();
                    }}
                >
                    <Text>第二个页面</Text>
                </TouchableHighlight>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ccc',
        flex: 1
    }
})

const mapStateToProps = (state, ownProps) => {
    return {
        dangerData: state.dangerData
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getDangerHistoryInfo: (params, success) => {
            dispatch(action.getDangerHistoryInfo(params, success));
        }
    }
}

const HomeComponentC = connect(mapStateToProps, mapDispatchToProps)(HomeComponent);


// console.log(HomeComponentC)
export default HomeLayoutNavigator;