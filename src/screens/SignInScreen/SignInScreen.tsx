import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Button, Input } from '../../components/common';
import _ from 'lodash';
import STRINGS from '../../constants/strings';
import styles from './Styles';
import {IReducerStates} from "../../redux/reducers";
import {Dispatch} from "redux";
import {SignInParameters} from "../../constants/types";
import { signIn } from "../../redux/actions/ActionCreators";
import {connect} from "react-redux";

interface Props {
  navigation: any,
  signIn: (signInParameters: SignInParameters) => void
}

interface State {
  input: SignInParameters
}

class SignInScreen extends Component <Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      input: {
        login: '',
        password: ''
      }
    }
  }

    signUpPressed = () => {
      const { navigate } = this.props.navigation;
      navigate("SighUpScreen");
    };

    onInputChange = (name: string, data: string) => {
      let input = this.state.input;
       _.set(input, name, data);

       this.setState({ input });
    };

    render() {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>
            { STRINGS.LOGIN_TITLE }
          </Text>

          <Input title={ STRINGS.EMAIL_OR_USERNAME }
             onChangeText={(data: string) => this.onInputChange('login', data)} />
          <Input title={ STRINGS.PASSWORD }
             onChangeText={(data: string) => this.onInputChange('password', data)}
             secureTextEntry />

          <Button onPress={() => this.props.signIn(this.state.input)}>
            { STRINGS.LOGIN }
          </Button>

          <TouchableOpacity onPress={() => this.signUpPressed()}>
            <Text style={styles.questionText}>
                { STRINGS.ACCOUNT_QUESTION }
            </Text>
          </TouchableOpacity>
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
    signIn: (signInParameters: SignInParameters) => dispatch(signIn(signInParameters))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen);
