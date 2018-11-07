import React from 'react';
import { Platform } from 'react-native';
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';

// import TabBarIcon from '../components/TabBarIcon';
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

export default createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  HomeStack,
  UserStack,
  RestaurantStack,
  UserSignUpStack,
  RestaurantSignUpStack,
  RestaurantVerificationStack,
});
