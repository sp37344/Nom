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
      dietaryRestrictions: 'List dietary restrictions here',
      cuisine: 'List cuisine types here'
      // dietaryRestrictions: [],
    };
  }

  static navigationOptions = {
    title: 'New Post',
  };

  restaurantPostFood(item, description, dietaryRestrictions, cuisine) {
    var user = firebase.auth().currentUser;
    var restaurant = user.email;
    firebase.database().ref('food/').push({
      item,
      description,
      restaurant,
      dietaryRestrictions,
      cuisine
    }).then((data) => {
      // success callback
      console.log('data ', data)
      this.props.navigation.navigate('RestaurantPost');
    }).catch((error) => {
      // error callback
      console.log('error ', error)
    })
  }

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
          <Text style={styles.label}> Dietary Restrictions: </Text>
          <TextInput
            onFocus={() => this.setState({dietaryRestrictions: ''})}
            onChangeText={(text) => this.setState({dietaryRestrictions: text})}
            style={styles.input}
            value={this.state.dietaryRestrictions}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}> Cuisine Type: </Text>
          <TextInput
            onFocus={() => this.setState({cuisine: ''})}
            onChangeText={(text) => this.setState({cuisine: text})}
            style={styles.input}
            value={this.state.cuisine}
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
        <View style={styles.buttons}>
          <Button
            onPress={() => this.restaurantPostFood(this.state.item, this.state.description, this.state.dietaryRestrictions, this.state.cuisine)}
            title='Submit'
          />
        </View>
      </ScrollView>
    );
  }
}
