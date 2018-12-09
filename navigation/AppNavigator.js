import React from 'react';
import { createSwitchNavigator } from 'react-navigation';

import AuthNavigator from './AuthNavigator';
import RestaurantNavigator from './RestaurantNavigator';
import UserNavigator from './UserNavigator';

export default createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  User: UserNavigator,
  Auth: AuthNavigator, 
  Restaurant: RestaurantNavigator,

});
