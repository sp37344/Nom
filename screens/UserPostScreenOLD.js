import React from 'react';
import {
  Button,
  ScrollView,
  View,
  StyleSheet,
  Text,
  TextInput,
  Platform,
} from 'react-native';
import { ListItem } from 'react-native-elements'
import { ExpoLinksView } from '@expo/samples';
import { Ionicons } from '@expo/vector-icons';
import { MonoText } from '../components/StyledText';
import styles from '../styles';
import App from '../App.js';
import * as firebase from 'firebase';
import waterfall from 'async/waterfall';
var async = require("async");

export default class UserPostScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      availableList: [],
    };
  }

  setStateAsync(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve)
    });
  }

  static navigationOptions = {
    title: 'Posts',
  }

  async checkIfAlreadyInCart(item, price, description, dietaryRestrictions, quantity, restaurant, expirationDate, datePosted) {
    const { navigate } = this.props.navigation;
    const { navigation } = this.props;
    var user = firebase.auth().currentUser;
    var email = user.email;
    var userOrderQuery = firebase.database().ref('activeOrders/').orderByChild("userEmail").equalTo(email).limitToFirst(1);
    console.log('going through query')
    var foodItemExists = false;
    await userOrderQuery.once("value", async function(orderSnapshot) {
      if (orderSnapshot.exists()) {
        var snapshotRef = orderSnapshot.ref;
        console.log("snapshotRef", snapshotRef);
        var snapshotKey = Object.keys(orderSnapshot.val())[0];
        console.log("snapshotKey", snapshotKey);

        console.log("order Snapshot: ", orderSnapshot);
        console.log('user already has active order');

        var foodItemsQuery = firebase.database().ref('activeOrders/' + snapshotKey).child("foodItems/").orderByChild("item").equalTo(item).limitToFirst(1);
        console.log("created foodItemsQuery: ", foodItemsQuery);

        await foodItemsQuery.once("value", async function (foodSnapshot) {
          if (foodSnapshot.exists()) {
            foodItemExists = true;
            console.log(foodSnapshot);
            // the food item already exists in the cart, so update the quantity
            console.log("item IS already in cart");
            console.log(foodSnapshot.val());
            var oldQuantity = foodSnapshot.child("quantity").val();
            var oldSubtotal = foodSnapshot.child("subtotal").val();
            console.log("Now navigating to the VIEW POST IN CART page");
            navigate('UserViewPostInCart', {
              item,
              price,
              description,
              dietaryRestrictions,
              quantity,
              restaurant,
              expirationDate,
              datePosted,
              oldQuantity,
              oldSubtotal
            });
            return;
          }
          else {
            console.log("active order BUT item NOT already in cart");
            navigate('UserViewPost', {
              item,
              price,
              description,
              dietaryRestrictions,
              quantity,
              restaurant,
              expirationDate,
              datePosted
            });
            return;
          }
        });
      }
      else {
        navigate('UserViewPost', {
          item,
          price,
          description,
          dietaryRestrictions,
          quantity,
          restaurant,
          expirationDate,
          datePosted
        });
        return;
      }
    });
    // if (!foodItemExists) {
    //   navigate('UserViewPost', {
    //     item,
    //     price,
    //     description,
    //     dietaryRestrictions,
    //     quantity,
    //     restaurant,
    //     expirationDate,
    //     datePosted
    //   });
    //   return;
    // }
    // else {
    //   navigate('UserViewPostInCart', {
    //     item,
    //     price,
    //     description,
    //     dietaryRestrictions,
    //     quantity,
    //     restaurant,
    //     expirationDate,
    //     datePosted,
    //     oldQuantity,
    //     oldSubtotal
    //   });
    //   return;
    // }
  }

  async getAvailablePosts() {
    var foodList = [];
    var restaurantAvailableList = [];
    var restaurantQuery = firebase.database().ref('restaurants/').orderByChild("active").equalTo(1);
    await restaurantQuery.once("value")
      .then(async function(snapshot) {
        snapshot.forEach(function(restaurantSnapshot) {
          console.log(restaurantSnapshot.child("email").val());
          var restaurantEmail = restaurantSnapshot.child("email").val();
          var restaurant = restaurantSnapshot.child("name").val();
          restaurantAvailableList.push({
            restaurant: restaurant,
            email: restaurantEmail
          })
        })
        console.log("Restaurant Available List after getting all restaurants:")
        console.log(restaurantAvailableList);
        await Promise.all(restaurantAvailableList.map(async function(restaurant) {
          console.log('restaurant', restaurant.restaurant);
          console.log('email', restaurant.email);
          var foodQuery = firebase.database().ref('activeFood/').orderByChild("restaurant").equalTo(restaurant.email);
          console.log("FOOD QUERY: ", foodQuery);
          await foodQuery.once("value")
            .then(async function(snapshot) {
              console.log("SNAPSHOT: ", snapshot);
              var foodAvailableList = [];
              await snapshot.forEach(function(childSnapshot) {
                console.log("Food item in populate food list function", childSnapshot.child("item").val());
                foodAvailableList.push({
                  item: childSnapshot.child("item").val(),
                  description: childSnapshot.child("description").val(),
                  price: childSnapshot.child("price").val(),
                  dietaryRestrictions: childSnapshot.child("dietaryRestrictions").val(),
                  cuisine: childSnapshot.child("cuisine").val(),
                  expirationDate: childSnapshot.child("expirationDate").val(),
                  datePosted: childSnapshot.child("datePosted").val(),
                  quantity: childSnapshot.child("quantity").val(),
                  restaurant: childSnapshot.child("restaurant").val()
                });
              })
              console.log("availableList after the for each", foodAvailableList);
              if (foodAvailableList.length > 0) {
                foodList.push ({
                  name: restaurant.restaurant,
                  available: foodAvailableList
                })
                console.log("availableList IN FOR EACH SNAPSHOT ", foodList);
              }
            })
          }
        ))
      })
      console.log("RETURNING AVAILABLE LIST", foodList);
      return foodList;
  }


  async componentWillMount() {
    this.getAvailablePosts().then((foodList) => {
      console.log("STATE", this.state);
      console.log('promise returned', foodList);
      this.setState({
        availableList: foodList,
        isLoading: false
      });
      console.log("NEW STATE", this.state)
    }, (error) => {
      alert(error);
    })
  }


  render() {
    if (this.state.isLoading == true || this.state.availableList == undefined) {
      return (
        <View style={styles.postContainer}>
          <Text style={styles.label}>
            Loading...
          </Text>
        </View>
      )
    } else {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView style={styles.container}>
        <View style={styles.postContainer}>
            {
              this.state.availableList.map((restaurant, i) => (
                <View>
                  <Text style={styles.label}>
                    {restaurant.name}
                  </Text>
                  <View
                    style={{
                      borderBottomColor: 'black',
                      borderBottomWidth: 1,
                    }}
                  />
                  {restaurant.available.map((item, j) => (
                    <ListItem
                      key={j}
                      title={item.item}
                      subtitle={item.price}
                      onPress={async () => this.checkIfAlreadyInCart(
                        item.item,
                        item.price,
                        item.description,
                        item.dietaryRestrictions,
                        item.quantity,
                        item.restaurant,
                        item.expirationDate,
                        item.datePosted
                      )}
                    />
                  ))}
                </View>
              ))
            }
        </View>
      </ScrollView>
    );
  }
}
}
