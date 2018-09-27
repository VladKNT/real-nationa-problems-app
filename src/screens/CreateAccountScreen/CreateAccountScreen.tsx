import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button, Input } from '../../components/common';
import STRINGS from '../../constants/strings';
import styles from './Styles';
import _ from "lodash";

interface Props {
    navigation: any
}

interface State {
    input: {
        email: string,
        password: string,
        firstName: string,
        lastName: string
    }
}

class CreateAccountScreen extends Component <Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            input: {
                email: '',
                password: '',
                firstName: '',
                lastName: ''
            }
        }
    }

    onInputChange = (name: string, data: string) => {
        let input = this.state.input;
        _.set(input, name, data);

        this.setState({ input });
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    { STRINGS.CREATE_TITLE }
                </Text>

                <Input title={ STRINGS.FIRST_NAME }
                       onChangeText={(data: string) => this.onInputChange('firstName', data)}/>
                <Input title={ STRINGS.LAST_NAME }
                       onChangeText={(data: string) => this.onInputChange('lastName', data)} />
                <Input title={ STRINGS.EMAIL_ADDRESS }
                       onChangeText={(data: string) => this.onInputChange('email', data)} />
                <Input title={ STRINGS.PASSWORD }
                       onChangeText={(data: string) => this.onInputChange('password', data)}
                       secureTextEntry />

                <Button>
                    { STRINGS.CREATE }
                </Button>
            </View>
        )
    }
}

export default CreateAccountScreen;