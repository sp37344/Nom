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
      quantity: '1',
    };
  }

  static navigationOptions = {
    title: 'Payment',
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
        console.log('foodKey, ', foodKey);
        console.log('snapshotKey, ', snapshotKey);

        var quantityRef = firebase.database().ref('activeFood/' + foodKey);
        console.log("quantityRef", quantityRef);
        await quantityRef.once('value', async (quantitySnapshot) => {
          var quantityLeft = parseInt(quantitySnapshot.child('quantity').val());
          var quantitySoldOld = parseInt(quantitySnapshot.child('quantitySold').val());
          console.log('quantityLeft', quantityLeft);
          console.log('quantitySoldOld', quantitySoldOld);
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
            var quantitySold = quantitySoldOld + parseInt(quantity);
            console.log('quantitySold');
            await firebase.database().ref('activeFood/' + foodKey).update({
              quantity: quantityRemaining,
              quantitySold
            })
          }

          var foodHistoryRef = firebase.database().ref('foodHistory/').orderByChild("datePosted").equalTo(datePosted).limitToFirst(1);
          await foodHistoryRef.once("value", async (foodHistorySnapshot) => {
            if (foodHistorySnapshot.exists()) {
              var snapshotRef = foodHistorySnapshot.ref;
              var snapshotKey = Object.keys(foodHistorySnapshot.val())[0];
              console.log("order Snapshot: ", foodHistorySnapshot);
              console.log('user already has active order');

              foodHistorySnapshot.forEach(async (foodHistory) => {
                var foodHistoryItem = foodHistory.child('item').val();
                if (foodHistoryItem == item) {
                  console.log('item already exists in the food history as ', item);
                  var foodHistoryTotalQuantity = parseInt(foodHistory.child('quantityTotal').val());
                  var foodHistorySoldQuantity = parseInt(foodHistory.child('quantitySold').val());
                  var foodHistoryUnsoldQuantity = parseInt(foodHistory.child('quantityUnsold').val());
                  console.log('total quantity', foodHistoryTotalQuantity);
                  console.log('sold quantity', foodHistorySoldQuantity);
                  console.log('unsold quantity', foodHistoryUnsoldQuantity);
                  console.log('quantity', quantity);
                  var quantityNum = parseInt(quantity);
                  console.log(typeof(quantity));
                  var quantitySold = parseInt(foodHistorySoldQuantity + quantityNum);
                  console.log('quantitySold', quantitySold);
                  await foodHistory.ref.update({
                    quantitySold,
                    quantityUnsold: quantityRemaining
                  })
                  this.props.navigation.navigate("UserPost");
                  return;
                }
              })
            }
            else {
              quantityLeft = quantitySnapshot.child('quantity').val();
              await firebase.database().ref('foodHistory/').push({
                restaurant,
                item: item,
                price: price,
                description: description,
                dietaryRestrictions: dietaryRestrictions,
                datePosted: datePosted,
                expirationDate: expirationDate,
                total,
                quantityTotal: quantityLeft,
                quantitySold: quantity,
                quantityUnsold: quantityRemaining
              });
              console.log('added food to history');
              this.props.navigation.navigate("UserPost");
              return;
            }
          })




        })
      }
      else {
        console.log("ERROR")
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
}
