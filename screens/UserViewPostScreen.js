import React from 'react';
import {
  Button,
  ScrollView,
  ImageBackground,
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
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
    title: 'Information',
  };


  async addOrder(quantity) {
    const { navigate } = this.props.navigation;
    const { navigation } = this.props;
    const item = navigation.getParam('item', "Bread");
    const price = navigation.getParam('price', "3.00");
    const description = navigation.getParam('description', "Delicious freshly baked");
    const dietaryRestrictions = navigation.getParam('dietaryRestrictions', "None");
    const restaurant = navigation.getParam('restaurant', "Panera");
    const expirationDate = navigation.getParam('expirationDate', "9:00PM today")
    const datePosted = navigation.getParam('datePosted', "2:45PM today")
    const foodKey = navigation.getParam('foodKey', '1')

    const user = firebase.auth().currentUser;
    const email = user.email;
    const total = price * quantity;
    const currentTime = new Date();
    const orderTime = currentTime.valueOf();
    const userOrderQuery = firebase.database().ref('activeOrders/').orderByChild("userEmail").equalTo(email).limitToFirst(1);
    console.log('going through query')
    const alreadyHasActiveOrder = false;
    await userOrderQuery.once("value", async function(orderSnapshot) {
      if (orderSnapshot.exists()) {
        const snapshotRef = orderSnapshot.ref;
        const orderKey = Object.keys(orderSnapshot.val())[0];
        console.log("order Snapshot: ", orderSnapshot);
        console.log('user already has active order');

        await firebase.database().ref('activeOrders/' + orderKey).update({
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

        console.log("foodKey", foodKey);
        navigate("UserPayment",
        {
          userEmail: email,
          restaurant,
          orderTime,
          item: item,
          price: price,
          description: description,
          quantity: quantity,
          dietaryRestrictions: dietaryRestrictions,
          datePosted: datePosted,
          expirationDate: expirationDate,
          total,
          foodKey,
          orderKey
        });
        return;
      }
      else {
        console.log("adding user order")

        const orderKey = await firebase.database().ref('activeOrders/').push({
          userEmail: email,
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
        }).key;

        console.log("orderKey", orderKey);
        console.log("foodKey", foodKey);
        navigate("UserPayment", {
          userEmail: email,
          restaurant,
          orderTime,
          item: item,
          price: price,
          description: description,
          quantity: quantity,
          dietaryRestrictions: dietaryRestrictions,
          datePosted: datePosted,
          expirationDate: expirationDate,
          total,
          foodKey,
          orderKey
        });
        return;
      }
    });
    navigate("UserPayment",
    (
      userEmail: email,
      restaurant,
      orderTime,
      item: item,
      price: price,
      description: description,
      quantity: quantity,
      dietaryRestrictions: dietaryRestrictions,
      datePosted: datePosted,
      expirationDate: expirationDate,
      total,
      foodKey
    ));
    return;
  }

  timeConverter(UNIX_timestamp){
    const a = new Date(UNIX_timestamp);
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const year = a.getFullYear();
    const month = months[a.getMonth()];
    const date = a.getDate();
    const hour = a.getHours();
    const min = a.getMinutes();
    const sec = a.getSeconds();
    const time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min;
    return time;
  }

  changeQuantity(text, limit){
    console.log(limit);
    const num = parseInt(text);
    console.log(num);
    if (num > 0 && num <= limit) {
      this.setState({quantity: num});
    }
    console.log(this.state.quantity);
  }

  renderContactHeader = () => {
    const { img } = this.props
    return (
      <View style={styles.headerContainer}>
        <View style={styles.coverContainer}>
          <ImageBackground
            source={require("../assets/images/mehek.jpg")}
            style={styles.coverImage}
          >
          </ImageBackground>
        </View>
      </View>
    )
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
         {this.renderContactHeader()}
        </View>
        <View style={styles.userPostQuantity}>
          <Text style={styles.userPostQuantityText}> 
            {JSON.stringify(quantity).replace(/\"/g, "")}
            {" more left"}
          </Text>
        </View>
        <View style={styles.userPostContainer}>
          <Text style={styles.userPostTitleText}> 
            {JSON.stringify(item).replace(/\"/g, "")} 
          </Text>
        </View>
        <View style={styles.userPostContainer}>
          <Text style={styles.userPostNewPriceText}> 
            ${JSON.stringify(price).replace(/\"/g, "")} 
          </Text>
        </View>
        <View style={styles.userPostContainer}>
          <Text style={styles.userPostOldPriceText}> $10 </Text>
        </View>
        <View style={styles.userPostContainer}>
          <Text style={styles.userPostInfoText}> 
            {JSON.stringify(description).replace(/\"/g, "")} 
          </Text>
        </View>
        <View style={styles.userPostContainer}>
          <Text style={styles.userPostInfoText}>
            {"Posted on " + this.timeConverter(parseInt(JSON.stringify(postedDate).replace(/\"/g, ""))) + ". "} 
          </Text>
        </View>
        <View style={styles.userPostContainer}>
          <Text style={styles.userPostInfoText}>
            {"Expires " + this.timeConverter(parseInt(JSON.stringify(expirationDate).replace(/\"/g, ""))) + ". "} 
          </Text>
        </View>
        <View style={styles.userDietContainer}>
          <TouchableHighlight
            style={styles.tagButtonUnpressed}>
            <Text style={styles.tagTextUnpressed}> Dairy </Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.tagButtonUnpressed}>
            <Text style={styles.tagTextUnpressed}> Meat </Text>
          </TouchableHighlight>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.userLabel}> Quantity to Purchase: </Text>
        </View>
        <View style={styles.userQuantityField}>
          <TextInput
            onChangeText={(text) => this.changeQuantity(text, parseInt(JSON.stringify(quantity).replace(/\"/g, "")))}
            keyboardType='numeric'
            style={styles.loginInput}
            value={this.state.quantity}
          />
        </View>
        <View style={styles.userPostContainer}>
          <TouchableOpacity>
            <Text 
              onPress={() => this.addOrder(this.state.quantity)}
              style={styles.buttonOpaque}
              textDecorationLine={'underline'}>
              Purchase
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}
