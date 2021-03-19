import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
// import { createDrawerNavigator } from 'react-navigation-drawer';
import * as Routes from './routes';
import 'react-native-gesture-handler';

import Login from '../Controllers/login.controller';
import Home from '../Controllers/home.controller';
import SelectMultipleOptions from '../Controllers/selectMultipleOptions.controller';

const LoginStack = createStackNavigator({
  // [`${Routes.Login}`]: {
  //   screen: Login,
  //   navigationOptions: {
  //     gesturesEnabled: false,
  //   },
  // },
  [`${Routes.Home}`]: {
    screen: Home,
    navigationOptions: {
      gestureEnabled: false,
    },
  },
  [`${Routes.SelectMultipleOptions}`]: {
    screen: SelectMultipleOptions,
    navigationOptions: {
      gestureEnabled: false,
    },
  },
});

const AppNavigator = createSwitchNavigator(
  {
    [`${Routes.LoginStack}`]: {
      screen: LoginStack,
    },
  },
  {
    initialRouteName: Routes.LoginStack,
  },
);

export default createAppContainer(AppNavigator);
