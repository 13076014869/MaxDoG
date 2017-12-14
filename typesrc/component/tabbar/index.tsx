import * as React from "react"
import {
    View,
    StyleSheet,
    Text,
    TouchableHighlight
} from 'react-native';
import BaseStyles from '../../style/style';
import HomeHeader from '../header/header';

interface TabPage {
    title: string,
    component: object,
}

interface ReactProps {
    render?: TabPage[]; // props 渲染页面
}

interface ReactState {
    page: object[],
    currIndex: number,
    tabbarItems: any
}

class TabBar extends React.Component<ReactProps, ReactState> {
    public state: ReactState;

    constructor(props: ReactProps) {
        super(props)

        this.state = {
            page: [],
            currIndex: 0,
            tabbarItems: []
        }
    }

    // 映射出tabbar
    mapSetTabBar() {
        this.state.page = [];
        this.state.tabbarItems = [];
        if (this.props.render) {
            this.props.render.map((item: TabPage, index: number) => {
                this.state.page.push(item.component);
                // tab切换项
                this.state.tabbarItems.push(
                    <View
                        key={index}
                        style={{
                            flex: 1
                        }}>
                        <TouchableHighlight
                            style={{
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center'
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
                            <Text
                                style={{
                                    color: index == this.state.currIndex ? '#007ACC' : '#7C7C7C'
                                }}
                            >{item.title}</Text>
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
                    {this.state.page[this.state.currIndex]}
                </View>
                <View style={styles.tabbar}>
                    {this.state.tabbarItems}
                </View>
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
    tabbar: {
        height: 50,
        width: '100%',
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#999'
    }
})

export default TabBar;