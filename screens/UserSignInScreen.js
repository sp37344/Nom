import React from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import styles from '../styles';
import App from '../App.js';
import * as firebase from 'firebase';

export default class UserSignInScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
  }

  static navigationOptions = {
    header: null,
  };

  verifyUserSignIn(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        this.props.navigation.navigate('User');
      })
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
      <View style={styles.loginContainer}>
        <View style={styles.loginInputContainer}>
        <View style={styles.loginField}>
          <Text style={styles.loginTitle}> User Login </Text>
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
        </View>
        <View style={styles.inputContainer}>
          <Text> New user? Sign up </Text>
          <Text
            onPress={() => navigate('UserSignUp')}
            style={styles.link}>
            here.
          </Text>
        </View>
        <View style={styles.buttons}>
        <TouchableOpacity onPress={this.handlPress}>
          <Text 
            onPress={() => this.verifyUserSignIn(this.state.email, this.state.password)}
            style={styles.buttonOpaque}
            textDecorationLine={'underline'}>
            Log In
          </Text>
        </TouchableOpacity>
        </View>
      </View>
    );
  }
}
