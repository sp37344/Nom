import React from 'react';
import {
  ImageBackground,
  Button,
  ScrollView,
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  RefreshControl
} from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import { FontAwesome } from '@expo/vector-icons';
import { MonoText } from '../components/StyledText';
import styles from '../styles';
import App from '../App.js';
import * as firebase from 'firebase';

export default class RestaurantProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      refreshing: false,
    };
  }

  static navigationOptions = {
    title: 'Business Profile',
  };

  _onRefresh = () => {
    this.setState({refreshing: true});
    this.getRestaurantInfo().then((restaurant) => {
      console.log("STATE", this.state);
      console.log("RESTAURANT", restaurant);
      var name = restaurant.name;
      var address = restaurant.address;
      var phone = restaurant.phone;
      var description = restaurant.description;
      console.log("1 name", name);
      console.log("1 address", address);
      console.log('1 phone', phone);
      console.log('1 description', description);
      console.log('promise returned');
      this.setState({
        name,
        address,
        phone,
        description,
        isLoading: false,
        refreshing: false,
      });
      console.log("NEW STATE", this.state)
    }, (error) => {
      alert(error);
    })
  }

  setStateAsync(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve)
    });
  }

  async getRestaurantInfo() {
    return new Promise(async function (resolve, reject) {
      var user = firebase.auth().currentUser;
      var email = user.email;

      var restaurantQuery = firebase.database().ref('restaurants/').orderByChild('email').equalTo(email).limitToFirst(1);
      console.log('going through query');
      var restaurantInfo;

      restaurantQuery.once('value')
        .then(function (bigSnapshot) {
          bigSnapshot.forEach(function(snapshot) {
            var name = snapshot.child("name").val();
            var address = snapshot.child("address").val();
            var phone = snapshot.child("phone").val();
            var description = snapshot.child("description").val();

            console.log("name", name);
            console.log("address", address);
            console.log('phone', phone);
            console.log('description', description);

            restaurantInfo = {
              name,
              address,
              phone,
              description
            }
          })
        }).then(function () {
          console.log('restaurantInfo: ', restaurantInfo);
          resolve(restaurantInfo);
        })
        .catch((error) => {
          console.log(error);
          reject('error: ', error);
        })
    })
  }

  renderDetail = (description) => {
    return (
      <View>
        <Text style={styles.detailText}>{description}</Text>
        <Text style={styles.subDetailText}>{this.props.detail}</Text>
      </View>
    )
  }

  renderDescription = (name, address, phone, description) => {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <View style={{flex:1, flexDirection:'row'}}>
          <Text style={styles.restaurantText}>{name}</Text>
          <FontAwesome
            style={{alignSelf:'center'}}
            name="edit"
            color="gray"
            size={22}
            onPress={() => navigate("EditProfile", {name, address, phone, description})}
          />
        </View>
        <Text style={styles.descriptionText}>{address}</Text>
        <Text style={styles.descriptionText}>{phone}</Text>
      </View>
    )
  }

  renderContactHeader = () => {
    const { img } = this.props
    return (
      <View style={styles.headerContainer}>
        <View style={styles.coverContainer}>
          <ImageBackground
            source={require("../assets/images/indianfood.jpg")}
            style={styles.coverImage}
          >
          </ImageBackground>
        </View>
      </View>
    )
  }

  async componentWillMount() {
    this.getRestaurantInfo().then((restaurant) => {
      console.log("STATE", this.state);
      console.log("RESTAURANT", restaurant);
      var name = restaurant.name;
      var address = restaurant.address;
      var phone = restaurant.phone;
      var description = restaurant.description;
      console.log("1 name", name);
      console.log("1 address", address);
      console.log('1 phone', phone);
      console.log('1 description', description);
      console.log('promise returned');
      this.setState({
        name,
        address,
        phone,
        description,
        isLoading: false
      });
      console.log("NEW STATE", this.state)
    }, (error) => {
      alert(error);
    })
  }

  render() {
    const { navigate } = this.props.navigation;
    const { navigation } = this.props;
    const name = navigation.getParam('name', "Name");
    const address = navigation.getParam('address', "Address");
    const phone = navigation.getParam('phone', "Phone Number");
    const description = navigation.getParam('description', "Description");

    return (
      <ScrollView
      	refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
        }
      	style={styles.scroll}
      >
        <ScrollView style={styles.scroll}>
          <View>
            <View>
              {this.renderContactHeader()}
            </View>
          </View>
          <View style={styles.productRow}>{this.renderDescription(this.state.name, this.state.address, this.state.phone)}</View>
          <View style={styles.productRow}>{this.renderDetail(this.state.description)}</View>
        {/* <Text onPress={() => navigate("Stats")}>Stats</Text> */}
        </ScrollView>
{/*        <View style={styles.footer}>
          <TouchableOpacity style={styles.buttonFooter}>
            <Text style={styles.textFooter}>CALL</Text>
          </TouchableOpacity>
          <View style={styles.borderCenter} />
          <TouchableOpacity style={styles.buttonFooter}>
            <Text style={styles.textFooter}>EMAIL</Text>
          </TouchableOpacity>
        </View> */}
      </ScrollView>
    );
  }

}
