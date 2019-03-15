import React, { Component } from "react";
import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import _ from 'lodash';
import Icon from "react-native-vector-icons/Ionicons";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { getUserById } from "../../../data/store/user/userActions";
import { createPrivateChat } from "../../../data/store/chat/chatActions";
import UserAvatar from "../../components/UserAvatar/UserAvatar";
import { HiglightButton } from "../../components/common";
import { IReducerStates } from "../../../data/store/rootReducer";
import { IUser, IUserReducer } from "../../../../constants/types/user";
import COLORS from "../../../../constants/colors";
import STRINGS from "../../../../constants/strings";
import styles from "./Styles";

interface IProps {
  navigation: any;
  user: IUser;
  selectedUser: IUser;
  loading: boolean;
  getUserById(id: string): void;
  createPrivateChat(recipientId: string): void;
}

interface IState {

}

class ProfileScreen extends Component <IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  settingsPressed = () => {
    const { navigate } = this.props.navigation;
    navigate("EditProfileScreen");
  };

  static navigationOptions = ({ navigation }: any) => {
    const settingsPressed = navigation.getParam("settingsPressed");
    if (settingsPressed) {
      return {
        headerTitle: (
          <Text style={styles.headerLeft}>
            { navigation.getParam("username") }
          </Text>
        ),

        headerRight: (
          <TouchableOpacity style={styles.headerRight} onPress={settingsPressed}>
            <Icon name={"md-settings"} size={25} color={COLORS.BLACK} />
          </TouchableOpacity>
        )
      }
    }

    return {
      headerTitle: (
        <Text style={styles.headerLeft}>
          { navigation.getParam("username") }
        </Text>
      ),
    }
  };

  isCurrentUser = () => {
    const { navigation, user: { id} } = this.props;
    const selectedId = navigation.getParam('id');

    return _.isNil(selectedId) || selectedId == id
  };

  componentDidMount() {
    const { navigation, user, selectedUser, getUserById } = this.props;
    const id = navigation.getParam('id');

    if (!this.isCurrentUser()) {
      getUserById(id);

      navigation.setParams({
        username: selectedUser.username,
      });
    } else {
      navigation.setParams({
        username: user.username,
        settingsPressed: this.settingsPressed
      });
    }
  }

  componentDidUpdate(prevProps: IProps) {
    const {
      selectedUser: {
        id,
        username
      },
      navigation
    } = this.props;

    if (prevProps.selectedUser.id != id) {
      navigation.setParams({
        username: username,
      });
    }
  }

  onMessagePressed = () => {
    const { createPrivateChat, navigation } = this.props;
    const recipientId = navigation.getParam('id');

    createPrivateChat(recipientId);
  };

  render() {
    const { user, selectedUser, loading } = this.props;
    const { firstName, lastName, profilePhoto, bio } = !this.isCurrentUser() ? selectedUser.userProfile : user.userProfile;

    if (loading) {
      return (
        <View>
          <Text>
            Loading...
          </Text>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <ImageBackground source={{ uri: "https://i.photographers.ua/thumbnails/pictures/42779/800xdsc_1087_1200.jpg" }} style={styles.wallPosterContainer}>
          <View style={styles.personalInfoContainer}>
            <UserAvatar uri={profilePhoto} size={100}/>

            <Text style={styles.fullName}>
              {firstName} {lastName}
            </Text>
          </View>
        </ImageBackground>

        <View style={styles.bioContainer}>
          <Text style={styles.bioText}>
            {bio}
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <HiglightButton onPress={this.onMessagePressed} textStyle={styles.messageButtonText}>
            {this.isCurrentUser() ? STRINGS.MESSAGES : STRINGS.SEND_MESSAGE}
          </HiglightButton>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state: IReducerStates) => {
  const { user, selectedUser, loading, error }: IUserReducer = state.userProfileReducer;

  return {
    user,
    selectedUser,
    loading,
    error
  };
};


const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    getUserById: (id: string) => dispatch(getUserById(id)),
    createPrivateChat: (recipientId: string) => dispatch(createPrivateChat(recipientId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
