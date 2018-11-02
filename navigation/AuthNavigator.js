import React from 'react';
import { Platform } from 'react-native';
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import UserSignIn from '../screens/UserSignInScreen';
import RestaurantSignIn from '../screens/RestaurantSignInScreen';
import UserSignUp from '../screens/UserSignUpScreen';
import RestaurantSignUp from '../screens/RestaurantSignUpScreen';
import RestaurantVerification from '../screens/RestaurantVerificationScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

const UserStack = createStackNavigator({
  UserSignIn: UserSignIn,
});

const RestaurantStack = createStackNavigator({
  RestaurantSignIn: RestaurantSignIn,
});

const UserSignUpStack = createStackNavigator({
  UserSignUp: UserSignUp,
});

const RestaurantSignUpStack = createStackNavigator({
  RestaurantSignUp: RestaurantSignUp,
});

const RestaurantVerificationStack = createStackNavigator({
  RestaurantVerification: RestaurantVerification,
});

export default createStackNavigator({
  HomeStack, 
  UserStack, 
  RestaurantStack,
  UserSignUpStack, 
  RestaurantSignUpStack,
  RestaurantVerificationStack,
});