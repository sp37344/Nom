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
    const postedDate = navigation.getParam('postedDate', "2:45PM today")
    var user = firebase.auth().currentUser;
    var email = user.email;
    var userOrderQuery = firebase.database().ref('activeOrders/').orderByChild("userEmail").equalTo(email);
    await userOrderQuery.once("value")
      .then(async function(orderSnapshot) {
        if (orderSnapshot) {
          var foodItems = orderSnapshot.child("foodItems").val();
          foodItems.forEach(foodItem) {
            // if the food item already exists in the order, update the quantity
            // modify this so that the user can specify the quantity they want
            if (foodItem = item) {
              foodItem.quantity++;
            }
          }
        }
        else {

        }
      })
  }
  async getAvailablePosts() {
    var foodList = [];
    var restaurantAvailableList = [];
    var restaurantQuery = firebase.database().ref('restaurants/').orderByChild("active").equalTo(1);
    await restaurantQuery.once("value")
      .then(async function(snapshot) {
        snapshot.forEach(function(restaurantSnapshot) {
          // console.log(restaurantSnapshot.child("email").val());
          var restaurantEmail = restaurantSnapshot.child("email").val();
          var restaurant = restaurantSnapshot.child("name").val();
          restaurantAvailableList.push({
            restaurant: restaurant,
            email: restaurantEmail
          })
        })
        // console.log("Restaurant Available List after getting all restaurants:")
        // console.log(restaurantAvailableList);
        await Promise.all(restaurantAvailableList.map(async function(restaurant) {
          // console.log('restaurant', restaurant.restaurant);
          // console.log('email', restaurant.email);
          var foodQuery = firebase.database().ref('food/').orderByChild("restaurant").equalTo(restaurant.email);
          await foodQuery.once("value")
            .then(async function(snapshot) {
              var foodAvailableList = [];
              await snapshot.forEach(function(childSnapshot) {
                // add logic here to only show active food listings
                if (childSnapshot.child("active").val() == 1) {
                  // console.log("Food item in populate food list function", childSnapshot.child("item").val());
                  foodAvailableList.push({
                    item: childSnapshot.child("item").val(),
                    description: childSnapshot.child("description").val(),
                    price: childSnapshot.child("price").val(),
                    dietaryRestrictions: childSnapshot.child("dietaryRestrictions").val(),
                    cuisine: childSnapshot.child("cuisine").val()
                  });
                }
              })
              // console.log("availableList after the for each", foodAvailableList);
              if (foodAvailableList.length > 0) {
                foodList.push ({
                  name: restaurant.restaurant,
                  available: foodAvailableList
                })
                // console.log("availableList IN FOR EACH SNAPSHOT ", foodList);
              }
            })
          }
        ))
      })
      console.log("RETURNING AVAILABLE LIST", foodList);
      return foodList;
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
            alert("Item added to cart")
          }
        />
      </View>
      </ScrollView>
    );
  }
}
