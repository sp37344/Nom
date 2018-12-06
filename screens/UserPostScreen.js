import React from 'react';
import {
  Button,
  ScrollView,
  View,
  StyleSheet,
  Text,
  TextInput,
  Platform,
  ImageBackground,
} from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements'
import { ExpoLinksView } from '@expo/samples';
import { Ionicons } from '@expo/vector-icons';
import { MonoText } from '../components/StyledText';
import styles from '../styles';
import App from '../App.js';
import * as firebase from 'firebase';

export default class RestaurantPostScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      availableList: [],
    };
  }

  static navigationOptions = {
    title: 'Posts',
  };


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
/*
  async componentWillMount() {
    this.getAvailablePosts().then((foodList) => {
      console.log("STATE", this.state);
      console.log('promise returned', foodList);
      this.setState({
        availableList: foodList,
        isLoading: false
      });
    }, (error) => {
      alert(error);
    })
  }
  
*/
  render() {
    const { navigate } = this.props.navigation;
    const restaurantList = [
      {
        name: 'Panera Bread',
        available: [
          {
            item: 'Muffin',
            price: '$2.50',
            quantity: 5,
          },
          {
            item: 'Coffee',
            price: '$1.50',
            quantity: 3,
          },
          {
            item: 'Cookie',
            price: '$2.50',
            quantity: 1,
          },
        ]
      },
      {
        name: 'Kung Fu Tea',
        available: [
          {
            item: 'Bubble Tea',
            price: '$2.50',
            quantity: 4,
          },
        ]
      },
    ]

    return (
      <ScrollView style={styles.container}>
      <View style={styles.searchContainer}>
          <SearchBar
            inputStyle={{backgroundColor: 'white'}}
            containerStyle={{backgroundColor: 'white', borderWidth: 1, width: '100%'}}
            placeholder={'Search food items'}
          />
        </View>
        <View style={styles.userPostContainer}>
            {
              restaurantList.map((restaurant, i) => (
                <View>
                    <ImageBackground
                      source={{
                        uri: 'https://ak7.picdn.net/shutterstock/videos/22362667/thumb/4.jpg',
                      }}
                      resizeMode='cover'
                      style={{width: null, height: null, flex: 1}}
                    >
                      <Text style={styles.labelRestaurant}>
                        {restaurant.name}
                      </Text>
                    </ImageBackground>
                  {restaurant.available.map((item, j) => (
                    <ListItem
                      key={j}
                      title={item.item + ' (' + item.quantity + ')'}
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

/*
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
          <View style={styles.searchContainer}>
            <SearchBar
              inputStyle={{backgroundColor: 'white'}}
              containerStyle={{backgroundColor: 'white', borderWidth: 1, width: '100%'}}
              placeholder={'Search food items'}
            />
          </View>
          <View style={styles.userPostContainer}>
              {
                this.state.availableList.map((restaurant, i) => (
                  <View>
                    <ImageBackground
                      source={{
                        uri: 'https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&h=350',
                      }}
                      resizeMode='cover'
                      style={{width: null, height: null, flex: 1}}
                    >
                      <Text style={styles.labelRestaurant}>
                        {restaurant.name}
                      </Text>
                    </ImageBackground>
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
*/
