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

export default class RestaurantVerificationScreen extends React.Component {
  static navigationOptions = {
    title: 'Registration Submitted',
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.getStartedText}> 
            Thank you for your application! We will review your restaurant information and provide you with a temporary password within 1-3 business days.
          </Text> 
        </View>
        <View style={styles.buttons}>
          <Button
            onPress={() => navigate('Home')}
            title='Go Home'
          />
        </View>
      </ScrollView>
    );
  }
}

