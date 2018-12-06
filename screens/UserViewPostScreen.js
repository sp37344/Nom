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
      item: 'Muffins',
      price: '$2.50',
      quantity: 5,
      description: 'Standard Bread',
      ingredients: 'Egg, Milk, Nuts',
      dietaryRestrictions: 'None',
      moneySaved: '$4.50',
      foodWaste: '5 oz.',
    };
    // Make these props.
  }

  static navigationOptions = {
    title: 'View Post',
  };
  // TODO: We could make this completely dynamic depending on db implementation

  // For the button return not available if error from requesting buy 
  render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView style={styles.container}>
      <View style={styles.inputContainer}>
          <Text style={styles.label}> Item </Text>
          <Text style={styles.tabBarInfoText}> {this.state.item} </Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}> Price </Text>
          <Text style={styles.tabBarInfoText}>  {this.state.price } </Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}> Quantity </Text>
          <Text style={styles.tabBarInfoText}>  {this.state.quantity } </Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}> Description </Text>
          <Text style={styles.tabBarInfoText}>  {this.state.description } </Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}> Ingredients </Text>
          <Text style={styles.tabBarInfoText}> {this.state.ingredients} </Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}> Item </Text>
          <Text style={styles.tabBarInfoText}> {this.state.dietaryRestrictions} </Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}> Money Saved </Text>
          <Text style={styles.tabBarInfoText}>  {this.state.moneySaved } </Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}> Food Waste </Text>
          <Text style={styles.tabBarInfoText}>  {this.state.foodWaste } </Text>
        </View>
        <View style={styles.buttons}>
          <Button
            title='Purchase'
          />
        </View>
      </ScrollView>
    );
  }
}
