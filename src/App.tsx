import React, { Component } from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator, createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';
import NavigationService from '../src/services/NavigationSecrvice';
import COLORS from './constants/colors';
import Icon from 'react-native-vector-icons/Ionicons';


import SplashScreen from './screens/SplashScreen/SplashScreen';
import SignInScreen from './screens/SignInScreen/SignInScreen';
import SighUpScreen from './screens/SighUpScreen/SighUpScreen';
import FeedScreen from './screens/FeedScreen/FeedScreen';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen';

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

const Feed = createStackNavigator(
  {
    FeedScreen: { screen: FeedScreen },
  }, {
    headerMode: 'none',
    initialRouteName: 'FeedScreen',
    ...navigationOptions
  }
);

Feed.navigationOptions = ({ navigation }: any) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return { tabBarVisible };
};

const Profile = createStackNavigator(
  {
    ProfileScreen: { screen: ProfileScreen }
  }, {
    headerMode: 'none',
    initialRouteName: 'ProfileScreen',
    ...navigationOptions
  }
);

Profile.navigationOptions = ({ navigation }: any) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return { tabBarVisible };
};

const tabBarOptions = {
    showLabel: false,
    activeTintColor: COLORS.PRIMARY,
    inactiveTintColor: COLORS.INACTIVE_TB_TINT_COLOR,
    tabStyle: {
      backgroundColor: COLORS.PRIMARY_BACKGROUND,
      paddingVertical: 5
    },
    labelStyle: {
      fontSize: 11,
    },
    style: {
      height: 50,
      marginBottom: 0
    }
};

const SignedInArea = createBottomTabNavigator(
  {
    FeedTab: {
      screen: Feed,
      path: '/feed',
      navigationOptions: {
        ...navigationOptions,
        title: 'Home',
        tabBarIcon: ({ tintColor }: any) => (
          <Icon name={'md-home'} size={35} color={tintColor} />
        )
      }
    },

    ProfileTab: {
      screen: Profile,
      path: '/profile',
      navigationOptions: {
        ...navigationOptions,
        title: 'Profile',
        tabBarIcon: ({ tintColor }: any) => (
          <Icon name={'md-person'} size={35} color={tintColor} />
        )
      }
    }
  }, {
    tabBarOptions,
    initialRouteName: 'FeedTab'
  }
);

const AuthScreens = createStackNavigator(
  {
    SignInScreen: SignInScreen,
    SighUpScreen: SighUpScreen,
  }, {
    headerMode: 'none',
    initialRouteName: 'SignInScreen',
    navigationOptions: {
      gesturesEnabled: false
    }
  }
);

const SignedInScreens = createStackNavigator(
  {
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
    const RootNavigator = createAppContainer(createSwitchNavigator(
      {
        SplashScreen: SplashScreen,
        AuthScreens: AuthScreens,
        SignedInScreens: SignedInArea
      }, {
        initialRouteName: 'SplashScreen'
      }
    ));


    return (
      <RootNavigator ref={(nav: any) => NavigationService.setNavigator(nav)} />
    )
  }
}
