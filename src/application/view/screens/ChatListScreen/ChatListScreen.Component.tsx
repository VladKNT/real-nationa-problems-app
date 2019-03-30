import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView, TouchableOpacity,
} from "react-native";
import _ from "lodash";

import { connect } from "react-redux";
import { Dispatch } from "redux";
import { userChats } from "../../../data/store/chat/chatActions";

import { IChat } from "../../../../constants/types/chat";
import { IReducerStates } from "../../../data/store/rootReducer";
import ChatItem from "../../components/Chat/ChatItem/ChatItem.Componet";

import STRINGS from "../../../../constants/strings";

interface IProps {
  navigation: any;

  userId: string;
  userChats: IChat[];
  loading: boolean;
  chatError: string;

  getUserChats(): void;
}

class ChatListScreen extends Component<IProps> {
  componentDidMount() {
    const { getUserChats } = this.props;

    getUserChats();
  }

  static navigationOptions = () => ({
    headerTitle: STRINGS.MESSAGES,
  });

  onPressChat = (chatId: string) => {
    const {
      navigation: {
        navigate
      }
    } = this.props;

    navigate("ChatScreen", { chatId });
  };

  renderList() {
    const { userChats, userId } = this.props;

    return _.map(userChats, (chat) => {
      const {
        id,
        members,
        lastMessage
      } = chat;

      const user = _.filter(members, (member) => member.id !== userId);

      return <ChatItem key={id} id={id} user={user[0]} lastMessage={lastMessage} onPress={this.onPressChat} />;
    })
  }

  render() {
    return (
      <ScrollView>
        {this.renderList()}
      </ScrollView>
    );
  }
}

const mapStateToProps = (state: IReducerStates) => {
  const { user: { id: userId } } = state.userProfileReducer;

  const { userChats, loading, error } = state.chatReducer;
  return {
    userId,

    userChats,
    loading,
    error,
  }
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    getUserChats: () => dispatch(userChats())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatListScreen);
