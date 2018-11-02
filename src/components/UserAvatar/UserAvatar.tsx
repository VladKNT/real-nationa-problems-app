import React, { Component } from 'react';
import {View, Image, TouchableOpacity, Text} from 'react-native';
import styles from './Styles';

interface Props {
  style?: any,
}

export default class UserAvatar extends Component <Props> {
  render() {
    return (
        <Image {...this.props}
               source={{ uri: 'https://cdn-images-1.medium.com/max/1600/1*XXF26vmDRr6vRY84d1BCKA.png' }}
               borderRadius={100}
               style={[ styles.image, this.props.style ]}/>
    )
  }
}