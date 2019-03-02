import React, { Component } from 'react';
import { Image } from 'react-native';
import styles from './Styles';

interface Props {
  style?: any,
  size: number,
  uri: string | null
}

export default class UserAvatar extends Component <Props> {
  render() {
    const { size, uri } = this.props;

    return (
      <Image
        {...this.props}
        source={{ uri: uri || 'https://cdn-images-1.medium.com/max/1600/1*XXF26vmDRr6vRY84d1BCKA.png' }}
        borderRadius={100}
        style={[ styles.image, this.props.style, { width: size, height: size, borderRadius: size / 2 } ]}/>
    )
  }
}