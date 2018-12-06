/* 


Here let's add basic user info 
and then below add 
purchases and statistics


*/

import React from 'react';
import {
  ImageBackground,
  Button,
  ScrollView,
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { Ionicons } from '@expo/vector-icons';
import { MonoText } from '../components/StyledText';
import styles from '../styles';
import App from '../App.js';
import * as firebase from 'firebase';

export default class UserProfileScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: 'User Profile',
  };

  /*
  renderDetail = () => {
    return (
      <View>
        <Text style={styles.subDetailText}>{this.props.detail}</Text>
      </View>
    )
  }
*/ 

  renderDescription = () => {
    return (
      <View>
        <Text style={styles.userProfileName}>David Nie</Text>
        <Text style={styles.descriptionText}>1 Nassau St., Princeton NJ 08544</Text>
      </View>
    )
  }

  renderPurchases = () => {
    return (
      <View>
        <Text style={styles.userProfileSubtitle}>Purchases</Text>
        <Text style={styles.descriptionText}>Here we grab from DB and map</Text>
      </View>
    )
  }

  renderStatistics = () => {
    return (
      <View>
        <Text style={styles.userProfileSubtitle}>Statistics</Text>
        <Text style={styles.descriptionText}>Add graphs after reading from DB</Text>
      </View>
    )
  }



  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.mainViewStyle}>
        <ScrollView style={styles.scroll}>
          <View style={styles.productRow}>{this.renderDescription()}</View>
          <View style={styles.productRow}>{this.renderPurchases()}</View>
          <View style={styles.productRow}>{this.renderStatistics()}</View>
        </ScrollView>
      </View>
    );
  }
}