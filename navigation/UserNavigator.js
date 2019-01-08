import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';

import RestaurantPost from '../screens/RestaurantPostScreen';
import RestaurantNewPost from '../screens/RestaurantNewPostScreen';
import RestaurantViewPost from '../screens/RestaurantViewPostScreen';
import RestaurantViewFilledPost from '../screens/RestaurantViewFilledPostScreen';
import RestaurantEditPost from '../screens/RestaurantEditPostScreen';

import UserPost from '../screens/UserPostScreen';
import UserProfile from '../screens/UserProfileScreen';
import UserSettingsScreen from '../screens/RestaurantSettingsScreen';
import UserViewPost from '../screens/UserViewPostScreen';
import UserPayment from '../screens/UserPaymentScreen';
import Payment from '../screens/PaymentScreen';

// Posts for User
const UserPostStack = createStackNavigator({
  UserPost: UserPost,
  UserViewPost: UserViewPost,
  UserPayment: UserPayment,
  Payment: Payment,
  RestaurantNewPost: RestaurantNewPost,
  RestaurantViewPost: RestaurantViewPost,
  RestaurantEditPost: RestaurantEditPost,
  RestaurantViewFilledPost: RestaurantViewFilledPost,
});

UserPostStack.navigationOptions = {
  tabBarLabel: 'Posts',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

// User Profile
const UserProfileStack = createStackNavigator({
  UserProfile: UserProfile,
});

UserProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-link${focused ? '' : '-outline'}` : 'md-link'}
    />
  ),
};

const UserSettingsStack = createStackNavigator({
  UserSettings: UserSettingsScreen,
});

UserSettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-options${focused ? '' : '-outline'}` : 'md-options'}
    />
  ),
};

export default createBottomTabNavigator({
  UserPostStack,
  UserProfileStack,
  UserSettingsStack,
});
