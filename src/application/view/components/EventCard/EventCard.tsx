import React, {Component} from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import moment from "moment";

import UserAvatar from "../UserAvatar/UserAvatar";
import { IEvent } from "../../../../constants/types/event";
import URLS from "../../../../constants/urls";
import styles from "./Styles";

interface IProps {
  event: IEvent;
  onPress(id: string): void;
}

export default class EventCard extends Component <IProps> {
  onPress = () => {
    this.props.onPress(this.props.event.id);
  };

  renderDate = () => {
    const { dateStart } = this.props.event;
    const date =  moment(parseInt(dateStart)).format("MMMM Do, dddd");

    return (
      <Text style={styles.dateText}>
        {date}
      </Text>
    )
  };

  renderTime = () => {
    const { dateStart, dateEnd } = this.props.event;
    const start = moment(parseInt(dateStart)).format("h:mm a");
    const end = moment(parseInt(dateEnd)).format("h:mm a");

    return (
      <Text style={styles.dateText}>
        {`${start} - ${end}`}
      </Text>
    )
  };

  render() {
    const {
      name,
      description,
      photo,
      creator: {
        username,
        userProfile: {
          profilePhoto
        }
      }
    } = this.props.event;

    return (
      <TouchableOpacity onPress={(this.onPress)} style={styles.container}>
        <View style={styles.dateSection}>
          {this.renderDate()}
          {this.renderTime()}
        </View>


        <View style={styles.headerSection}>
          <UserAvatar uri={profilePhoto} size={50}/>

          <View style={styles.avatarTextContainer}>
            <Text style={styles.eventName}>
              {name}
            </Text>

            <Text style={styles.username}>
              {username}
            </Text>
          </View>
        </View>

        <Image source={{ uri: `${URLS.ROOT_URL}${photo}` }} style={styles.image} />

        <View style={styles.descriptionSection}>
          <Text style={styles.description}>
            {description}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
}
