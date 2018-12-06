
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

export default class UserSignUpScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
    };
  }

  static navigationOptions = {
    header: null,
  };

  writeUserData(email,name,password) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        firebase.database().ref('users/').push({
            email,
            name,
            password
        }).then((data)=> {
            //success callback
            console.log('data ' , data)
            this.props.navigation.navigate('UserSignIn');
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
/*
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
          <Text> Already have an account? Sign in </Text>
          <Text
            onPress={() => navigate('UserSignIn')}
            style={styles.link}>
            here.
          </Text>
        </View>
        <View style={styles.buttons}>
          <Button
            onPress={() =>
              this.writeUserData(this.state.email, this.state.name, this.state.password)}
            title='Submit'
          />
        </View>
      </ScrollView>
    );
  }
}*/
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
        </View>
        <View style={styles.inputContainer}>
          <Text> Already have an account? Sign in </Text>
          <Text
            onPress={() => navigate('UserSignIn')}
            style={styles.link}>
            here.
          </Text>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity onPress={this.handlPress}>
            <Text 
              onPress={() => 
                this.writeUserData(this.state.email, this.state.name, this.state.password)}
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
