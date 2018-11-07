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

export default class RestaurantNewPostScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: 'Item Name',
      description: 'List description of dish',
      ingredients: 'List ingredients here',
      dietaryRestrictions: [],
    };
  }

  static navigationOptions = {
    title: 'New Post',
  };

  render() {
    const { navigate } = this.props.navigation;

    const diets = [
      {
        name: 'gluten-free'
      },
      {
        name: 'vegan'
      },
      {
        name: 'pescatarian'
      },
    ]

    return (
      <ScrollView style={styles.container}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}> Item: </Text>
          <TextInput
            onFocus={() => this.setState({item: ''})}
            onChangeText={(text) => this.setState({item: text})}
            style={styles.input}
            value={this.state.item}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}> Description: </Text>
          <TextInput
            onFocus={() => this.setState({description: ''})}
            onChangeText={(text) => this.setState({description: text})}
            style={styles.input}
            value={this.state.description}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}> Ingredients: </Text>
          <TextInput
            onFocus={() => this.setState({ingredients: ''})}
            onChangeText={(text) => this.setState({ingredients: text})}
            style={styles.input}
            value={this.state.ingredients}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}> Item: </Text>
          <SearchBar
            lightTheme
            round
            showLoading
            containerStyle={styles.searchContainer}
            placeholder='Search' />
        </View>
      </ScrollView>
    );
  }
}
