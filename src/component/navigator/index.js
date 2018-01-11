import * as React from "react"
import {
    View,
    StyleSheet,
    Text,
    TouchableHighlight,
    Image,
    Dimensions,
    Animated
} from 'react-native';


class Navigator extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            listPage: [],
            initPage: null, // 初始页面
            currPage: 0,    // 索引
            fadeAnimLeft: new Animated.Value(0),
        }
    }

    // 下一页面
    push = (NextComponent, passProps) => {
        this.state.listPage.push(
            <NavigatorItem index={this.state.listPage.length} key={passProps.key}>
                <NextComponent navigator={this} {...passProps} />
            </NavigatorItem>
        )
        this.setState({
            listPage: this.state.listPage,
            currPage: this.state.listPage.length - 1
        });

        // 执行动画运动到下一页面
        var { height, width } = Dimensions.get('window');
        Animated.timing(
            this.state.fadeAnimLeft,//初始值
            {
                toValue: -width * (this.state.listPage.length - 1), //结束值
                duration: 150   // 持续时间
            }
        ).start();//开始

        // 判断是否是首页进入到下一页面
        if (this.state.listPage.length == 2) {
            // 隐藏tabbar
            this.props.tabbar && this.props.tabbar.hideTabbar();
        }
    }

    // 上一页面
    pop = () => {
        if (this.state.listPage.length > 1) {
            var { height, width } = Dimensions.get('window');
            this.state.listPage.pop();
            this.setState({
                listPage: this.state.listPage,
                currPage: this.state.listPage.length - 1
            });
            // 执行动画运动到上一页面
            Animated.timing(
                this.state.fadeAnimLeft,//初始值
                {
                    toValue: -width * (this.state.listPage.length - 1), //结束值
                    duration: 150   // 持续时间
                }
            ).start();//开始

            // 判断是否是进入到首页
            if (this.state.listPage.length == 1) {
                // 隐藏tabbar
                this.props.tabbar && this.props.tabbar.showTabbar();
            }
        }
    }

    componentWillMount() {
        this.state.initPage = this.props.initPage;

        let MainComponent = this.props.initPage;
        this.state.listPage.push(
            <NavigatorItem key="main" index={this.state.currPage}>
                <MainComponent navigator={this} />
            </NavigatorItem>
        );
    }

    render() {
        return (
            <View style={Styles.navigatorContainer}>
                <Animated.View
                    ref="viewControll"
                    style={{
                        flex: 1,
                        position: 'absolute',
                        left: this.state.fadeAnimLeft,
                        top: 0,
                        right: 0,
                        bottom: 0
                        // 这个view style 里面不能有overflow hidden 不然左右滑动看不了
                    }}
                >
                    {this.state.listPage}
                </Animated.View>
            </View>
        )
    }
}

/**
 * 利用绝对定位 靠右排列 运动时候 改变left 值使其显示到屏幕上
 */
class NavigatorItem extends React.Component {
    render() {
        var { height, width } = Dimensions.get('window');
        return (
            <View
                style={{
                    flex: 1,
                    position: 'absolute',
                    left: this.props.index == 0 ? 0 : this.props.index * width,
                    top: 0,
                    right: 0,
                    bottom: this.props.index == 0 ? 0 : -50
                }}
            >
                {this.props.children}
            </View>
        )
    }
}

const Styles = StyleSheet.create({
    navigatorContainer: {
        flex: 1,
        position: 'relative',
        overflow: 'hidden'
    }
})

export default Navigator;