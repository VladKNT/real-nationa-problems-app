import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Button, Input } from '../../components/common';
import STRINGS from '../../constants/strings';
import styles from './Styles';
import {IReducerStates} from "../../redux/reducers";
import {Dispatch} from "redux";
import {ISignInParameters} from "../../constants/types";
import {connect} from "react-redux";

interface Props {
  navigation: any
}

interface State {

}

class FeedScreen extends Component <Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>
          Feed Screen
        </Text>
      </View>
    )
  }
}

const mapStateToProps = (state: IReducerStates) => {
  return {

  };
};


const mapDispatchToProps = (dispatch: Dispatch) => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedScreen);
