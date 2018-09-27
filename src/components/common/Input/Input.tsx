import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import COLORS from '../../../constants/colors';

const styles = StyleSheet.create({
    container: {
        marginVertical: 5,
    },
    title: {
        fontSize: 14,
        color: COLORS.WHITE
    },
    input: {
        width: '100%',
        height: 40,
        paddingHorizontal: 5,
        fontSize: 18,
        color: COLORS.WHITE
    },
    underline: {
        height: 2,
        width: '100%'
    }
});

export interface Props {
    style?: any,
    titleStyle?: any,
    inputStyle?: any,
    title?: string,
    secureTextEntry?: boolean,
    name?: string,
    onChangeText?: any
}

export interface State {
    isActive: boolean
}

export default class Input extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            isActive: false
        }
    }

    render() {
        return (
            <View style={[ styles.container, this.props.style]}>
                <Text style={[styles.title, this.props.titleStyle]}>
                    {this.props.title}
                </Text>
                <TextInput
                    {...(this.props)}
                    style={[ styles.input, this.props.inputStyle ]}
                    onBlur={() => this.setState({isActive: false})}
                    onFocus={() => this.setState({isActive: true})}
                    underlineColorAndroid={'transparent'} />
                <View style={[ styles.underline, {backgroundColor: !this.state.isActive ? "rgba(255, 255, 255, 0.1)" : COLORS.PRIMARY} ]}/>
            </View>
        )
    }
}
