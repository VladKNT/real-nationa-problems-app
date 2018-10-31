import React, { Component } from "react";
import { Platform } from "react-native";
import { createBottomTabNavigator, createStackNavigator, createSwitchNavigator } from "react-navigation";
import NavigationService from '../src/services/NavigationSecrvice';


import SplashScreen from './screens/SplashScreen/SplashScreen';
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import CreateAccountScreen from "./screens/CreateAccountScreen/CreateAccountScreen";
import FeedScreen from "./screens/FeedScreen/FeedScreen";

const navigationOptions = {
  navigationOptions: {
    headerStyle: {
      shadowColor: 'transparent',
      shadowRadius: 0,
      shadowOpacity: 0,
      shadowOffset: {
        height: 0,
      },
      elevation: 0,
      borderBottomWidth: 0,
      backgroundColor: '#fff',
      ...Platform.select({
        android: {
          marginTop: 24,
         }
       })
    },
    headerTitleAllowFontScaling: true,
  }
};

const AuthScreens = createStackNavigator({
    LoginScreen: LoginScreen,
    CreateAccountScreen: CreateAccountScreen,
  }, {
    headerMode: 'none',
    initialRouteName: 'LoginScreen',
    navigationOptions: {
      gesturesEnabled: false
    }
  }
);

const SignInScreens = createStackNavigator({
    FeedScreen: FeedScreen
  }, {
    headerMode: 'none',
    initialRouteName: 'FeedScreen',
    navigationOptions: {
      gesturesEnabled: false
    }
  }
);

export default class App extends Component {
  render() {
    const RootNavigator = createSwitchNavigator({
        SplashScreen: SplashScreen,
        AuthScreens: AuthScreens,
        SignInScreens: SignInScreens
      }, {
        initialRouteName: 'SplashScreen'
      }
    );

    return (
      <RootNavigator ref={(nav: any) => NavigationService.setNavigator(nav)} />
    )
  }
}
