import React, { Component } from "react";
import { View, Text, TextInput } from "react-native";

import { connect } from "react-redux";
import { Dispatch } from "redux";
import { getChat } from "../../../data/store/chat/chatActions";
import { IReducerStates } from "../../../data/store/rootReducer";
import { IMessage } from "../../../../constants/types/message";
import { IChat } from "../../../../constants/types/chat";
import { IUser } from "../../../../constants/types/user";

import { ChatList } from "../../components/Chat/ChatList/ChatList.Component";

import styles from "./ChatScreen.Styles";
import { HighlightButton } from "../../components/common";

interface IProps {
  navigation: any;

  user: IUser;

  chat: IChat;
  chatLoading: boolean;
  chatError: string;

  messages: IMessage[];
  messageLoading: boolean;
  messageError: string;

  getChat: (id: string) => void;
}

interface IState {
  input: string;
}

class ChatScreen extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      input: ""
    }
  }

  componentDidMount(): void {
    const { getChat, navigation } = this.props;
    const id = navigation.getParam("chatId");

    if (id) {
      getChat(id);
    }
  }

  onChangeInput = (input: string) => {
    this.setState({ input });
  };

  render(): React.ReactNode {
    const { messages, messageLoading, user } = this.props;
    const { input } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.listContainer}>
          <ChatList messages={messages} loading={messageLoading} user={user} />
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.inputBody}>
            <TextInput
              value={input}
              maxHeight={100}
              maxLength={255}
              multiline={true}
              style={styles.input}
              placeholder={"Message..."}
              onChangeText={this.onChangeInput}
              underlineColorAndroid={"transparent"} />
            {!!input &&
              <HighlightButton textStyle={styles.buttonText}>
                Send
              </HighlightButton>
            }
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state: IReducerStates) => {
  const { user } = state.userProfileReducer;
  const { chat, loading: chatLoading, error: chatError } = state.chatReducer;
  const { messages, loading: messageLoading, error: messageError } = state.messageReducer;
  return {
    user,

    chat,
    chatLoading,
    chatError,

    messages,
    messageLoading,
    messageError
  }
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    getChat: (id: string) => dispatch(getChat(id))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen);