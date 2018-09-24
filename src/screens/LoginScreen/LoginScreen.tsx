import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button, TextField } from '../../components/common';
import styles from './Styles';

interface Props {

}

class LoginScreen extends Component <Props> {
    render() {
        return (
            <View style={styles.container}>
                <Text>
                    Work!
                </Text>
                <Button>
                    Button
                </Button>
                <TextField />
            </View>
        )
    }
}

export default LoginScreen;
