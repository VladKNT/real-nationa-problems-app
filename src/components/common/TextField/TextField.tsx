import React, { Component } from 'react';
import { TextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    textField: {
        borderWidth: 1,
        borderRadius: 3,
        borderColor: '#642762',
        padding: 5,
        marginVertical: 10,
        width: '100%'
    }
});

export interface Props {
    style?: any
}

export default class TextField extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <TextInput{...this.props} style={[ styles.textField, this.props.style ]} underlineColorAndroid={'transparent'} />
        )
    }
}
