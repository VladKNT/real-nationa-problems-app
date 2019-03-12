import React, { Component } from "react";
import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { getUserById } from "../../../data/store/user/userActions";
import UserAvatar from "../../components/UserAvatar/UserAvatar";
import { HiglightButton } from "../../components/common";
import { IReducerStates } from "../../../data/store/rootReducer";
import { IUser, IUserReducer } from "../../../../constants/types/user";
import COLORS from "../../../../constants/colors";
import styles from "./Styles";

interface IProps {
  navigation: any;
  user: IUser;
  selectedUser: IUser;
  loading: boolean;
  getUserById(id: string): void;
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

  static navigationOptions = ({ navigation }: any) => ({
    headerLeft: (
      <Text style={styles.headerLeft}>
        { navigation.getParam("username") }
      </Text>
    ),

    headerRight: (
      <TouchableOpacity style={styles.headerRight} onPress={navigation.getParam("settingsPressed")}>
        <Icon name={"md-settings"} size={25} color={COLORS.BLACK} />
      </TouchableOpacity>
    ),
  });

  componentDidMount() {
    const { navigation, user, selectedUser, getUserById } = this.props;
    const id = navigation.getParam('id');

    if (id) {
      getUserById(id)
    }

    navigation.setParams({
      username: id ? selectedUser.username : user.username,
      settingsPressed: this.settingsPressed
    });
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

  render() {
    const { navigation, user, selectedUser, loading } = this.props;
    const id = navigation.getParam('id');
    const { firstName, lastName, profilePhoto, bio } = id ? selectedUser.userProfile : user.userProfile;

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
          <HiglightButton onPress={() =>{}} textStyle={styles.messageButtonText}>
            Send message
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
    getUserById: (id: string) => dispatch(getUserById(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
