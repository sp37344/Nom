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
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { ExpoLinksView } from '@expo/samples';
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
      dietaryRestrictions: 'List dietary restrictions here',
      cuisine: 'List cuisine types here',
      // dietaryRestrictions: [],
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

  render() {
    const { navigate } = this.props.navigation;

    const diets = [
      {
        name: 'gluten-free'
      },
      {
        name: 'vegan'
      },
      {
        name: 'pescatarian'
      },
    ]

    return (
      <ScrollView style={styles.container}>
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
        <View style={styles.inputContainer}>
          <Text style={styles.label}> Dietary Restrictions: </Text>
          <TextInput
            onFocus={() => this.setState({dietaryRestrictions: ''})}
            onChangeText={(text) => this.setState({dietaryRestrictions: text})}
            style={styles.input}
            value={this.state.dietaryRestrictions}
          />
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
          <Text style={styles.label}> Item: </Text>
          <SearchBar
            lightTheme
            round
            showLoading
            containerStyle={styles.searchContainer}
            placeholder='Search' />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}> Expiration Date: </Text>
        </View>
        <DatePickerIOS
              date={this.state.expirationDate}
              style={{borderBottomWidth: 1, borderColor: '#d7dbe2',backgroundColor:'white'}}
              mode="date"
              onDateChange={expirationDate => this.setState({expirationDate})}/>
        <View style={styles.buttons}>
          <Button
            onPress={() => this.restaurantPostFood(this.state.item, this.state.price, this.state.quantity, this.state.description, this.state.expirationDate, this.state.dietaryRestrictions, this.state.cuisine)}
            title='Submit'
          />
        </View>
      </ScrollView>
    );
  }
}
