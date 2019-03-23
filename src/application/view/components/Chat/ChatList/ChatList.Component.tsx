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
  componentDidMount(): void {
    console.info(this.props.messages);
  }

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
      <Text>
        {formattedTime}
      </Text>
    )
  };

  renderMessage = ({ item }: any) => {
    const {
      user: {
        id: userId
      }
    } = this.props;
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
        <View style={[styles.messageBody, userId == ownerId && styles.userMessageBody]}>
          <Text>
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
        data={messages}
        renderItem={this.renderMessage}
      />
    )
  }
}
