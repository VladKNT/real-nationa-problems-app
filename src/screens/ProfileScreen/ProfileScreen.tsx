import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Button, Input } from '../../components/common';
import UserAvatar from '../../components/UserAvatar/UserAvatar';
import STRINGS from '../../constants/strings';
import styles from './Styles';
import {IReducerStates} from '../../redux/reducers';
import { IUserProfileReducer } from '../../redux/reducers/userProfileReducer';
import {  Dispatch } from 'redux';
import { connect } from 'react-redux';

interface Props {
  navigation: any
  user: IUserProfileReducer
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
    return (
      <View style={styles.container}>
        <Text>
          FeedScreen
        </Text>
        <UserAvatar />
      </View>
    )
  }
}

const mapStateToProps = (state: IReducerStates) => {
  return {
    user: state.userProfileReducer
  };
};


const mapDispatchToProps = (dispatch: Dispatch) => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
