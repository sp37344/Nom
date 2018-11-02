import React from 'react';
import { 
  Button,
  ScrollView, 
  View, 
  StyleSheet, 
  Text, 
  TextInput,
  Platform,
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { ExpoLinksView } from '@expo/samples';
import styles from '../styles';

export default class RestaurantNewPostScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dish: 'Dish Name',
      details: 'List description of dish',
      ingredients: '',
      dietaryRestrictions: '',
    };
  }

  static navigationOptions = {
    title: 'New Post',
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView style={styles.container}>
        <SearchBar
          showLoading
          platform="android"
          placeholder='Search' />
      </ScrollView>
    );
  }
}
