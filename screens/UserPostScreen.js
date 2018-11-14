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

export default class RestaurantPostScreen extends React.Component {
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
                      onPress={() => navigate("UserViewPost")} // and u pass props here
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
