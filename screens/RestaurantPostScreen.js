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

export default class RestaurantPostScreen extends React.Component {
  constructor(props) {
    super(props);
    // var list = this.getRestaurantAvailableList();
    // console.log('list');
    // console.log(list);
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
  };

  async getRestaurantAvailableList() {
    var user = firebase.auth().currentUser;
    var restaurant = user.email;
    console.log('Getting restaurant available list')
    var availableList = [];
    var query = firebase.database().ref('food/').orderByChild("restaurant").equalTo(restaurant);
    query.once("value")
      .then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          console.log(childSnapshot.child("item").val());
          console.log(childSnapshot.child("description").val());
          console.log(childSnapshot.child("price").val());
          console.log(childSnapshot.child("restaurant").val());
          console.log(childSnapshot.child("dietaryRestrictions").val());
          console.log(childSnapshot.child("cuisine").val());

          availableList.push(
          { item: childSnapshot.child("item").val(),
            description: childSnapshot.child("description").val(),
            price: childSnapshot.child("price").val(),
            dietaryRestrictions: childSnapshot.child("dietaryRestrictions").val(),
            cuisine: childSnapshot.child("cuisine").val()
          });

        })
      })
      .then(function() {
        console.log('AVAILABLE LIST IN FUNCTION');
        console.log(availableList);
        return availableList;
      })
      // .catch((error) => {
      //   console.log(error)
      // })
  }
  /*
  componentDidMount() {
    this.getRestaurantAvailableList().then(result => {
      this.setState({
        availableList: result,
        isLoading: false,
      });
    },
    (error) => {
      this.setState({
        isLoading: true,
        error
      });
    }
  )
}*/

async componentDidMount() {
  var list = await this.getRestaurantAvailableList();
  console.log("hi");
  console.log(list);
  await this.setStateAsync({
    availableList: list,
    isLoading: false,
  });
  // this.setState({isLoading: false});
}
  /*
  async componentWillMount() {
    var list = await this.getRestaurantAvailableList();
    this.setState({
      availableList: list
    });
    console.log('set the new state')
    // .then(() => {
    //   this.setState({
    //     availableList: list
    //   })
    //   console.log('set the new state')
    // });
  }
*/
  // getRestaurantAvailableList() {
  //   var user = firebase.auth().currentUser;
  //   var restaurant = user.email;
  //   console.log('Getting restaurant available list')
  //   var availableList = [];
  //   firebase.database().ref('food/').orderByChild("restaurant").equalTo(restaurant).on("child_added", function(snapshot) {
  //     console.log(snapshot.child("item").val());
  //     console.log(snapshot.child("description").val());
  //     console.log(snapshot.child("price").val());
  //     console.log(snapshot.child("restaurant").val());
  //     console.log(snapshot.child("dietaryRestrictions").val());
  //     console.log(snapshot.child("cuisine").val());
  //
  //     availableList.push(
  //     { item: snapshot.child("item").val(),
  //       description: snapshot.child("description").val(),
  //       price: snapshot.child("price").val(),
  //       dietaryRestrictions: snapshot.child("dietaryRestrictions").val(),
  //       cuisine: snapshot.child("cuisine").val()
  //     });
  //   }).then(() => {
  //     console.log('AVAILABLE LIST IN FUNCTION');
  //     console.log(availableList);
  //     return availableList;
  //   });
  // }


  // have a list of expiration dates (one for each quantity)
  //
  //
  // quantity: < 0 make that be the specification for querying for the user interface
  // have an expiration date


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
      console.log('Rendering page');
      // this.state.availableList = this.getRestaurantAvailableList();
      console.log('AVAILABLE LIST: ');
      console.log(this.state.availableList);

      const filledList = [
        {
          item: 'cake',
          price: '$3.50'
        },
        {
          item: 'tea',
          price: '$1.00'
        },
        {
          item: 'bagels',
          price: '$2.50'
        },
        {
          item: 'french toast',
          price: '$4.50'
        },
      ]
      console.log(this.state.availab)
      return (
        <ScrollView style={styles.container}>
          <View style={styles.newPostContainer}>
            <Text onPress={() => navigate("RestaurantNewPost")} style={styles.newPostText}> New Post </Text>
            <Ionicons
              name={Platform.OS === "ios" ? "ios-add-circle" : "md-add-circle"}
              color="gray"
              size={22}
              onPress={() => navigate("RestaurantNewPost")}
            />
          </View>
          <View style={styles.postContainer}>
            <Text style={styles.label}>
              Available Orders
            </Text>
            <View>
              {
                this.state.availableList.map((item, i) => (
                  <ListItem
                    key={i}
                    title={item.item}
                    subtitle={item.price}
                    onPress={() => navigate("RestaurantViewPost")}
                  />
                ))
              }
            </View>
          </View>
          <View style={styles.postContainer}>
            <Text style={styles.label}>
              Filled Orders
            </Text>
            <View>
              {
                filledList.map((item, i) => (
                  <ListItem
                    key={i}
                    title={item.item}
                    subtitle={item.price}
                    onPress={() => navigate("RestaurantViewFilledPost")}
                  />
                ))
              }
            </View>
          </View>
        </ScrollView>
      );
    }
  }
}
