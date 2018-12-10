import React from 'react';
import {
  Button,
  ScrollView,
  View,
  StyleSheet,
  Text,
  TextInput,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { ExpoLinksView } from '@expo/samples';
import styles from '../styles';
import App from '../App.js';
import * as firebase from 'firebase';

export default class RestaurantEditProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      address: '',
      phone: '',
      email: 'example@gmail.com',
      description: ''
      // name: "Name",
      // address: "Address",
      // phone: "Phone Number",
      // email: 'example@gmail.com',
      // description: "Description"
    };
  }

  static navigationOptions = {
    title: 'Edit Profile',
  };

  async updateProfile(name, address, phone, description) {
    var user = firebase.auth().currentUser;
    var email = user.email;

    var restaurantQuery = firebase.database().ref('restaurants/').orderByChild('email').equalTo(email).limitToFirst(1);
    console.log('going through query');

    await restaurantQuery.once('value', async function(restaurantSnapshot) {
      if (restaurantSnapshot.exists()) {
        var restaurantRef = restaurantSnapshot.ref;
        var restaurantKey = Object.keys(restaurantSnapshot.val())[0];
        console.log("restaurant snapshot: ", restaurantSnapshot);

        await firebase.database().ref('restaurants/' + restaurantKey).update({
          name,
          address,
          phone,
          description
        });
        console.log("done updating");
        navigate("RestaurantProfile", {name, address, phone, description});
        return;
      } else {
        console.log('adding restaurant')

        var restaurantKey = await firebase.database().ref('restaurants/').push({
          name,
          address,
          phone,
          email,
          description
        }).key;

        console.log("restaurantKey", restaurantKey);
        console.log("done adding restaurant");
        // navigate("Profile");
        navigate("RestaurantProfile", {name, address, phone, description});
        return;

      }
    });
    //navigate("Profile");
    navigate("RestaurantProfile", {name, address, phone, description});
    return;
  }

  renderDetail = (description) => {
    return (
      <View>
        <TextInput
          onFocus={() => this.setState({description})}
          onChangeText={(text) => this.setState({description: text})}
          style={styles.detailText}
          value={this.state.description}
        />
        <Text style={styles.subDetailText}>{this.props.detail}</Text>
      </View>
    )
  }

  renderDescription = (name, address, phone, description) => {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <TextInput
          onFocus={() => this.setState({name})}
          onChangeText={(text) => this.setState({name: text})}
          style={styles.restaurantEditText}
          value={this.state.name}
        />
        <TextInput
            onFocus={() => this.setState({address})}
            onChangeText={(text) => this.setState({address: text})}
            style={styles.descriptionEditText}
            value={this.state.address}
          />
        <TextInput
          onFocus={() => this.setState({phone})}
          onChangeText={(text) => this.setState({phone: text})}
          style={styles.descriptionEditText}
          value={this.state.phone}
        />
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

  componentDidMount() {
    const { navigate } = this.props.navigation;
    const { navigation } = this.props;
    const name = navigation.getParam('name', "Name");
    const address = navigation.getParam('address', "Address");
    const phone = navigation.getParam('phone', "Phone Number");
    const description = navigation.getParam('description', "Description");
    this.setState({
      name,
      address,
      phone,
      description
    });


    // this.getAvailableList().then((availableList) => {
    //   console.log('promise returned');
    //   this.setState({
    //     availableList: availableList
    //     // isLoading: false
    //   });
    //   this.getFilledList().then((filledList) => {
    //     console.log('filled list promise returned');
    //     this.setState({
    //       filledList: filledList,
    //       isLoading: false
    //     })
    //   })
    // }, (error) => {
    //   alert(error);
    // })
  }

  render() {
    const { navigate } = this.props.navigation;
    const { navigation } = this.props;
    const name = navigation.getParam('name', "Name");
    const address = navigation.getParam('address', "Address");
    const phone = navigation.getParam('phone', "Phone Number");
    const description = navigation.getParam('description', "Description");

    return (
      <View style={styles.mainViewStyle}>
        <ScrollView style={styles.scroll}>
          <View style={[styles.container, this.props.containerStyle]}>
            <View style={styles.cardContainer}>
              {this.renderContactHeader()}
            </View>
          </View>
          <View style={styles.productRow}>{this.renderDescription(name, address, phone, description)}</View>
          <View style={styles.productRow}>{this.renderDetail(description)}</View>
        </ScrollView>
        <ScrollView style={styles.scroll}>
          <TouchableOpacity onPress={this.handlPress}>
            <Text onPress = {() => {
              this.updateProfile(this.state.name, this.state.address, this.state.phone, this.state.description);
              navigate('Profile', {name, address, phone, description});
            }}
              style={styles.buttonOpaque}
              textDecorationLine={'underline'}>
              Update Profile
            </Text>
          </TouchableOpacity>
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
      </View>
    );
  }
}
