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

export default class UserPaymentScreen extends React.Component {
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
    title: 'Order Confirmation',
  };

  async purchase() {
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
    const orderTime = navigation.getParam('orderTime', '4:21PM today')
    const total = (navigation.getParam('total', '4')).toFixed(2);
    const foodKey = navigation.getParam('foodKey', '1')
    const orderKey = navigation.getParam('orderKey', '1')

    var user = firebase.auth().currentUser;
    var email = user.email;

    var timeNow = new Date();
    var currentTime = timeNow.valueOf();

    console.log('hello');
    console.log('currentTime: ', currentTime);
    console.log('expirationDate: ', expirationDate);
    // check to verify that the expiration date is not passed

    if (currentTime < expirationDate) {
      alert("expired!");
      return;
    }


    var userOrderQuery = firebase.database().ref('activeOrders/').orderByChild("userEmail").equalTo(email).limitToFirst(1);
    console.log('going through query')
    var alreadyHasActiveOrder = false;

    await userOrderQuery.once("value", async function(orderSnapshot) {
      if (orderSnapshot.exists()) {
        var snapshotRef = orderSnapshot.ref;
        var snapshotKey = Object.keys(orderSnapshot.val())[0];
        console.log("order Snapshot: ", orderSnapshot);
        console.log('user already has active order');

        var quantityRef = firebase.database().ref('activeFood/' + foodKey).child("quantity");
        await quantityRef.once('value', async (quantitySnapshot) => {
          quantityLeft = quantitySnapshot.val();
          await firebase.database().ref('activeOrders/' + snapshotKey).remove();
          console.log('removed item');
          await firebase.database().ref('orderHistory/').push({
            email,
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
          console.log('added order to history');

          console.log('foodKey: ', foodKey);
          console.log('quantityLeft: ', quantityLeft);
          console.log('quantity: ', quantity);

          var quantityRemaining = quantityLeft - quantity;
          console.log('quantityRemaining: ', quantityRemaining);

          if (quantityRemaining == 0) {
            console.log('removing this food listing');
            await firebase.database().ref('activeFood/' + foodKey).remove();
          }
          else {
            console.log('updating active food quantity');
            await firebase.database().ref('activeFood/' + foodKey).update({
              quantity: quantityRemaining
            })
          }

          this.props.navigation.navigate("UserPost");
          return;
        })
      }
      else {
        console.log("ERROR")
      }
    });
    this.props.navigation.navigate("UserPost");
    return;
  }


/*
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
    const datePosted = navigation.getParam('datePosted', "2:45PM today")
    const orderTime = navigation.getParam('orderTime', '4:21PM today')
    const total = (navigation.getParam('total', '4')).toFixed(2);
    const foodKey = navigation.getParam('foodKey', '1')
    const orderKey = navigation.getParam('orderKey', '1')

    return (
      <ScrollView style={styles.container}>
      <View>
        <Text style={styles.label}>
        {JSON.stringify(total)}
        {JSON.stringify(orderTime)}
        {JSON.stringify(expirationDate)}
        {JSON.stringify(item)}
        ${JSON.stringify(price)}
        {JSON.stringify(description)}
        {JSON.stringify(dietaryRestrictions)}
        {JSON.stringify(quantity)}
        {JSON.stringify(restaurant)}
        {JSON.stringify(datePosted)}
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
        <Text onPress={() => this.purchase()} style={styles.newPostText}> Purchase </Text>
        <Ionicons
          name={Platform.OS === "ios" ? "ios-add-circle" : "md-add-circle"}
          color="gray"
          size={22}
          onPress={async () =>
            this.purchase()
          }
        />
      </View>
      </ScrollView>
    );
  }
}*/
  timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
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
    const datePosted = navigation.getParam('datePosted', "2:45PM today")
    const orderTime = navigation.getParam('orderTime', '4:21PM today')
    const total = (navigation.getParam('total', '4')).toFixed(2);
    const foodKey = navigation.getParam('foodKey', '1')
    const orderKey = navigation.getParam('orderKey', '1')
    return (

      <ScrollView style={styles.container}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}> Item </Text>
          <Text style={styles.userPostInfoText}> 
            {JSON.stringify(item).replace(/\"/g, "")} 
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}> Order Time </Text>
          <Text style={styles.userPostInfoText}> 
            {this.timeConverter(parseInt(JSON.stringify(orderTime).replace(/\"/g, "")))} 
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}> Description </Text>
          <Text style={styles.userPostInfoText}> 
            {JSON.stringify(description).replace(/\"/g, "")} 
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}> Dietary Restrictions </Text>
          <Text style={styles.userPostInfoText}> 
            {JSON.stringify(dietaryRestrictions).replace(/\"/g, "")} 
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}> Restaurant </Text>
          <Text style={styles.userPostInfoText}> 
            {JSON.stringify(restaurant).replace(/\"/g, "")} 
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}> Date Posted </Text>
          <Text style={styles.userPostInfoText}> 
            {this.timeConverter(parseInt(JSON.stringify(datePosted).replace(/\"/g, "")))} 
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}> Expiration Date </Text>
          <Text style={styles.userPostInfoText}> 
            {this.timeConverter(parseInt(JSON.stringify(expirationDate).replace(/\"/g, "")))} 
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}> Price </Text>
          <Text style={styles.userPostInfoText}> 
            ${JSON.stringify(price).replace(/\"/g, "")} 
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}> Quantity </Text>
          <Text style={styles.userPostInfoText}> 
            {JSON.stringify(quantity).replace(/\"/g, "")} 
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}> Total </Text>
          <Text style={styles.userPostInfoText}> 
            ${JSON.stringify(total).replace(/\"/g, "")} 
          </Text>
        </View>
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: 1,
          }}
        />
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

