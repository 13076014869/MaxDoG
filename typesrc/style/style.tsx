import {
    StyleSheet
} from 'react-native';

export default StyleSheet.create({
    // 全屏容器
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    // 等比
    flex: {
        flex: 1
    },
    // 垂直水平居中
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    // 横向排列
    row: {
        flexDirection: 'row'
    },
    // 纵向排列
    column: {
        flexDirection: 'column'
    }
});