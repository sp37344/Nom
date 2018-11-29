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
    };
  }

  static navigationOptions = {
    title: 'View Post',
  };


  async addOrder() {
    const { navigate } = this.props.navigation;
    const { navigation } = this.props;
    const item = navigation.getParam('item', "Bread");
    const price = navigation.getParam('price', "3.00");
    const description = navigation.getParam('description', "Delicious freshly baked");
    const dietaryRestrictions = navigation.getParam('dietaryRestrictions', "None");
    const quantity = navigation.getParam('quantity', "4");
    const restaurant = navigation.getParam('restaurant', "Panera");
    const expirationDate = navigation.getParam('expirationDate', "9:00PM today")
    const datePosted = navigation.getParam('datePosted', "2:45PM today")
    var user = firebase.auth().currentUser;
    var email = user.email;
    var userOrderQuery = firebase.database().ref('activeOrders/').orderByChild("userEmail").equalTo(email);
    console.log('going through query')
    await userOrderQuery.once("value")
      .then(async function(orderSnapshot) {
        // check if the user already has an active order
        if (orderSnapshot.child("email").val() == null) {
          console.log("user does not have order in active orders db");
          var orderID = 'order' + email;
          console.log('ORDERID', orderID);
          var currentTime = new Date();
          // var quantityNumber = parseInt(quantity, 10);
          var orderTime = currentTime.valueOf();
          var total = price * quantity;
          console.log(item);
          console.log(price);
          console.log("QUANTITY", quantity);
          console.log(description);
          console.log("TOTAL", total);
          console.log(dietaryRestrictions);
          console.log(datePosted);
          console.log(expirationDate);
          console.log(email);
          console.log("RESTAURANT", restaurant);
          console.log(orderTime);
          console.log(total);

          var postData = {
            userEmail: email,
            restaurant,
            orderTime,
            total
          };

          // Get a key for the new post.
          var newPostKey = firebase.database().ref('activeOrders/').push().key;

          // Update the post.
          var updates = {};
          updates[newPostKey] = postData;

          firebase.database().ref('activeOrders/').update(updates)
            .then((data) => {
              console.log('data', data);
              var foodItemsRef = firebase.database().ref('activeOrders/' + newPostKey).child("foodItems");
              foodItemsRef.push({
                item,
                price,
                description,
                quantity,
                subtotal: total,
                dietaryRestrictions,
                datePosted,
                expirationDate
              });

          // var foodItemsRef = firebase.database().ref('activeOrders/' + newPostKey).child("foodItems");
          // foodItemsRef.push({
          //   item,
          //   price,
          //   description,
          //   quantity,
          //   subtotal,
          //   dietaryRestrictions,
          //   datePosted,
          //   expirationDate
          // });
          //
          // firebase.database().ref('activeOrders/').push({
          //   userEmail: email,
          //   restaurant,
          //   orderTime,
          //   total
          // }).then((data) => {
          //   // success callback
          //   console.log('data ', data)
          //
          //   this.props.navigation.navigate('RestaurantPost');
          }).catch((error) => {
            // error callback
            console.log('error ', error)
          })
        }
        else {
          console.log('user already has active order');
          console.log(orderSnapshot);
          var foodItems = orderSnapshot.child("foodItems").val();
          var alreadyInOrder = false;
          foodItems.forEach(function(foodItem) {
            // if the food item already exists in the order, update the quantity
            // modify this so that the user can specify the quantity they want
            if (foodItem = item) {
              console.log('FOOD ITEM IN THE DATABASE');
              alreadyInOrder = true;
              foodItem.quantity+=quantity;
              var subtotal = foodItem.quantity * foodItem.price;
              orderSnapshot.total += (quantity * foodItem.price);
            }
          });
          // if the item is not in the order, add it to the food item array and update
          // the subtotal and total accordingly
          if (!alreadyInOrder) {
            console.log('NOT ALREADY IN ORDER');
          }
        }
      })
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
      </View>
      <View style={styles.newPostContainer}>
        <Text onPress={() => navigate("RestaurantNewPost")} style={styles.newPostText}> Add to cart </Text>
        <Ionicons
          name={Platform.OS === "ios" ? "ios-add-circle" : "md-add-circle"}
          color="gray"
          size={22}
          onPress={() =>
            this.addOrder()
            // alert("Item added to cart");
          }
        />
      </View>
      </ScrollView>
    );
  }
}
