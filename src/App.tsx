import React, { Component } from 'react';
import { createBottomTabNavigator, createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';
import NavigationService from './application/data/services/NavigationSecrvice';
import COLORS from './constants/colors';
import Icon from 'react-native-vector-icons/Ionicons';


import SplashScreen from './application/view/screens/SplashScreen/SplashScreen';
import SignInScreen from './application/view/screens/SignInScreen/SignInScreen.Component';
import SighUpScreen from './application/view/screens/SignUpScreen/SignUpScreen.Component';
import FeedScreen from './application/view/screens/FeedScreen/FeedScreen.Component';
import ProfileScreen from './application/view/screens/ProfileScreen/ProfileScreen.Component';
import EditProfileScreen from './application/view/screens/EditProfileScreen/EditProfileScreen.Component';
import EventScreen from './application/view/screens/EventScreen/EventScreen.Component';
import SaveEventScreen from './application/view/screens/SaveEventScreen/SaveEventScreen.Component';
import MapScreen from './application/view/screens/MapScreen/MapScreen.Component';

const ICON_SIZE = 35;

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
      backgroundColor: COLORS.BAR,
    },
    headerTitleAllowFontScaling: true,
  }
};

const Feed = createStackNavigator(
  {
    FeedScreen: FeedScreen,
    EventScreen: EventScreen,
    MapScreen: MapScreen,
    ProfileScreen: ProfileScreen,
    EditProfileScreen: EditProfileScreen
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
    ProfileScreen: ProfileScreen,
    EditProfileScreen: EditProfileScreen
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

const SaveEvent = createStackNavigator(
  {
    SaveEventScreen: SaveEventScreen,
    MapScreen: MapScreen,
  }, {
    initialRouteName: 'SaveEventScreen',
    ...defaultNavigationOptions
  }
);

SaveEvent.navigationOptions = ({ navigation }: any) => {
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
      backgroundColor: COLORS.BAR,
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
          <Icon name={'md-home'} size={ICON_SIZE} color={tintColor} />
        )
      }
    },

    SaveEventTab: {
      screen: SaveEvent,
      path: '/saveEvent',
      navigationOptions: {
        ...defaultNavigationOptions,
        title: 'Save Event',
        tabBarIcon: ({ tintColor }: any) => (
          <Icon name={'md-add-circle-outline'} size={ICON_SIZE} color={tintColor} />
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
          <Icon name={'md-person'} size={ICON_SIZE} color={tintColor} />
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
