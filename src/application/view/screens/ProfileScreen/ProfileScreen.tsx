import React, { Component } from "react";
import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import UserAvatar from "../../components/UserAvatar/UserAvatar";
import styles from "./Styles";
import { IReducerStates } from "../../../data/store/rootReducer";
import { IUser, IUserReducer } from "../../../../constants/types/user";
import COLORS from "../../../../constants/colors";

interface IProps {
  navigation: any;
  user: IUser;
  loading: boolean;
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
    const { navigation, user } = this.props;
    navigation.setParams({
      username: user.username,
      settingsPressed: this.settingsPressed
    });
  }

  render() {
    const { firstName, lastName, profilePhoto } = this.props.user.userProfile;

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
      </View>
    )
  }
}

const mapStateToProps = (state: IReducerStates) => {
  const { user, loading, error }: IUserReducer = state.userProfileReducer;

  return {
    user,
    loading,
    error
  };
};


const mapDispatchToProps = (dispatch: Dispatch) => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
