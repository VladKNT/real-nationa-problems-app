import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Button, Input } from "../../components/common";
import _ from "lodash";

import { Dispatch } from "redux";
import {connect} from "react-redux";

import { IReducerStates } from "../../../data/store/rootReducer";
import { ISignInParameters } from "../../../../constants/types/auth";
import { signIn } from "../../../data/store/user/userActions";

import STRINGS from "../../../../constants/strings";
import styles from "./SignInScreen.Styles";

interface Props {
  navigation: any,
  signIn(signInParameters: ISignInParameters): void
}

interface State {
  input: ISignInParameters
}

class SignInScreen extends Component <Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      input: {
        login: "",
        password: ""
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
             onChangeText={(data: string) => this.onInputChange("login", data)} />
          <Input title={ STRINGS.PASSWORD }
             onChangeText={(data: string) => this.onInputChange("password", data)}
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
    signIn: (signInParameters: ISignInParameters) => dispatch(signIn(signInParameters))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen);
