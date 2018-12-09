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

export default class UserViewPostInCartScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dish: 'Dish Name',
      details: 'List description of dish',
      ingredients: '',
      dietaryRestrictions: '',
      quantity: '1'
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
    const expirationDate = navigation.getParam('expirationDate', "9:00PM today");
    const datePosted = navigation.getParam('datePosted', "2:45PM today");
    const oldQuantity = navigation.getParam('oldQuantity', '1');
    const oldSubtotal = navigation.getParam('oldSubtotal', '1');
    var user = firebase.auth().currentUser;
    var email = user.email;
    var subtotal = price * quantity;
    console.log("subtotal ", subtotal);
    var currentTime = new Date();
    var orderTime = currentTime.valueOf();
    var userOrderQuery = firebase.database().ref('activeOrders/').orderByChild("userEmail").equalTo(email).limitToFirst(1);
    console.log('going through query')
    var alreadyHasActiveOrder = false;
    await userOrderQuery.once("value", async function(orderSnapshot) {
      if (orderSnapshot.exists()){
        console.log("THE ORDER EXISTS!");
        var snapshotKey = Object.keys(orderSnapshot.val())[0];
        console.log("snapshotKey: ", snapshotKey);
        console.log("order Snapshot: ", orderSnapshot);

        var foodItemsQuery = firebase.database().ref('activeOrders/' + snapshotKey).child("foodItems/").orderByChild("item").equalTo(item).limitToFirst(1);
        console.log("created foodItemsQuery: ", foodItemsQuery);

        await foodItemsQuery.once("value", async function (foodSnapshot) {
          if (foodSnapshot.exists()) {
            var foodSnapshotRef = foodSnapshot.ref;
            var foodSnapshotKey = Object.keys(foodSnapshot.val())[0];
            console.log("FOOD SNAPSHOT KEY", foodSnapshotKey);
            console.log("FOOD SNAPSHOT REF", foodSnapshotRef);
            console.log(foodSnapshot);
            // the food item already exists in the cart, so update the quantity
            console.log("item IS already in cart");
            console.log(foodSnapshot.val());
            console.log('q', quantity);
            console.log('s', subtotal);

            var oldSubtotalRef = firebase.database().ref('activeOrders/' + snapshotKey + '/foodItems/' + foodSnapshotKey + '/subtotal');
            await oldSubtotalRef.once('value', async function(oldSubtotalSnapshot) {
              var oldSubTotal = oldSubtotalSnapshot.val();
              // console.log('oldSubtotal 1: ', oldSubtotal);
              var oldTotalRef = firebase.database().ref('activeOrders/' + snapshotKey + '/total');
              await oldTotalRef.once('value', async function(snapshot) {
                oldTotal = snapshot.val();
                console.log('oldTotal', oldTotal);
                console.log('oldSubtotal ', oldSubTotal);
                console.log('subtotal ', subtotal);
                var newTotal = (oldTotal + subtotal - oldSubTotal).toFixed(2);
                console.log('newTotal ', newTotal);
                await firebase.database().ref('activeOrders/' + snapshotKey + '/foodItems/' + foodSnapshotKey).update({
                  quantity,
                  subtotal
                });
                console.log("updated the food snapshot");

                await firebase.database().ref('activeOrders/' + snapshotKey).update({
                  total: newTotal
                })
                console.log("updated the new total");

                console.log("all done yay");
                console.log("NAVIGATING TO USER POST");
              });
            })

          }
          else {
            console.log("ERROR");
          }
        });
      }
      else {
        console.log("ERROR");
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
          ${JSON.stringify(price)}
          {JSON.stringify(item)}
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
        <Text onPress={() => navigate("RestaurantNewPost")} style={styles.newPostText}> Add to cart </Text>
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
