import React from 'react';
import {
  Button,
  ScrollView,
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import styles from '../styles';
import App from '../App.js';
import * as firebase from 'firebase';

export default class RestaurantSignUpScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: '',
      address: '',
      phone: '',
      email: '',
      active: 1,
    };
  }

  static navigationOptions = {
    // title: 'Restaurant Registration',
    header: null,
  };

  writeRestaurantData(name, password, address, phone, email) {
    var active = 1;
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
      <View style={styles.loginContainer}>
        <View style={styles.loginInputContainer}>
          <View style={styles.loginField}>
            <Text style={styles.loginTitle}> User Sign Up </Text>
            <Text style={styles.loginLabel}>name</Text>
            <TextInput
              onFocus={() => this.setState({name: ''})}
              onChangeText={(text) => this.setState({name: text})}
              style={styles.loginInput}
              value={this.state.name}
            />
          </View>
          <View style={styles.loginField}>
            <Text style={styles.loginLabel}>email</Text>
            <TextInput
              onFocus={() => this.setState({email: ''})}
              onChangeText={(text) => this.setState({email: text})}
              style={styles.loginInput}
              value={this.state.email}
            />
          </View>
          <View style={styles.loginField}>
            <Text style={styles.loginLabel}>password</Text>
            <TextInput
              onChangeText={(text) => this.setState({password: text})}
              secureTextEntry={true}
              style={styles.loginInput}
              value={this.state.password}
            />
          </View>
          <View style={styles.loginField}>
            <Text style={styles.loginLabel}>phone</Text>
            <TextInput
              onFocus={() => this.setState({phone: ''})}
              onChangeText={(text) => this.setState({phone: text})}
              style={styles.loginInput}
              value={this.state.phone}
            />
          </View>
          <View style={styles.loginField}>
            <Text style={styles.loginLabel}>address</Text>
            <TextInput
              onChangeText={(text) => this.setState({address: text})}
              onFocus={() => this.setState({address: ''})}
              style={styles.loginInput}
              value={this.state.address}
            />
          </View>
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
          <TouchableOpacity onPress={this.handlPress}>
            <Text 
              onPress={() => 
                this.writeRestaurantData(this.state.name, this.state.password, this.state.address, this.state.phone, this.state.email)
              }
              style={styles.buttonOpaque}
              textDecorationLine={'underline'}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
