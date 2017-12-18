import * as React from "react"
import {
    View,
    StyleSheet,
    Text,
    TouchableHighlight,
    Image
} from 'react-native';
import BaseStyles from '../../style/style';
import HomeHeader from '../header/header';

class TabBar extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            page: [],
            currIndex: 0,
            tabbarItems: [],
            tabbarHeight: 50,
        }
    }

    /**
     * 显示tabBar
     */
    showTabbar = () => {
        this.setState({
            tabbarHeight: 50
        })
    }

    hideTabbar = () => {
        this.setState({
            tabbarHeight: 0
        })
    }

    // 映射出tabbar
    mapSetTabBar() {
        this.state.page = [];
        this.state.tabbarItems = [];
        if (this.props.render) {
            this.props.render.map((item, index) => {
                var PageComponent = item.component;
                this.state.page.push(
                    <SceneContaoner
                        key={index}
                        selected={index == this.state.currIndex}
                    >
                        {/* 将tabbar传给组件 */}
                        <PageComponent tabbar={this} />
                    </SceneContaoner>
                )
                // tab切换项
                var icon = index == this.state.currIndex ? item.activeIcon : item.normalIcon;
                this.state.tabbarItems.push(
                    <View
                        key={index}
                        style={{
                            flex: 1
                        }}>
                        <TouchableHighlight
                            style={{
                                flex: 1
                            }}
                            onPress={(e) => {
                                if (index != this.state.currIndex) {
                                    this.setState({
                                        currIndex: index
                                    });
                                }
                            }}
                            underlayColor={'#ddd'}
                            activeOpacity={0.8}
                        >
                            <View
                                style={{
                                    flex: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <Image
                                    style={{
                                        width: 24,
                                        height: 24
                                    }}
                                    source={icon}
                                />
                                <Text
                                    style={{
                                        color: index == this.state.currIndex ? '#007ACC' : '#7C7C7C'
                                    }}
                                >{item.title}</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                );
            });
        }
    }

    render() {
        this.mapSetTabBar();
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    {this.state.page}
                </View>
                <View style={{
                    height: this.state.tabbarHeight,
                    opacity: this.state.tabbarHeight == 0 ? 0 : 1,
                    width: '100%',
                    flexDirection: 'row',
                    borderTopWidth: 1,
                    borderTopColor: '#999'
                }}>
                    {this.state.tabbarItems}
                </View>
            </View>
        )
    }
}

/**
 * 场景容器
 */
class SceneContaoner extends React.Component {
    render() {
        return (
            <View
                style={[
                    styles.sceneContainer,
                    this.props.selected ? null : styles.hiddenSceneContainer
                ]}
            >
                {this.props.children}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    content: {
        flex: 1,
    },
    sceneContainer: {
        flex: 1
    },
    hiddenSceneContainer: {
        overflow: 'hidden',
        opacity: 0,
        flex: 0
    },
})

export default TabBar;