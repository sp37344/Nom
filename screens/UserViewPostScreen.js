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
import App from '../App.js';
import * as firebase from 'firebase';

export default class UserViewPostScreen extends React.Component {
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
    title: 'View Post',
  };

  render() {
    const { navigate } = this.props.navigation;
    const { navigation } = this.props;
    const item = navigation.getParam(item, 'Bread');
    const price = navigation.getParam(price, '3.00');
    console.log(item);
    console.log(price);

    return (
      <ScrollView style={styles.container}>
      <View>
        <Text style={styles.label}>
          {JSON.stringify(item)}
          ${JSON.stringify(price)}
        </Text>
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: 1,
          }}
        />
      </View>
      </ScrollView>
    );
  }
}
