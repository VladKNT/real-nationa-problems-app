import React, { Component } from 'react';
import { ScrollView, Text, TouchableOpacity, Image } from 'react-native';
import _ from "lodash";
import { Dispatch } from "redux";
import { connect } from 'react-redux';

import { IReducerStates } from "../../redux/reducers";
import { signUp } from "../../redux/actions/ActionCreators";
import { Button, Input } from '../../components/common';
import STRINGS from '../../constants/strings';
import IMAGES from '../../constants/images';
import { ISignUpParameters } from "../../constants/types";
import styles from './Styles';

interface Props {
  navigation: any,
  signUp: (signUpParameters: ISignUpParameters) => void
}

interface State {
  input: ISignUpParameters
}

class SighUpScreen extends Component <Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      input: {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        username: ''
      }
    }
  }

  onBackPressed = () => {
    const { goBack } = this.props.navigation;
    goBack();
  };

  onInputChange = (name: string, data: string) => {
    let input = this.state.input;
    _.set(input, name, data);

    this.setState({ input });
  };

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity style={styles.arrowBack} onPress={() => this.onBackPressed()}>
          <Image source={ IMAGES.ARROW_LEFT }/>
        </TouchableOpacity>

        <Text style={styles.title}>
          { STRINGS.CREATE_TITLE }
        </Text>

        <Input title={ STRINGS.FIRST_NAME }
           onChangeText={(data: string) => this.onInputChange('firstName', data)}/>
        <Input title={ STRINGS.LAST_NAME }
           onChangeText={(data: string) => this.onInputChange('lastName', data)} />
        <Input title={ STRINGS.USERNAME }
           onChangeText={(data: string) => this.onInputChange('username', data)} />
        <Input title={ STRINGS.EMAIL_ADDRESS }
           onChangeText={(data: string) => this.onInputChange('email', data)} />
        <Input title={ STRINGS.PASSWORD }
           onChangeText={(data: string) => this.onInputChange('password', data)}
           secureTextEntry />

        <Button onPress={() => this.props.signUp(this.state.input)}>
          { STRINGS.SIGN_UP }
        </Button>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state: IReducerStates) => {
  return {

  };
};


const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    signUp: (signUpParameters: ISignUpParameters) => dispatch(signUp(signUpParameters))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SighUpScreen);
