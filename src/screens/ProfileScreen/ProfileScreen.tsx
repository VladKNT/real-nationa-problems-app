import React, { Component } from 'react';
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { Button, Input } from '../../components/common';
import UserAvatar from '../../components/UserAvatar/UserAvatar';
import STRINGS from '../../constants/strings';
import styles from './Styles';
import { IReducerStates } from '../../redux/reducers';
import { IUserProfileReducer, IUserProfile, IUser } from '../../redux/reducers/userProfileReducer';
import { UserProfile } from "../../constants/types";
import {  Dispatch } from 'redux';
import { connect } from 'react-redux';

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

  componentDidMount() {
    console.info(this.props.user)
  }

  render() {
    const { firstName, lastName } = this.props.userProfileState.user.userProfile;

    return (
      <View style={styles.container}>
        <ImageBackground source={{ uri: 'https://i.photographers.ua/thumbnails/pictures/42779/800xdsc_1087_1200.jpg' }} style={styles.wallPosterContainer}>
          <View style={styles.personalInfoContainer}>
            <UserAvatar />

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
