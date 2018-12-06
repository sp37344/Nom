import React from 'react';
import { 
  Button,
  ScrollView, 
  View, 
  StyleSheet, 
  Text, 
  TextInput,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { ExpoLinksView } from '@expo/samples';
import styles from '../styles';
import App from '../App.js';
import * as firebase from 'firebase';

export default class UserEditProfileScreen extends React.Component {
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
    title: 'Edit Profile',
  };

  renderDetail = () => {
    return (
      <View>
        <Text style={styles.detailText}>description</Text>
        <Text style={styles.subDetailText}>{this.props.detail}</Text>
      </View>
    )
  }

  renderDescription = () => {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <TextInput 
          onFocus={() => this.setState({name: ''})}
          onChangeText={(text) => this.setState({name: text})}
          style={styles.restaurantEditText}
          value={this.state.name}
        />
        <TextInput 
            onFocus={() => this.setState({address: ''})}
            onChangeText={(text) => this.setState({address: text})}
            style={styles.descriptionEditText}
            value={this.state.address}
          />
      </View>
    )
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.mainViewStyle}>
        <ScrollView style={styles.scroll}>
          <View style={styles.productRow}>{this.renderDescription()}</View>
          <View style={styles.productRow}>{this.renderDetail()}</View>
        </ScrollView>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.buttonFooter}>
            <Text style={styles.textFooter}>Stuff</Text>
          </TouchableOpacity>
          <View style={styles.borderCenter} />
          <TouchableOpacity style={styles.buttonFooter}>
            <Text style={styles.textFooter}>Stuff</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}