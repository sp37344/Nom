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
    // const quantity = navigation.getParam('quantity', "4");
    const restaurant = navigation.getParam('restaurant', "Panera");
    const expirationDate = navigation.getParam('expirationDate', "9:00PM today")
    const datePosted = navigation.getParam('datePosted', "2:45PM today")
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
        var snapshotKey = Object.keys(orderSnapshot.val())[0];
        console.log("order Snapshot: ", orderSnapshot);
        console.log('user already has active order');

        var foodItemsOld = firebase.database().ref('activeOrders/' + snapshotKey).child("foodItems");

        console.log('OLD FOOD ITEMS REFERENCE: ');
        console.log(foodItemsOld);

        await foodItemsOld.push({
          item: item,
          price: price,
          description: description,
          quantity: quantity,
          subtotal: total,
          dietaryRestrictions: dietaryRestrictions,
          datePosted: datePosted,
          expirationDate: expirationDate
        })

        console.log('AFTER PUSHING TO OLD FOOD ITEMS');
        console.log(foodItemsOld);

        var oldTotalRef = firebase.database().ref('activeOrders/' + snapshotKey + '/total');
        await oldTotalRef.once('value', async function(snapshot) {
          oldTotal = snapshot.val();
          console.log('oldTotal', oldTotal);
          var newTotal = oldTotal + total;
          console.log("total ", total);
          console.log("newTotal ", newTotal);
          console.log("snapshotRef", snapshotRef);
          await firebase.database().ref('activeOrders/' + snapshotKey).update({
            orderTime: orderTime,
            total: newTotal
          });
          console.log("all done yay");
          console.log("NAVIGATING TO USER POST");
        });
      }
      else {
        console.log("adding user order")

        activeOrdersRef = firebase.database().ref('activeOrders/');
        console.log(activeOrdersRef);
        var newOrder = activeOrdersRef.push();
        await newOrder.update({
          userEmail: email,
          restaurant,
          orderTime,
          total
        })

        await newOrder.child("foodItems").push({
          item: item,
          price: price,
          description: description,
          quantity: quantity,
          subtotal: total,
          dietaryRestrictions: dietaryRestrictions,
          datePosted: datePosted,
          expirationDate: expirationDate
        });

        console.log("brand newOrder: ", newOrder);
        console.log("NAVIGATING TO USER POST");
      }
    });
    this.props.navigation.navigate("UserPost");
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
