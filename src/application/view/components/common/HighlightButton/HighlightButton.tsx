import React, { Component } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import COLORS from '../../../../../constants/colors';

const styles = StyleSheet.create({
  button: {
    alignItems: 'center'
  },
  textStyle: {
    color: COLORS.HIGHLIGHT,
    fontSize: 18
  }
});

export interface IProps {
  children: any,
  style?: any,
  textStyle?: any,
  onPress?: any
}

export default class HighlightButton extends Component<IProps> {
  constructor(props: IProps) {
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