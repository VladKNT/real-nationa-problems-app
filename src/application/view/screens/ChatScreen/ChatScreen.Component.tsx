import React, { Component } from "react";
import { View, TextInput } from "react-native";
import _ from "lodash";

import { connect } from "react-redux";
import { Dispatch } from "redux";
import { cleanChat, getChat } from "../../../data/store/chat/chatActions";
import {
  getMessages,
  sendMessage,
  subscribedMessage,
  cleanMessages,
  readMessages
} from "../../../data/store/message/messageActions";
import { IReducerStates } from "../../../data/store/rootReducer";
import { IMessage } from "../../../../constants/types/message";
import { IChat } from "../../../../constants/types/chat";
import { IUser } from "../../../../constants/types/user";

import { ChatList } from "../../components/Chat/ChatList/ChatList.Component";

import MessageResolver from "../../../../api/graphql/relsolvers/message";

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

  getChat(id: string): void;
  cleanChat(): void;
  getMessages(): void;
  cleanMessages(): void;
  readMessages(messagesId: string[]): void;
  sendMessage(message: string): void;
  subscribedMessage(message: IMessage): void;
}

interface IState {
  message: string;
}

class ChatScreen extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      message: "",
    };

    this.subscriprionToMessages = null;
  }

  componentDidMount(): void {
    const {
      getChat,
      chat: {
        id: chatId
      },
      navigation
    } = this.props;
    const id = navigation.getParam("chatId");
    let subscriptionId;

    if (id) {
      subscriptionId = id;
      getChat(id);
    } else {
      subscriptionId = chatId;
    }

    this.subscriprionToMessages = MessageResolver.subscribeMessages(subscriptionId, this.subscribedMessage);
  }

  componentDidUpdate(prevProps: Readonly<IProps>): void {
    const { messages, readMessages } = this.props;

    if (messages.length !== prevProps.messages.length && _.some(prevProps.messages)) {
      const message = messages[0];

      if (!message.read) {
        readMessages([message.id]);
      }
    }
  }

  componentWillUnmount(): void {
    const { cleanMessages } = this.props;

    if (this.subscriprionToMessages) {
      this.subscriprionToMessages.unsubscribe();
    }

    cleanMessages();
  }

  readMessage() {
    const { messages, readMessages } = this.props;

    const unreadMessagesId = _.reduce(messages, (result: string[], message: IMessage) => {
      if (!message.read) {
        result.push(message.id);
      }
      return result;
    }, []);

    if (_.some(unreadMessagesId)) {
      readMessages(unreadMessagesId);
    }
  }


  onFocusInput = () => {
    this.readMessage();
  };

  onChangeInput = (message: string) => {
    this.setState({ message });
  };

  submitMessage = () => {
    const { sendMessage } = this.props;
    const { message } = this.state;
    this.setState({ message: "" });

    sendMessage(message);
  };

  subscribedMessage = (message: IMessage) => {
    const { subscribedMessage } = this.props;

    subscribedMessage(message);
  };

  getMessages = _.throttle(() => this.props.getMessages(), 1000);

  render(): React.ReactNode {
    const { messages, messageLoading, user, cleanChat } = this.props;
    const { message } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.listContainer}>
          <ChatList
            messages={messages}
            loading={messageLoading}
            getMessages={this.getMessages}
            cleanChat={cleanChat}
            user={user} />
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.inputBody}>
            <TextInput
              value={message}
              maxHeight={100}
              maxLength={255}
              multiline={true}
              style={styles.input}
              placeholder={"Message..."}
              onChangeText={this.onChangeInput}
              onFocus={this.onFocusInput}
              underlineColorAndroid={"transparent"} />
            {!!message &&
              <HighlightButton textStyle={styles.buttonText} onPress={this.submitMessage}>
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
    getChat: (id: string) => dispatch(getChat(id)),
    cleanChat: () => dispatch(cleanChat()),
    getMessages: () => dispatch(getMessages()),
    cleanMessages: () => dispatch(cleanMessages()),
    sendMessage: (message: string) => dispatch(sendMessage(message)),
    readMessages:(messagesId: string[]) => dispatch(readMessages(messagesId)),
    subscribedMessage: (message: IMessage) => dispatch(subscribedMessage(message)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen);