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
import RestaurantStats from '../screens/RestaurantStatsScreen';
import RestaurantEditProfile from '../screens/RestaurantEditProfileScreen';
import RestaurantSettingsScreen from '../screens/RestaurantSettingsScreen';

const RestaurantPostStack = createStackNavigator({
  RestaurantPost: RestaurantPost,
  RestaurantNewPost: RestaurantNewPost,
  RestaurantViewPost: RestaurantViewPost,
  RestaurantEditPost: RestaurantEditPost,
  RestaurantViewFilledPost: RestaurantViewFilledPost,
});

RestaurantPostStack.navigationOptions = {
  tabBarLabel: 'Posts',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-list${focused ? '' : '-outline'}`
          : 'md-list'
      }
    />
  ),
};

const RestaurantProfileStack = createStackNavigator({
  Profile: RestaurantProfile,
  EditProfile: RestaurantEditProfile,
});

RestaurantProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-cafe${focused ? '' : '-outline'}` : 'md-cafe'}
    />
  ),
};

const RestaurantStatsStack = createStackNavigator({
  RestaurantStats: RestaurantStats,
});

RestaurantStatsStack.navigationOptions = {
  tabBarLabel: 'Statistics',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-trending-up${focused ? '' : '-outline'}` : 'md-trending-up'}
    />
  ),
};

const RestaurantSettingsStack = createStackNavigator({
  RestaurantSettings: RestaurantSettingsScreen,
});

RestaurantSettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-settings${focused ? '' : '-outline'}` : 'md-settings'}
    />
  ),
};

export default createBottomTabNavigator({
  RestaurantPostStack,
  RestaurantProfileStack,
  RestaurantStatsStack,
  RestaurantSettingsStack,
});
