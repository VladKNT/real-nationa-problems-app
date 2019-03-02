import React, { Component } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import COLORS from '../../../../../constants/colors';

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.BUTTON,
    borderColor: COLORS.BORDER,
    borderWidth: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    borderRadius: 8,
    height: 40,
    marginVertical: 5
  },
  textStyle: {
    color: COLORS.TEXT,
    fontSize: 18
  }
});

export interface Props {
  children: string,
  style?: any,
  textStyle?: any,
  onPress: any
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
