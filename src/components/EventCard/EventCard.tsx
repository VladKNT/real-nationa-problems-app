import React, {Component} from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import UserAvatar from '../UserAvatar/UserAvatar';
import styles from './Styles';
import { IEvent } from '../../redux/reducers/eventReducer';

interface Props {
  event: IEvent
  style?: any,
}

export default class EventCard extends Component <Props> {
  render() {
    return (
      <TouchableOpacity style={styles.container}>
        <View style={styles.dateSection}>
          <Text style={styles.dateText}>
            10 October
          </Text>

          <Text style={styles.dateText}>
            10:00 pm - 12:00 am
          </Text>
        </View>


        <View style={styles.headerSection}>
          <UserAvatar size={50}/>

          <View style={styles.avatarTextContainer}>
            <Text style={styles.eventName}>
              Header
            </Text>

            <Text style={styles.username}>
              john_doe
            </Text>
          </View>
        </View>

        <Image source={{uri: 'https://i.photographers.ua/thumbnails/pictures/42779/800xdsc_1087_1200.jpg'}} style={styles.image} />

        <View style={styles.descriptionSection}>
          <Text style={styles.description}>
            Description
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
}
