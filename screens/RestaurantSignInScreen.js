import React from 'react';
import {
  Button,
  ScrollView,
  View,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import styles from '../styles';
import App from '../App.js';
import * as firebase from 'firebase';

export default class RestaurantSignInScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'example@gmail.com',
      password: '',
    };
  }

  static navigationOptions = {
    title: 'Restaurant Sign In',
  };
/*
  async getRestaurantAvailableList() {
    var user = firebase.auth().currentUser;
    var restaurant = user.email;
    console.log('Getting restaurant available list')
    var availableList = [];
    var query = firebase.database().ref('food/').orderByChild("restaurant").equalTo(restaurant);
    await query.once("value")
      .then(async function(snapshot) {
        snapshot.forEach( function(childSnapshot) {
          console.log(childSnapshot.child("item").val());
          console.log(childSnapshot.child("description").val());
          console.log(childSnapshot.child("price").val());
          console.log(childSnapshot.child("restaurant").val());
          console.log(childSnapshot.child("dietaryRestrictions").val());
          console.log(childSnapshot.child("cuisine").val());

          availableList.push(
          { item: childSnapshot.child("item").val(),
            description: childSnapshot.child("description").val(),
            price: childSnapshot.child("price").val(),
            dietaryRestrictions: childSnapshot.child("dietaryRestrictions").val(),
            cuisine: childSnapshot.child("cuisine").val()
          });

        })
      })
      .then(async function() {
        console.log('AVAILABLE LIST IN FUNCTION');
        console.log(availableList);
        return availableList;
      })
  }

  dummyFunction = () => {
    return this.getRestaurantAvailableList().then(result => result);
  }
*/
  async verifyRestaurantSignIn(email, password) {
    /*var list;
    list = this.dummyFunction();
    await this.getRestaurantAvailableList().then(async (response) => {
      list = response;
    })
    console.log("response", list);*/
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
          this.props.navigation.navigate('Restaurant');
        })
        /*
          var list =  await this.getRestaurantAvailableList();
          console.log("list ", list);
          this.props.navigation.navigate('Restaurant', {availableList: list});
          */
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/wrong-password') {
          alert('Wrong password.');
        } else if (errorCode == 'auth/user-not-found') {
          alert('No account is found with this email.')
        } else if (errorCode == 'auth/invalid-email') {
          alert('Invalid email address.')
        } else {
          alert(errorMessage);
        }
        console.log(error);
      });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView style={styles.container}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}> Email </Text>
          <TextInput
            onFocus={() => this.setState({email: ''})}
            onChangeText={(text) => this.setState({email: text})}
            style={styles.input}
            value={this.state.email}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}> Password </Text>
          <TextInput
            onChangeText={(text) => this.setState({password: text})}
            secureTextEntry={true}
            style={styles.input}
            value={this.state.password}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text> New restaurant? Register </Text>
          <Text
            onPress={() => navigate('RestaurantSignUp')}
            style={styles.link}>
            here.
          </Text>
        </View>
        <View style={styles.buttons}>
          <Button
            onPress={() => this.verifyRestaurantSignIn(this.state.email, this.state.password)}
            title='Submit'
          />
        </View>
      </ScrollView>
    );
  }
}
