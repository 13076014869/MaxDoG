import * as React from "react"
import {
    View,
    StyleSheet,
    Text
} from 'react-native';
import { connect } from 'react-redux';
import { action } from '../../redux/action/index.js';
import HomeHeader from '../header/header';

interface ReactProps {
    key: any;
    dangerData: any;
    getDangerHistoryInfo: any;
}

interface ReactState {
    data?: any;
}

class HomeComponent extends React.Component<ReactProps, ReactState> {

    public state: ReactState;

    constructor(props: ReactProps) {
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
            // <View style={styles.container}>
            //     <HomeHeader>
            //     </HomeHeader>
            // </View>
            <View style={styles.container}>
                <HomeHeader>
                </HomeHeader>
                <Text>{htmlStr}</Text>
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

const mapStateToProps = (state: any, ownProps: any) => {
    return {
        dangerData: state.dangerData
    }
}
const mapDispatchToProps = (dispatch: any, ownProps: any) => {
    return {
        getDangerHistoryInfo: (params: any, success: any) => {
            dispatch(action.getDangerHistoryInfo(params, success));
        }
    }
}

const HomeComponentC = connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
// console.log(HomeComponentC)
export default HomeComponentC;