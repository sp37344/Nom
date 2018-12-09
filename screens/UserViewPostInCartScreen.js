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

            console.log("DIS MY STRING " + 'activeOrders/' + snapshotKey + '/foodItems/' + foodSnapshotKey);
            await firebase.database().ref('activeOrders/' + snapshotKey + '/foodItems/' + foodSnapshotKey).update({
              quantity,
              subtotal
            });
            console.log("updated the food snapshot");

            var oldTotal = orderSnapshot.child("total").val()
            var newTotal = oldTotal - oldSubtotal + subtotal;

            await firebase.database().ref('activeOrders/' + snapshotKey).update({
              total: newTotal
            })
            console.log("updated the new total");
          }
          else {
            console.log("ERROR");
          }
        });
      }
      else {
        console.log("ERROR");
      }
      // alreadyHasActiveOrder = true;
      // var snapshotRef = orderSnapshot.ref;
      //
      // console.log("order Snapshot: ", orderSnapshot);
      // console.log('user already has active order with this food item ');
      //
      // var isInOrder = false;
      // var foodItemsOld = orderSnapshot.ref.child("foodItems");
      //
      // console.log('OLD FOOD ITEMS REFERENCE: ');
      // console.log(foodItemsOld);
      //
      // var foodItemsQuery = firebase.database().ref('activeOrders/' + snapshotKey).child("foodItems/").orderByChild("item").equalTo(item).limitToFirst(1);
      // console.log("created foodItemsQuery: ", foodItemsQuery);
      // await foodItemsQuery.on("value", async function (foodSnapshot) {
      //   if (foodSnapshot.exists()) {
      //     console.log(foodSnapshot);
      //     // the food item already exists in the cart, so update the quantity
      //     console.log("item IS already in cart");
      //     console.log(foodSnapshot.val());
      //
      //     // update the quantity based on what the user selects
      //     var newQuantity = quantity;
      //
      //     var oldQuantity = foodSnapshot.child("quantity").val();
      //     var oldSubtotal = foodSnapshot.child("subtotal").val();
      //     console.log("Now navigating to the VIEW POST IN CART page");
      //     navigate('UserViewPostInCart', {
      //       item,
      //       price,
      //       description,
      //       dietaryRestrictions,
      //       quantity,
      //       restaurant,
      //       expirationDate,
      //       datePosted,
      //       oldQuantity,
      //       oldSubtotal
      //     });
      //     return;
      //   }
      //   else {
      //     console.log("ERROR: should never reach this state");
      //   }
      // });
      // this.props.navigation.navigate("UserPost");
      // return;

      // var foodItemsQuery = orderSnapshot.ref.child("foodItems").orderByChild("item").equalTo(item).limitToFirst(1);
      // console.log("created foodItemsQuery: ", foodItemsQuery);
      // var containsItem = false;
      // await foodItemsQuery.on("value", async function (foodSnapshot) {
      //   // the food item already exists in the cart, so update the quantity
      //   console.log("food item already exists in user order");
      //   console.log(foodSnapshot.val());
      //   containsItem = true;
      //   this.props.navigation.navigate('UserPost');
      //   return;
      // })


    //   var oldTotal = orderSnapshot.child("total").val();
    //   console.log("oldTotal ", oldTotal);
    //
    //   await foodItemsOld.push({
    //     item: item,
    //     price: price,
    //     description: description,
    //     quantity: quantity,
    //     subtotal: total,
    //     dietaryRestrictions: dietaryRestrictions,
    //     datePosted: datePosted,
    //     expirationDate: expirationDate
    //   })
    //
    //   console.log('AFTER PUSHING TO OLD FOOD ITEMS');
    //   console.log(foodItemsOld);
    //
    //   var newTotal = oldTotal + total;
    //   console.log(newTotal);
    //
    //
    //   console.log("snapshotRef", snapshotRef);
    //   await snapshotRef.update({
    //     orderTime: orderTime,
    //     total: newTotal
    //   });
    //   console.log("all done yay");
    //
    //     this.props.navigation.navigate('UserPost');
    //     return;
    //   })
    // if (!alreadyHasActiveOrder) {
    //   // case where user does not have an existing active order in the database
    //   console.log("ERROR: should never reach this state")
    //   return;
    // }
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
