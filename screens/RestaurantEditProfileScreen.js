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

export default class RestaurantEditProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'Restaurant Name',
      address: 'Restaurant Address',
      phone: 'Phone Number',
      email: 'example@gmail.com',
      description: 'Add description here.',
    };
  }

  static navigationOptions = {
    title: 'Edit Profile',
  };

  async updateProfile(name, address, phone, description) {
    var user = firebase.auth().currentUser;
    var email = user.email;

    var restaurantQuery = firebase.database().ref('restaurants/').orderByChild('email').equalTo(email).limitToFirst(1);
    console.log('going through query');

    await restaurantQuery.once('value', async function(restaurantSnapshot) {
      if (restaurantSnapshot.exists()) {
        var restaurantRef = restaurantSnapshot.ref;
        var restaurantKey = Object.keys(restaurantSnapshot.val())[0];
        console.log("restaurant snapshot: ", restaurantSnapshot);

        await firebase.database().ref('restaurants/' + restaurantKey).update({
          name,
          address,
          phone,
          description
        });
        console.log("done updating");
        navigate("Profile");
        return;
      } else {
        console.log('adding restaurant')

        var restaurantKey = await firebase.database().ref('restaurants/').push({
          name,
          address,
          phone,
          email,
          description
        }).key;

        console.log("restaurantKey", restaurantKey);
        console.log("done adding restaurant");
        navigate("Profile");
        return;

      }
    });
    navigate("Profile");
    return;
  }

  renderDetail = () => {
    return (
      <View>
        <TextInput
          onFocus={() => this.setState({description: ''})}
          onChangeText={(text) => this.setState({description: text})}
          style={styles.detailText}
          value={this.state.description}
        />
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
        <TextInput
          onFocus={() => this.setState({phone: ''})}
          onChangeText={(text) => this.setState({phone: text})}
          style={styles.descriptionEditText}
          value={this.state.phone}
        />
      </View>
    )
  }

  renderContactHeader = () => {
    const { img } = this.props
    return (
      <View style={styles.headerContainer}>
        <View style={styles.coverContainer}>
          <ImageBackground
            source={require("../assets/images/barbecue.jpg")}
            style={styles.coverImage}
          >
          </ImageBackground>
        </View>
      </View>
    )
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.mainViewStyle}>
        <ScrollView style={styles.scroll}>
          <View style={[styles.container, this.props.containerStyle]}>
            <View style={styles.cardContainer}>
              {this.renderContactHeader()}
            </View>
          </View>
          <View style={styles.productRow}>{this.renderDescription()}</View>
          <View style={styles.productRow}>{this.renderDetail()}</View>
        </ScrollView>
        <ScrollView style={styles.scroll}>
          <TouchableOpacity onPress={this.handlPress}>
            <Text onPress = {() => this.updateProfile(this.state.name, this.state.address, this.state.phone, this.state.description)}
              style={styles.buttonOpaque}
              textDecorationLine={'underline'}>
              Update Profile
            </Text>
          </TouchableOpacity>
        </ScrollView>
{/*        <View style={styles.footer}>
          <TouchableOpacity style={styles.buttonFooter}>
            <Text style={styles.textFooter}>CALL</Text>
          </TouchableOpacity>
          <View style={styles.borderCenter} />
          <TouchableOpacity style={styles.buttonFooter}>
            <Text style={styles.textFooter}>EMAIL</Text>
          </TouchableOpacity>
        </View> */}
      </View>
    );
  }
}
