import React, { Component } from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IReducerStates } from '../../redux/reducers';
import { Input } from '../../components/common';
import UserAvatar from '../../components/UserAvatar/UserAvatar';
import STRINGS from '../../constants/strings';
import COLORS from '../../constants/colors';
import styles from './Styles';

interface Props {

}

interface State {

}

class EditProfileScreen extends Component <Props, State> {
  static navigationOptions = ({ navigation }: any) => ({
    headerTitle: 'Edit Profile',

    headerRight: (
      <TouchableOpacity style={styles.headerRight}>
        <Icon name={'md-checkmark'} size={25} color={COLORS.HIGHLIGHT}/>
      </TouchableOpacity>
    )
  });

  onInputChange = (name: string, data: string) => {

  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.avatarContainer}>
          <UserAvatar />

          <TouchableOpacity style={styles.changePhotoBtn}>
            <Text style={styles.changePhotoBtnText}>
              { STRINGS.CHANGE_PHOTO }
            </Text>
          </TouchableOpacity>
        </View>

        <View>
          <Input title={ STRINGS.FIRST_NAME }
                 onChangeText={(data: string) => this.onInputChange('firstName', data)}/>
          <Input title={ STRINGS.LAST_NAME }
                 onChangeText={(data: string) => this.onInputChange('lastName', data)} />
          <Input title={ STRINGS.USERNAME }
                 onChangeText={(data: string) => this.onInputChange('username', data)} />
          <Input title={ STRINGS.BIO }
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

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileScreen);
