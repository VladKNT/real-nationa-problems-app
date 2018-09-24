import React, { Component } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import COLORS from '../../../constants/colors';

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#642762',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        borderRadius: 3,
        height: 35,
    },
    textStyle: {
        color: COLORS.WHITE
    }
});

export interface Props {
    children: string,
    style?: any,
    textStyle?: any
}

export default class Button extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <TouchableOpacity {...this.props} style={[ styles.button, this.props.style ]}>
                <Text style={[ styles.textStyle, this.props.textStyle ]}>
                    { this.props.children }
                </Text>
            </TouchableOpacity>
        )
    }
}
