import React, { Component } from "react";
import {
  ScrollView,
} from "react-native";
import _ from "lodash";

import { connect } from "react-redux";
import { Dispatch } from "redux";
import { userChats } from "../../../data/store/chat/chatActions";

import MessageResolver from "../../../../api/graphql/relsolvers/message";
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
  constructor(props: IProps) {
    super(props);

    this.subscriprionToUpdateChat = null;
  };

  // TODO: UPDATE CHAT!
  subscribeToUpdateChat = async () => {
    this.subscriprionToUpdateChat = await MessageResolver.subscribeUpdateChat((res) => console.info(res));
  };

  unsubscribeFromUpdateChat = () => {
    this.subscriprionToUpdateChat.unsubscribe();
  };


  componentDidMount() {
    const { getUserChats } = this.props;

    this.subs = [
      this.props.navigation.addListener('didFocus', this.subscribeToUpdateChat),
      this.props.navigation.addListener('willBlur', this.unsubscribeFromUpdateChat)
    ];

    getUserChats();
  }

  componentWillUnmount() {
    this.subs.forEach((sub) => {
      sub.remove();
    });
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
        lastMessage,
        unreadMessages
      } = chat;

      const user = _.filter(members, (member) => member.id !== userId);

      return <ChatItem
        key={id}
        id={id}
        user={user[0]}
        unreadMessages={unreadMessages}
        lastMessage={lastMessage}
        onPress={this.onPressChat} />;
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
