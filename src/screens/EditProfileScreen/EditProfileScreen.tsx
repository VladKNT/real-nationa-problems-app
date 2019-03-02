import React, { Component } from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import _ from 'lodash';
import { ReactNativeFileOptions } from 'extract-files';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

import { IReducerStates } from '../../redux/reducers';
import { updateUserProfile } from "../../redux/actions/ActionCreators";
import { IUserProfileReducer } from '../../redux/reducers/userProfileReducer';

import { Input } from '../../components/common';
import UserAvatar from '../../components/UserAvatar/UserAvatar';
import ImagePhotoPicker from '../../components/ImagePhotoPicker/ImagePhotoPicker';
import STRINGS from '../../constants/strings';
import COLORS from '../../constants/colors';
import { IEditProfileParameters } from '../../constants/types';
import styles from './Styles';

interface Props {
  navigation: any,
  userProfileState: IUserProfileReducer,
  updateUserProfile: (userInfo: IEditProfileParameters) => void
}

interface State {
  userInfo: IEditProfileParameters,
}

class EditProfileScreen extends Component <Props, State> {
  constructor(props: Props) {
    super(props);

    const { firstName, lastName, profilePhoto, imageFile, bio } = props.userProfileState.user.userProfile;
    const { id, username } = props.userProfileState.user;

    this.state = {
      userInfo: {
        id,
        username,
        firstName,
        lastName,
        profilePhoto,
        imageFile,
        bio
      },
    };
  };

  onSavePressed = () => {
    this.props.updateUserProfile(this.state.userInfo);
  };


  static getDerivedStateFromProps(props: Props, state: State) {
    const { firstName, lastName, profilePhoto, bio } = props.userProfileState.user.userProfile;
    const { id, username } = props.userProfileState.user;

    return {
      userInfo: {
        id,
        username,
        firstName,
        lastName,
        profilePhoto,
        bio
      },
    }
  };

  componentDidMount() {
    const { navigation } = this.props;
    navigation.setParams({
      onSavePressed: this.onSavePressed
    });
  };

  static navigationOptions = ({ navigation }: any) => ({
    headerTitle: STRINGS.EDIT_PROFILE,

    headerRight: (
      <TouchableOpacity style={styles.headerRight} onPress={navigation.getParam('onSavePressed')}>
        <Icon name={'md-checkmark'} size={25} color={COLORS.HIGHLIGHT}/>
      </TouchableOpacity>
    )
  });

  onInputChange = (name: string, data: string) => {
    let userInfo = this.state.userInfo;
    _.set(userInfo, name, data);

    this.setState({ userInfo });
  };

  onImagePicked = (uri: string, imageFile: ReactNativeFileOptions) => {
    this.onInputChange('profilePhoto', uri);
    this.onInputChange('imageFile', imageFile);
  };

  render() {
    const { username, firstName, lastName, profilePhoto, bio } = this.state.userInfo;

    return (
      <ScrollView style={styles.container}>
        <View style={styles.avatarContainer}>
          <UserAvatar size={100} uri={ profilePhoto }/>

          <ImagePhotoPicker onPick={this.onImagePicked} style={styles.changePhotoBtn}>
            <Text style={styles.changePhotoBtnText}>
              { STRINGS.CHANGE_PHOTO }
            </Text>
          </ImagePhotoPicker>
        </View>

        <View>
          <Input title={STRINGS.FIRST_NAME}
                 value={firstName}
                 onChangeText={(data: string) => this.onInputChange('firstName', data)}/>
          <Input title={STRINGS.LAST_NAME}
                 value={lastName}
                 onChangeText={(data: string) => this.onInputChange('lastName', data)} />
          <Input title={STRINGS.USERNAME}
                 value={username}
                 onChangeText={(data: string) => this.onInputChange('username', data)} />
          <Input title={STRINGS.BIO}
                 value={bio}
                 onChangeText={(data: string) => this.onInputChange('bio', data)} />
        </View>
      </ScrollView>
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
    updateUserProfile: (userInfo: IEditProfileParameters) => dispatch(updateUserProfile(userInfo))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileScreen);
