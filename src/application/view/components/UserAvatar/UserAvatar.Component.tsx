import React, { Component } from 'react';
import { Image } from 'react-native';
import URLS from '../../../../constants/urls';
import styles from './UserAvatar.Styles';

interface Props {
  style?: any,
  size: number,
  uri: string | null
}

export default class UserAvatar extends Component <Props> {
  getUri = () => {
    const { uri } = this.props;

    if (uri) {
      const source = uri.split('/');

      if (source[0] === 'images') {
        return `${URLS.ROOT_URL}${uri}`
      }

      return uri;
    }

    return 'https://cdn-images-1.medium.com/max/1600/1*XXF26vmDRr6vRY84d1BCKA.png';
  };

  render() {
    const { size } = this.props;
    this.getUri();

    return (
      <Image
        {...this.props}
        source={{ uri: this.getUri()}}
        borderRadius={100}
        style={[ styles.image, this.props.style, { width: size, height: size, borderRadius: size / 2 } ]}/>
    )
  }
}