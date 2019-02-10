import React, { Component } from 'react';
import { createBottomTabNavigator, createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';
import NavigationService from '../src/services/NavigationSecrvice';
import COLORS from './constants/colors';
import Icon from 'react-native-vector-icons/Ionicons';


import SplashScreen from './screens/SplashScreen/SplashScreen';
import SignInScreen from './screens/SignInScreen/SignInScreen';
import SighUpScreen from './screens/SighUpScreen/SighUpScreen';
import FeedScreen from './screens/FeedScreen/FeedScreen';
import ProfileScreen from './screens/ProfileScreen/ProfileScreen';

const defaultNavigationOptions = {
  defaultNavigationOptions: {
    headerStyle: {
      shadowColor: 'transparent',
      shadowRadius: 0,
      shadowOpacity: 0,
      shadowOffset: {
        height: 0,
      },
      elevation: 3,
      backgroundColor: COLORS.PRIMARY_BAR,
    },
    headerTitleAllowFontScaling: true,
  }
};

const Feed = createStackNavigator(
  {
    FeedScreen: { screen: FeedScreen },
  }, {
    initialRouteName: 'FeedScreen',
    ...defaultNavigationOptions
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
    initialRouteName: 'ProfileScreen',
    ...defaultNavigationOptions
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
    activeTintColor: COLORS.BLACK,
    inactiveTintColor: COLORS.INACTIVE_TB_TINT_COLOR,
    tabStyle: {
      backgroundColor: COLORS.PRIMARY_BAR,
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
        ...defaultNavigationOptions,
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
        ...defaultNavigationOptions,
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
