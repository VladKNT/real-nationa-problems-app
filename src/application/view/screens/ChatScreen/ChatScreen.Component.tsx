import React, { Component } from "react";
import { FlatList, View, Text } from "react-native";

import { connect } from "react-redux";
import { Dispatch } from "redux";
import { getChat } from "../../../data/store/chat/chatActions";
import { IReducerStates } from "../../../data/store/rootReducer";

interface IProps {
  navigation: any;
  getChat: (id: string) => void;
}

class ChatScreen extends Component<IProps> {
  componentDidMount(): void {
    const { getChat, navigation } = this.props;
    const id = navigation.getParam("chatId");

    if (id) {
      getChat(id);
    }
  }



  render(): React.ReactNode {
    return (
      <View>
        <Text>
          Chat
        </Text>
      </View>
    );
  }
}

const mapStateToProps = (state: IReducerStates) => {
  const { chat, loading, error } = state.chatReducer;
  return {
    chat,
    loading,
    error
  }
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    getChat: (id: string) => dispatch(getChat(id))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatScreen);