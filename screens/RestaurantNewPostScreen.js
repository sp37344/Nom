import React from 'react';
import {
  Button,
  ScrollView,
  View,
  StyleSheet,
  Text,
  TextInput,
  Platform,
  DatePickerIOS,
  // CheckBox
  TouchableHighlight,
} from 'react-native';
import { CheckBox } from 'react-native-elements';
import { ExpoLinksView } from '@expo/samples';
import { FontAwesome } from '@expo/vector-icons';
import Picker from 'react-native-picker';
import DatePicker from 'react-native-date-picker';
import styles from '../styles';
import App from '../App.js';
import * as firebase from 'firebase';

export default class RestaurantNewPostScreen extends React.Component {
  constructor(props) {
    super(props);
    var today = new Date();
    this.state = {
      item: 'Item Name',
      price: 'Price',
      quantity: 'Quantity',
      description: 'List description of dish',
      // dietaryRestrictions: 'List dietary restrictions here',
      cuisine: 'List cuisine types here',
      dietaryRestrictions: [],
      vegetarian: false,
      vegan: false,
      dairyFree: false,
      nutFree: false,
      glutenFree: false,
      expirationDate: new Date(),
      active: 1,
    };
  }

  static navigationOptions = {
    title: 'New Post',
  };

  restaurantPostFood(item, price, quantity, description, expirationDate, dietaryRestrictions, cuisine) {
    var user = firebase.auth().currentUser;
    var restaurant = user.email;
    console.log(typeof restaurant);
    var today = new Date();
    var datePosted = today.valueOf();
    var expirationDate_value = expirationDate.valueOf();
    console.log("datePosted", datePosted);
    console.log("expirationDate", expirationDate_value);
    firebase.database().ref('activeFood/').push({
      item,
      price,
      quantity,
      description,
      expirationDate: expirationDate_value,
      restaurant,
      dietaryRestrictions,
      cuisine,
      datePosted
    }).then((data) => {
      // success callback
      console.log('data ', data)
      this.props.navigation.navigate('RestaurantPost');
    }).catch((error) => {
      // error callback
      console.log('error ', error)
    })
  }

  _onHideUnderlay() {
    this.setState({ vegan: false });
  }
  _onShowUnderlay() {
    this.setState({ vegan: true });
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <ScrollView style={styles.postContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}> Item: </Text>
          <TextInput
            onFocus={() => this.setState({item: ''})}
            onChangeText={(text) => this.setState({item: text})}
            style={styles.input}
            value={this.state.item}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}> Price: $</Text>
          <TextInput
            onFocus={() => this.setState({price: ''})}
            onChangeText={(text) => this.setState({price: text})}
            style={styles.input}
            keyboardType='numeric'
            value={this.state.price}
          />
        </View>
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
        <View style={styles.inputContainer}>
          <Text style={styles.label}> Description: </Text>
          <TextInput
            onFocus={() => this.setState({description: ''})}
            onChangeText={(text) => this.setState({description: text})}
            style={styles.input}
            value={this.state.description}
          />
        </View>
        <View style={styles.inputContainerDiet}>
          <Text style={styles.label}> Dietary Restrictions: </Text>
          <TouchableHighlight
            style={
              this.state.vegetarian
              ? styles.tagButtonPressed
              : styles.tagButtonUnpressed
            }
            onPress={() => {
              // this.setState({vegetarian:!this.state.vegetarian});
              if (this.state.dietaryRestrictions.includes('vegetarian')) {
                this.state.dietaryRestrictions.splice(this.state.dietaryRestrictions.indexOf('vegetarian'), 1);
              }
              else  {
                this.state.dietaryRestrictions.push('vegetarian');
              }
              this.setState({vegetarian:!this.state.vegetarian})
              console.log(this.state.dietaryRestrictions);
            }}
            >
            <Text
              style={
                this.state.vegetarian
                ? styles.tagTextPressed
                : styles.tagTextUnpressed
              }
            > vegetarian </Text>
          </TouchableHighlight>
        </View>
        <View style={styles.inputContainer}>
          <TouchableHighlight
            style={
              this.state.vegan
              ? styles.tagButtonPressed
              : styles.tagButtonUnpressed
            }
            onPress={() => {
              if (this.state.dietaryRestrictions.includes('vegan')) {
                this.state.dietaryRestrictions.splice(this.state.dietaryRestrictions.indexOf('vegan'), 1);
              }
              else  {
                this.state.dietaryRestrictions.push('vegan');
              }
              this.setState({vegan:!this.state.vegan})
              console.log(this.state.dietaryRestrictions);
            }}
            >
            <Text
              style={
                this.state.vegan
                ? styles.tagTextPressed
                : styles.tagTextUnpressed
              }
            > vegan </Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={
              this.state.dairyFree
              ? styles.tagButtonPressed
              : styles.tagButtonUnpressed
            }
            onPress={() => {
              if (this.state.dietaryRestrictions.includes('dairyFree')) {
                this.state.dietaryRestrictions.splice(this.state.dietaryRestrictions.indexOf('dairyFree'), 1);
              }
              else  {
                this.state.dietaryRestrictions.push('dairyFree');
              }
              this.setState({dairyFree:!this.state.dairyFree})
              console.log(this.state.dietaryRestrictions);
            }}
            >
            <Text
              style={
                this.state.dairyFree
                ? styles.tagTextPressed
                : styles.tagTextUnpressed
              }
            > dairy-free </Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={
              this.state.nutFree
              ? styles.tagButtonPressed
              : styles.tagButtonUnpressed
            }
            onPress={() => {
              if (this.state.dietaryRestrictions.includes('nutFree')) {
                this.state.dietaryRestrictions.splice(this.state.dietaryRestrictions.indexOf('nutFree'), 1);
              }
              else  {
                this.state.dietaryRestrictions.push('nutFree');
              }
              this.setState({nutFree:!this.state.nutFree})
              console.log(this.state.dietaryRestrictions);
            }}
            >
            <Text
              style={
                this.state.nutFree
                ? styles.tagTextPressed
                : styles.tagTextUnpressed
              }
            > nut-free </Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={
              this.state.glutenFree
              ? styles.tagButtonPressed
              : styles.tagButtonUnpressed
            }
            onPress={() => {
              if (this.state.dietaryRestrictions.includes('glutenFree')) {
                this.state.dietaryRestrictions.splice(this.state.dietaryRestrictions.indexOf('glutenFree'), 1);
              }
              else  {
                this.state.dietaryRestrictions.push('glutenFree');
              }
              this.setState({glutenFree:!this.state.glutenFree})
              console.log(this.state.dietaryRestrictions);
            }}
            >
            <Text
              style={
                this.state.glutenFree
                ? styles.tagTextPressed
                : styles.tagTextUnpressed
              }
            > gluten-free </Text>
          </TouchableHighlight>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}> Cuisine Type: </Text>
          <TextInput
            onFocus={() => this.setState({cuisine: ''})}
            onChangeText={(text) => this.setState({cuisine: text})}
            style={styles.input}
            value={this.state.cuisine}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}> Expiration Date: </Text>
        </View>
        <DatePickerIOS
              date={this.state.expirationDate}
              style={{backgroundColor:'white'}}
              mode="date"
              onDateChange={expirationDate => this.setState({expirationDate})}/>
<<<<<<< HEAD
        <Text
          onPress={() => this.restaurantPostFood(this.state.item, this.state.price, this.state.quantity, this.state.description, this.state.expirationDate, this.state.dietaryRestrictions, this.state.cuisine)}
=======
        <Text 
          onPress={() => {
            this.restaurantPostFood(this.state.item, this.state.price, this.state.quantity, this.state.description, this.state.expirationDate, this.state.dietaryRestrictions, this.state.cuisine)
            navigate("RestaurantPost");
          }}
>>>>>>> b9849cda84591a8a3585439b49163a258ebefc8c
          style={styles.buttonOpaque}
          textDecorationLine={'underline'}>
          Submit
        </Text>
      </ScrollView>
    );
  }
}
