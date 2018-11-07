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

export default class RestaurantSignUpScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Restaurant Name',
      password: '',
      address: 'Restaurant Address',
      phone: 'Phone Number',
      email: 'example@gmail.com',
      active: 1,
    };
  }

  static navigationOptions = {
    title: 'Restaurant Registration',
  };

  writeRestaurantData(name, password, address, phone, email) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        firebase.database().ref('restaurants/').push({
            name,
            password,
            address,
            phone,
            email,
            active
        }).then((data)=> {
            //success callback
            console.log('data ' , data)
            this.props.navigation.navigate('RestaurantVerification');
        }).catch((error)=> {
            //error callback
            console.log('error ' , error)
        })
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
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
          <Text style={styles.label}> Name </Text>
          <TextInput
            onFocus={() => this.setState({name: ''})}
            onChangeText={(text) => this.setState({name: text})}
            style={styles.input}
            value={this.state.name}
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
          <Text style={styles.label}> Address </Text>
          <TextInput
            onFocus={() => this.setState({address: ''})}
            onChangeText={(text) => this.setState({address: text})}
            style={styles.input}
            value={this.state.address}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}> Phone Number </Text>
          <TextInput
            onFocus={() => this.setState({phone: ''})}
            onChangeText={(text) => this.setState({phone: text})}
            style={styles.input}
            value={this.state.phone}
          />
        </View>
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
          <Text> Already have an account? Sign in </Text>
          <Text
            onPress={() => navigate('RestaurantSignIn')}
            style={styles.link}>
            here.
          </Text>
        </View>
        <View style={styles.buttons}>
          <Button
            onPress={() =>
              this.writeRestaurantData(this.state.name, this.state.password, this.state.address, this.state.phone, this.state.email)
              }
            title='Submit'
          />
          <Button
            onPress={() => navigate('Home')}
            title='Go Home'
          />
        </View>
      </ScrollView>
    );
  }
}
