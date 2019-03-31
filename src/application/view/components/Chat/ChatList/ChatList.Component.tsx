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
  getMessages(): void;
}

export class ChatList extends Component<IProps> {
  isCurrentUser = (ownerId: string) => {
    const { user: { id }} = this.props;
    return id == ownerId;
  };

  _messageDay = '';
  renderDate = (date: string, index: number) => {
    const { messages } = this.props;
    const formattedDate = moment(parseInt(date)).format('MMM D');

    if (index === 0) {
      this._messageDay = formattedDate;
    }

    if (formattedDate === this._messageDay && index !== messages.length - 1) {
      return null;
    }

    const displayingDate = this._messageDay;
    this._messageDay = formattedDate;

    return (
      <Text>
        {displayingDate}
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

  renderMessage = ({ item, index }: any) => {
    const {
      id,
      message,
      owner: {
        id: ownerId
      },
      read,
      createdAt
    } = item;

    return (
      <View key={id} style={[styles.messageContainer, !read && styles.unreadMessageContainer]}>
        <View style={styles.dateContainer}>
          {this.renderDate(createdAt, index)}
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
    const { messages, getMessages } = this.props;

    return (
      <FlatList
        inverted
        data={messages}
        renderItem={this.renderMessage}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={() => <View/>}
        onEndReached={getMessages}
        onEndReachedThreshold={0.5}
      />
    )
  }
}
