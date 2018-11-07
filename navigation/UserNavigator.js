import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';

import RestaurantPost from '../screens/RestaurantPostScreen';
import RestaurantNewPost from '../screens/RestaurantNewPostScreen';
import RestaurantViewPost from '../screens/RestaurantViewPostScreen';
import RestaurantViewFilledPost from '../screens/RestaurantViewFilledPostScreen';
import RestaurantEditPost from '../screens/RestaurantEditPostScreen';
import RestaurantProfile from '../screens/RestaurantProfileScreen';
import RestaurantSettingsScreen from '../screens/RestaurantSettingsScreen';

import UserPost from '../screens/UserPostScreen';
import UserViewPost from '../screens/UserViewPostScreen';

// Posts for User
const UserPostStack = createStackNavigator({
  UserPost: UserPost,
  UserViewPost: UserViewPost,
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
  Profile: RestaurantProfile,
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
  RestaurantSettings: RestaurantSettingsScreen,
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
