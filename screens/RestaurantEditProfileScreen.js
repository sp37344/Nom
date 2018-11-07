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

export default class RestaurantEditProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Restaurant Name',
      address: 'Restaurant Address',
      phone: 'Phone Number',
      email: 'example@gmail.com',
    };
  }

  static navigationOptions = {
    title: 'Restaurant Registration',
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
            onPress={() => navigate('RestaurantVerification')}
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
