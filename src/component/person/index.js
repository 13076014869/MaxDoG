import * as React from "react"
import {
    View,
    StyleSheet,
    Text
} from 'react-native';
import { PersonHeader } from '../header/header';

class PersonComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            // <View style={styles.container}>
            //     <HomeHeader>
            //     </HomeHeader>
            // </View>
            <View style={styles.container}>
                <PersonHeader />
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

export default PersonComponent;