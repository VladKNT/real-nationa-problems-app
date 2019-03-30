import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import moment from "moment";

import UserAvatar from "../../UserAvatar/UserAvatar.Component";
import { IMessage } from "../../../../../constants/types/message";
import { IUser } from "../../../../../constants/types/user";

import styles from "./ChatItem.Styles";

interface IProps {
  id: string;
  user: IUser;
  lastMessage: IMessage;
  onPress(id: string): void;
}

export default class ChatItem extends Component<IProps> {
  renderMessageDate = () => {
    const { lastMessage } = this.props;

    if (lastMessage) {
      const { createdAt } = lastMessage;
      const date = moment(parseInt(createdAt)).fromNow();

      return (
        <Text style={styles.date}>
          {date}
        </Text>
      )
    }

    return null;
  };

  renderFirstRow = () => {
    const {
      user: {
        username
      }
    } = this.props;

    return (
      <View style={styles.firstRow}>
        <Text style={styles.username}>
          {username}
        </Text>
        {this.renderMessageDate()}
      </View>
    )
  };

  renderSecondMessage = () => {
    const { lastMessage } = this.props;

    if (lastMessage) {
      const { message } = lastMessage;

      return (
        <Text style={styles.message} numberOfLines={2}>
          {message}
        </Text>
      )
    }

    return null;
  };

  onPress = () => {
    const { id, onPress } = this.props;

    onPress(id);
  };

  render(): React.ReactNode {
    const { user } = this.props;

    const {
      userProfile: {
        profilePhoto
      }
    } = user;

    return(
      <TouchableOpacity style={styles.container} onPress={this.onPress}>
        <UserAvatar size={50} uri={profilePhoto} />
        <View style={styles.infoContainer}>
          {this.renderFirstRow()}
          {this.renderSecondMessage()}
        </View>
      </TouchableOpacity>
    )
  }
}
