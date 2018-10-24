import React from 'react';
import {
  Button,
  ScrollView, 
  StyleSheet, 
  Text, 
  TextInput,
  View, 
} from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import styles from '../styles';

export default class UserSignUpScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Your name here',
      email: 'example@gmail.com',
      password: '',
    };
  }

  static navigationOptions = {
    title: 'User Sign Up',
  };

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
            onPress={() => void(0)}
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
