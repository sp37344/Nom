import React from 'react';
import {
  Button,
  ScrollView,
  View,
  StyleSheet,
  Text,
  TextInput,
  Platform,
  AppRegistry
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { ExpoLinksView } from '@expo/samples';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles';
import App from '../App.js';
import * as firebase from 'firebase';

export default class UserViewPostScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dish: 'Dish Name',
      details: 'List description of dish',
      ingredients: '',
      dietaryRestrictions: '',
      quantity: '1',
    };
  }

  static navigationOptions = {
    title: 'View Post',
  };


  async addOrder(quantity) {
    const { navigate } = this.props.navigation;
    const { navigation } = this.props;
    const item = navigation.getParam('item', "Bread");
    const price = navigation.getParam('price', "3.00");
    const description = navigation.getParam('description', "Delicious freshly baked");
    const dietaryRestrictions = navigation.getParam('dietaryRestrictions', "None");
    const restaurant = navigation.getParam('restaurant', "Panera");
    const expirationDate = navigation.getParam('expirationDate', "9:00PM today")
    const datePosted = navigation.getParam('datePosted', "2:45PM today")
    const foodKey = navigation.getParam('foodKey', '1')

    var user = firebase.auth().currentUser;
    var email = user.email;
    var total = price * quantity;
    var currentTime = new Date();
    var orderTime = currentTime.valueOf();
    var userOrderQuery = firebase.database().ref('activeOrders/').orderByChild("userEmail").equalTo(email).limitToFirst(1);
    console.log('going through query')
    var alreadyHasActiveOrder = false;
    await userOrderQuery.once("value", async function(orderSnapshot) {
      if (orderSnapshot.exists()) {
        var snapshotRef = orderSnapshot.ref;
        var orderKey = Object.keys(orderSnapshot.val())[0];
        console.log("order Snapshot: ", orderSnapshot);
        console.log('user already has active order');

        await firebase.database().ref('activeOrders/' + orderKey).update({
          restaurant,
          orderTime,
          item: item,
          price: price,
          description: description,
          quantity: quantity,
          dietaryRestrictions: dietaryRestrictions,
          datePosted: datePosted,
          expirationDate: expirationDate,
          total
        });

        console.log("foodKey", foodKey);
        navigate("UserPayment",
        {
          userEmail: email,
          restaurant,
          orderTime,
          item: item,
          price: price,
          description: description,
          quantity: quantity,
          dietaryRestrictions: dietaryRestrictions,
          datePosted: datePosted,
          expirationDate: expirationDate,
          total,
          foodKey,
          orderKey
        });
        return;
      }
      else {
        console.log("adding user order")

        var orderKey = await firebase.database().ref('activeOrders/').push({
          userEmail: email,
          restaurant,
          orderTime,
          item: item,
          price: price,
          description: description,
          quantity: quantity,
          dietaryRestrictions: dietaryRestrictions,
          datePosted: datePosted,
          expirationDate: expirationDate,
          total
        }).key;

        console.log("orderKey", orderKey);
        console.log("foodKey", foodKey);
        navigate("UserPayment", {
          userEmail: email,
          restaurant,
          orderTime,
          item: item,
          price: price,
          description: description,
          quantity: quantity,
          dietaryRestrictions: dietaryRestrictions,
          datePosted: datePosted,
          expirationDate: expirationDate,
          total,
          foodKey,
          orderKey
        });
        return;
      }
    });
    navigate("UserPayment",
    (
      userEmail: email,
      restaurant,
      orderTime,
      item: item,
      price: price,
      description: description,
      quantity: quantity,
      dietaryRestrictions: dietaryRestrictions,
      datePosted: datePosted,
      expirationDate: expirationDate,
      total,
      foodKey
    ));
    return;
  }




  render() {
    const { navigate } = this.props.navigation;
    const { navigation } = this.props;
    const item = navigation.getParam('item', "Bread");
    const price = navigation.getParam('price', "3.00");
    const description = navigation.getParam('description', "Delicious freshly baked");
    const dietaryRestrictions = navigation.getParam('dietaryRestrictions', "None");
    const quantity = navigation.getParam('quantity', "4");
    const restaurant = navigation.getParam('restaurant', "Panera");
    const expirationDate = navigation.getParam('expirationDate', "9:00PM today")
    const postedDate = navigation.getParam('postedDate', "2:45PM today")

    return (
      <ScrollView style={styles.container}>
      <View>
        <Text style={styles.label}>
          {JSON.stringify(item)}
          ${JSON.stringify(price)}
          {JSON.stringify(description)}
          {JSON.stringify(dietaryRestrictions)}
          {JSON.stringify(quantity)}
          {JSON.stringify(restaurant)}
          {JSON.stringify(postedDate)}
        </Text>
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: 1,
          }}
        />
        <View style={styles.inputContainer}>
          <Text style={styles.label}> Quantity: </Text>
          <TextInput
            onFocus={() => this.setState({quantity: ''})}
            onChangeText={(text) => this.setState({quantity: text})}
            style={styles.input}
            keyboardType='numeric'
            value={this.state.quantity}
          />
        </View>
      </View>
      <View style={styles.newPostContainer}>
        <Text onPress={() => this.addOrder(this.state.quantity)} style={styles.newPostText}> Add to cart </Text>
        <Ionicons
          name={Platform.OS === "ios" ? "ios-add-circle" : "md-add-circle"}
          color="gray"
          size={22}
          onPress={async () =>
            this.addOrder(this.state.quantity)
          }
        />
      </View>
      </ScrollView>
    );
  }
}
