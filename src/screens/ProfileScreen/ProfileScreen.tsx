import React, { Component } from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import UserAvatar from '../../components/UserAvatar/UserAvatar';
import styles from './Styles';
import { IReducerStates } from '../../redux/reducers';
import { IUserProfileReducer, IUserProfile, IUser } from '../../redux/reducers/userProfileReducer';
import COLORS from '../../constants/colors';

interface Props {
  navigation: any
  user: IUser,
  userProfile: IUserProfile,
  userProfileState: IUserProfileReducer,
  loading: boolean
}

interface State {
}

class ProfileScreen extends Component <Props, State> {
  constructor(props: Props) {
    super(props);
  }

  settingsPressed = () => {
    const { navigate } = this.props.navigation;
    navigate("EditProfileScreen");
  };

  static navigationOptions = ({ navigation }: any) => ({
    headerLeft: (
      <Text style={styles.headerLeft}>
        { navigation.getParam('username') }
      </Text>
    ),

    headerRight: (
      <TouchableOpacity style={styles.headerRight} onPress={navigation.getParam('settingsPressed')}>
        <Icon name={'md-settings'} size={25} color={COLORS.BLACK} />
      </TouchableOpacity>
    ),
  });

  componentDidMount() {
    const { navigation, userProfileState } = this.props;
    navigation.setParams({
      username: userProfileState.user.username,
      settingsPressed: this.settingsPressed
    });
  }

  render() {
    const { firstName, lastName } = this.props.userProfileState.user.userProfile;

    return (
      <View style={styles.container}>
        <ImageBackground source={{ uri: 'https://i.photographers.ua/thumbnails/pictures/42779/800xdsc_1087_1200.jpg' }} style={styles.wallPosterContainer}>
          <View style={styles.personalInfoContainer}>
            <UserAvatar size={100}/>

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
  return {
    userProfileState: state.userProfileReducer
  };
};


const mapDispatchToProps = (dispatch: Dispatch) => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
