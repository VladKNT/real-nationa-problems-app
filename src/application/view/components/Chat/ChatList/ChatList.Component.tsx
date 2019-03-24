import React, { Component } from "react";
import { FlatList, View, Text } from "react-native";
import { IMessage } from "../../../../../constants/types/message";
import {IUser} from "../../../../../constants/types/user";
import moment from "moment";

import styles from "./ChatList.Styles";

interface IProps {
  user: IUser;
  messages: IMessage[];
  loading: boolean;
}

export class ChatList extends Component<IProps> {
  isCurrentUser = (ownerId: string) => {
    const { user: { id }} = this.props;
    return id == ownerId;
  };

  weekDay = '';
  renderDate = (date: string) => {
    const formattedDate = moment(parseInt(date)).format('MMM D');

    if (formattedDate === this.weekDay) {
      return null;
    }
    this.weekDay = formattedDate;

    return (
      <Text>
        {formattedDate}
      </Text>
    )
  };

  renderTime = (time: string) => {
    const formattedTime = moment(parseInt(time)).format("LT");
    return (
      <Text style={styles.timeText}>
        {formattedTime}
      </Text>
    )
  };

  renderMessage = ({ item }: any) => {
    const {
      id,
      message,
      owner: {
        id: ownerId
      },
      createdAt
    } = item;

    return (
      <View key={id} style={styles.messageContainer}>
        <View style={styles.dateContainer}>
          {this.renderDate(createdAt)}
        </View>
        <View style={[styles.messageBody, this.isCurrentUser(ownerId) && styles.userMessageBody]}>
          <Text style={styles.messageText}>
            {message}
          </Text>
          {this.renderTime(createdAt)}
        </View>
      </View>
    );
  };

  render(): React.ReactNode {
    const { messages } = this.props;

    return (
      <FlatList
        inverted
        data={messages}
        renderItem={this.renderMessage}
      />
    )
  }
}
