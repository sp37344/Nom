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

export default class UserViewPostScreen extends React.Component {
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
    title: 'View Post',
  };


  async addOrder() {
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
    var user = firebase.auth().currentUser;
    var email = user.email;
    var userOrderQuery = firebase.database().ref('activeOrders/').orderByChild("userEmail").equalTo(email).limitToFirst(1);
    console.log('going through query')
    var orderDoesNotExistAlready = true;
    userOrderQuery.on("child_added", async function(orderSnapshot) {
      // .then(async function(orderSnapshot) {
      orderDoesNotExistAlready = false;
        // console.log('ORDER SNAPSHOT: ', orderSnapshot);
        // console.log('userEmail value: ',orderSnapshot.child("userEmail").val());
        // // check if the user already has an active order
        // if (orderSnapshot == null) {
        //
        // }
        // else {
          console.log('user already has active order');
          var isInOrder = false;

          var total = price * quantity;
          var oldTotal = orderSnapshot.child("total").val();

          var currentTime = new Date();
          var orderTime = currentTime.valueOf();
          // console.log(orderSnapshot);
          var snapshotKey = orderSnapshot.key;
          // console.log('key', snapshotKey);
          var foodItemsQuery = firebase.database().ref('activeOrders/' + snapshotKey + '/foodItems/').orderByChild("item").equalTo(item).limitToFirst(1);
          // console.log('FOOD ITEMS QUERY');
          // console.log(foodItemsQuery);
          // Edit the listing and update appropriately if it exists
          await foodItemsQuery.on("child_added", async function(snapshot) {

            var oldSubTotal = snapshot.child("subtotal").val();
            var newTotal = oldTotal - oldSubTotal + total;

            var updates = {};
            updates['activeOrders/' + snapshotKey] = {
              userEmail: email,
              restaurant,
              orderTime,
              total: newTotal
            };

            firebase.database().ref().update(updates);

            isInOrder = true;
            var postData = {
              item,
              price,
              description,
              quantity,
              subtotal: total,
              dietaryRestrictions,
              datePosted,
              expirationDate
            };
            console.log('listing already exists in the database')

            var foodItemKey = snapshot.key;
            // Write the new post's data simultaneously in the posts list and the user's post list.
            var foodUpdates = {};
            foodUpdates['activeOrders/' + snapshotKey + '/foodItems/' + foodItemKey] = postData;

            firebase.database().ref().update(foodUpdates);
          })

          // if the item is not in the order, add it to the food item array and update
          // the subtotal and total accordingly
          if (!isInOrder) {
            console.log('is not in order');
            var newTotal = oldTotal + total;

            var updates = {};
            updates['activeOrders/' + snapshotKey] = {
              userEmail: email,
              restaurant,
              orderTime,
              total: newTotal
            };

            firebase.database().ref().update(updates);

            var foodItemsRef = firebase.database().ref('activeOrders/' + snapshotKey).child("foodItems");
            await foodItemsRef.push({
              item,
              price,
              description,
              quantity,
              subtotal: total,
              dietaryRestrictions,
              datePosted,
              expirationDate
            });

          }

      })

      if (orderDoesNotExistAlready){
        console.log("user does not have order in active orders db");
        var orderID = 'order' + email;
        console.log('ORDERID', orderID);
        var currentTime = new Date();
        var orderTime = currentTime.valueOf();
        var total = price * quantity;

        var postData = {
          userEmail: email,
          restaurant,
          orderTime,
          total
        };

        // Get a key for the new post.
        var newPostKey = firebase.database().ref('activeOrders/').push().key;

        // Update the post.
        var updates = {};
        updates[newPostKey] = postData;

        firebase.database().ref('activeOrders/').update(updates)
        .then(async (data) => {
          console.log('success!');
          var foodItemsRef = firebase.database().ref('activeOrders/' + newPostKey).child("foodItems");
          await foodItemsRef.push({
            item,
            price,
            description,
            quantity,
            subtotal: total,
            dietaryRestrictions,
            datePosted,
            expirationDate
          });
        }).catch((error) => {
          // error callback
          console.log('error ', error)
        })
      }
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
        <Text style={styles.label}>
          {JSON.stringify(item)}
          ${JSON.stringify(price)}
          {JSON.stringify(description)}
          {JSON.stringify(dietaryRestrictions)}
          {JSON.stringify(quantity)}
          {JSON.stringify(restaurant)}
          {JSON.stringify(postedDate)}
        </Text>
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: 1,
          }}
        />
      </View>
      <View style={styles.newPostContainer}>
        <Text onPress={() => navigate("RestaurantNewPost")} style={styles.newPostText}> Add to cart </Text>
        <Ionicons
          name={Platform.OS === "ios" ? "ios-add-circle" : "md-add-circle"}
          color="gray"
          size={22}
          onPress={() =>
            this.addOrder()
          }
        />
      </View>
      </ScrollView>
    );
  }
}
// import React from 'react';
// import {
//   Button,
//   ScrollView,
//   View,
//   StyleSheet,
//   Text,
//   TextInput,
//   Platform,
//   AppRegistry
// } from 'react-native';
// import { SearchBar } from 'react-native-elements';
// import { ExpoLinksView } from '@expo/samples';
// import { Ionicons } from '@expo/vector-icons';
// import styles from '../styles';
// import App from '../App.js';
// import * as firebase from 'firebase';
//
// export default class UserViewPostScreen extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       dish: 'Dish Name',
//       details: 'List description of dish',
//       ingredients: '',
//       dietaryRestrictions: '',
//     };
//   }
//
//   static navigationOptions = {
//     title: 'View Post',
//   };
//
//
//   async addOrder() {
//     const { navigate } = this.props.navigation;
//     const { navigation } = this.props;
//     const item = navigation.getParam('item', "Bread");
//     const price = navigation.getParam('price', "3.00");
//     const description = navigation.getParam('description', "Delicious freshly baked");
//     const dietaryRestrictions = navigation.getParam('dietaryRestrictions', "None");
//     const quantity = navigation.getParam('quantity', "4");
//     const restaurant = navigation.getParam('restaurant', "Panera");
//     const expirationDate = navigation.getParam('expirationDate', "9:00PM today")
//     const datePosted = navigation.getParam('datePosted', "2:45PM today")
//     var user = firebase.auth().currentUser;
//     var email = user.email;
//     var userOrderQuery = firebase.database().ref('activeOrders/').orderByChild("userEmail").equalTo(email).limitToFirst(1);
//     console.log('going through query')
//     await userOrderQuery.on("value")
//       .then(async function(orderSnapshot) {
//         console.log('ORDER SNAPSHOT: ', orderSnapshot);
//         console.log('userEmail value: ',orderSnapshot.child("userEmail").val());
//         // check if the user already has an active order
//         if (orderSnapshot.child("userEmail").val() == null) {
//           console.log("user does not have order in active orders db");
//           var orderID = 'order' + email;
//           console.log('ORDERID', orderID);
//           var currentTime = new Date();
//           var orderTime = currentTime.valueOf();
//           var total = price * quantity;
//           console.log(item);
//           console.log(price);
//           console.log("QUANTITY", quantity);
//           console.log(description);
//           console.log("TOTAL", total);
//           console.log(dietaryRestrictions);
//           console.log(datePosted);
//           console.log(expirationDate);
//           console.log(email);
//           console.log("RESTAURANT", restaurant);
//           console.log(orderTime);
//           console.log(total);
//
//           var postData = {
//             userEmail: email,
//             restaurant,
//             orderTime,
//             total
//           };
//
//           // Get a key for the new post.
//           var newPostKey = firebase.database().ref('activeOrders/').push().key;
//
//           // Update the post.
//           var updates = {};
//           updates[newPostKey] = postData;
//
//           firebase.database().ref('activeOrders/').update(updates)
//           .then((data) => {
//             console.log('success!');
//             var foodItemsRef = firebase.database().ref('activeOrders/' + newPostKey).child("foodItems");
//             foodItemsRef.push({
//               item,
//               price,
//               description,
//               quantity,
//               subtotal: total,
//               dietaryRestrictions,
//               datePosted,
//               expirationDate
//             });
//           }).catch((error) => {
//             // error callback
//             console.log('error ', error)
//           })
//         }
//         else {
//           console.log('user already has active order');
//           var isInOrder = false;
//           var total = price * quantity;
//           // console.log(orderSnapshot);
//           var snapshotKey = orderSnapshot.key;
//           // console.log('key', snapshotKey);
//           var foodItemsQuery = firebase.database().ref('activeOrders/' + snapshotKey + '/foodItems/').orderByChild("item").equalTo(item).limitToFirst(1);
//           // console.log('FOOD ITEMS QUERY');
//           // console.log(foodItemsQuery);
//           // Edit the listing and update appropriately if it exists
//           foodItemsQuery.on("child_added", function(snapshot) {
//             isInOrder = true;
//
//             var currentTime = new Date();
//             var orderTime = currentTime.valueOf();
//             var postData = {
//               item,
//               price,
//               description,
//               quantity,
//               subtotal: total,
//               dietaryRestrictions,
//               datePosted,
//               expirationDate
//             };
//
//             var foodItemKey = snapshot.key;
//             // Write the new post's data simultaneously in the posts list and the user's post list.
//             var updates = {};
//             // updates['activeOrders/' + snapshotKey] = {
//             //   userEmail: email,
//             //   restaurant,
//             //   orderTime: 9999,
//             //   total
//             // }
//             updates['activeOrders/' + snapshotKey + '/foodItems/' + foodItemKey] = postData;
//
//             firebase.database().ref().update(updates);
//           })
//
//           if (!isInOrder) {
//             console.log('is not in order');
//             var foodItemsRef = firebase.database().ref('activeOrders/' + snapshotKey).child("foodItems");
//             foodItemsRef.push({
//               item,
//               price,
//               description,
//               quantity,
//               subtotal: total,
//               dietaryRestrictions,
//               datePosted,
//               expirationDate
//             });
//           }
//
//           // if the item is not in the order, add it to the food item array and update
//           // the subtotal and total accordingly
//
//         }
//       })
//   }
//
//
//
//
//   render() {
//     const { navigate } = this.props.navigation;
//     const { navigation } = this.props;
//     const item = navigation.getParam('item', "Bread");
//     const price = navigation.getParam('price', "3.00");
//     const description = navigation.getParam('description', "Delicious freshly baked");
//     const dietaryRestrictions = navigation.getParam('dietaryRestrictions', "None");
//     const quantity = navigation.getParam('quantity', "4");
//     const restaurant = navigation.getParam('restaurant', "Panera");
//     const expirationDate = navigation.getParam('expirationDate', "9:00PM today")
//     const postedDate = navigation.getParam('postedDate', "2:45PM today")
//
//     return (
//       <ScrollView style={styles.container}>
//       <View>
//         <Text style={styles.label}>
//           {JSON.stringify(item)}
//           ${JSON.stringify(price)}
//           {JSON.stringify(description)}
//           {JSON.stringify(dietaryRestrictions)}
//           {JSON.stringify(quantity)}
//           {JSON.stringify(restaurant)}
//           {JSON.stringify(postedDate)}
//         </Text>
//         <View
//           style={{
//             borderBottomColor: 'black',
//             borderBottomWidth: 1,
//           }}
//         />
//       </View>
//       <View style={styles.newPostContainer}>
//         <Text onPress={() => navigate("RestaurantNewPost")} style={styles.newPostText}> Add to cart </Text>
//         <Ionicons
//           name={Platform.OS === "ios" ? "ios-add-circle" : "md-add-circle"}
//           color="gray"
//           size={22}
//           onPress={() =>
//             this.addOrder()
//             // alert("Item added to cart");
//           }
//         />
//       </View>
//       </ScrollView>
//     );
//   }
// }


// import React from 'react';
// import {
//   Button,
//   ScrollView,
//   View,
//   StyleSheet,
//   Text,
//   TextInput,
//   Platform,
//   AppRegistry
// } from 'react-native';
// import { SearchBar } from 'react-native-elements';
// import { ExpoLinksView } from '@expo/samples';
// import { Ionicons } from '@expo/vector-icons';
// import styles from '../styles';
// import App from '../App.js';
// import * as firebase from 'firebase';
//
// export default class UserViewPostScreen extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       dish: 'Dish Name',
//       details: 'List description of dish',
//       ingredients: '',
//       dietaryRestrictions: '',
//     };
//   }
//
//   static navigationOptions = {
//     title: 'View Post',
//   };
//
//
//   async addOrder() {
//     const { navigate } = this.props.navigation;
//     const { navigation } = this.props;
//     const item = navigation.getParam('item', "Bread");
//     const price = navigation.getParam('price', "3.00");
//     const description = navigation.getParam('description', "Delicious freshly baked");
//     const dietaryRestrictions = navigation.getParam('dietaryRestrictions', "None");
//     const quantity = navigation.getParam('quantity', "4");
//     const restaurant = navigation.getParam('restaurant', "Panera");
//     const expirationDate = navigation.getParam('expirationDate', "9:00PM today")
//     const datePosted = navigation.getParam('datePosted', "2:45PM today")
//     var user = firebase.auth().currentUser;
//     var email = user.email;
//     var userOrderQuery = firebase.database().ref('activeOrders/').orderByChild("userEmail").equalTo(email).limitToFirst(1);
//     console.log('going through query')
//     await userOrderQuery.on("child_added", async function(orderSnapshot) {
//       // .then(async function(orderSnapshot) {
//         console.log('ORDER SNAPSHOT: ', orderSnapshot);
//         console.log('userEmail value: ',orderSnapshot.child("userEmail").val());
//         // check if the user already has an active order
//         if (orderSnapshot.child("userEmail").val() == null) {
//           console.log("user does not have order in active orders db");
//           var orderID = 'order' + email;
//           console.log('ORDERID', orderID);
//           var currentTime = new Date();
//           var orderTime = currentTime.valueOf();
//           var total = price * quantity;
//           console.log(item);
//           console.log(price);
//           console.log("QUANTITY", quantity);
//           console.log(description);
//           console.log("TOTAL", total);
//           console.log(dietaryRestrictions);
//           console.log(datePosted);
//           console.log(expirationDate);
//           console.log(email);
//           console.log("RESTAURANT", restaurant);
//           console.log(orderTime);
//           console.log(total);
//
//           var postData = {
//             userEmail: email,
//             restaurant,
//             orderTime,
//             total
//           };
//
//           // Get a key for the new post.
//           var newPostKey = firebase.database().ref('activeOrders/').push().key;
//
//           // Update the post.
//           var updates = {};
//           updates[newPostKey] = postData;
//
//           firebase.database().ref('activeOrders/').update(updates)
//           .then((data) => {
//             console.log('success!');
//             var foodItemsRef = firebase.database().ref('activeOrders/' + newPostKey).child("foodItems");
//             foodItemsRef.push({
//               item,
//               price,
//               description,
//               quantity,
//               subtotal: total,
//               dietaryRestrictions,
//               datePosted,
//               expirationDate
//             });
//           }).catch((error) => {
//             // error callback
//             console.log('error ', error)
//           })
//         }
//         else {
//           console.log('user already has active order');
//           var isInOrder = false;
//           var total = price * quantity;
//           // console.log(orderSnapshot);
//           var snapshotKey = orderSnapshot.key;
//           // console.log('key', snapshotKey);
//           var foodItemsQuery = firebase.database().ref('activeOrders/' + snapshotKey + '/foodItems/').orderByChild("item").equalTo(item).limitToFirst(1);
//           // console.log('FOOD ITEMS QUERY');
//           // console.log(foodItemsQuery);
//           // Edit the listing and update appropriately if it exists
//           foodItemsQuery.on("child_added", function(snapshot) {
//             isInOrder = true;
//
//             var currentTime = new Date();
//             var orderTime = currentTime.valueOf();
//             var postData = {
//               item,
//               price,
//               description,
//               quantity,
//               subtotal: total,
//               dietaryRestrictions,
//               datePosted,
//               expirationDate
//             };
//
//             var foodItemKey = snapshot.key;
//             // Write the new post's data simultaneously in the posts list and the user's post list.
//             var updates = {};
//             // updates['activeOrders/' + snapshotKey] = {
//             //   userEmail: email,
//             //   restaurant,
//             //   orderTime: 9999,
//             //   total
//             // }
//             updates['activeOrders/' + snapshotKey + '/foodItems/' + foodItemKey] = postData;
//
//             firebase.database().ref().update(updates);
//           })
//
//           if (!isInOrder) {
//             console.log('is not in order');
//             var foodItemsRef = firebase.database().ref('activeOrders/' + snapshotKey).child("foodItems");
//             foodItemsRef.push({
//               item,
//               price,
//               description,
//               quantity,
//               subtotal: total,
//               dietaryRestrictions,
//               datePosted,
//               expirationDate
//             });
//           }
//
//           // if the item is not in the order, add it to the food item array and update
//           // the subtotal and total accordingly
//
//         }
//       })
//       console.log('done');
//   }
//
//
//
//
//   render() {
//     const { navigate } = this.props.navigation;
//     const { navigation } = this.props;
//     const item = navigation.getParam('item', "Bread");
//     const price = navigation.getParam('price', "3.00");
//     const description = navigation.getParam('description', "Delicious freshly baked");
//     const dietaryRestrictions = navigation.getParam('dietaryRestrictions', "None");
//     const quantity = navigation.getParam('quantity', "4");
//     const restaurant = navigation.getParam('restaurant', "Panera");
//     const expirationDate = navigation.getParam('expirationDate', "9:00PM today")
//     const postedDate = navigation.getParam('postedDate', "2:45PM today")
//
//     return (
//       <ScrollView style={styles.container}>
//       <View>
//         <Text style={styles.label}>
//           {JSON.stringify(item)}
//           ${JSON.stringify(price)}
//           {JSON.stringify(description)}
//           {JSON.stringify(dietaryRestrictions)}
//           {JSON.stringify(quantity)}
//           {JSON.stringify(restaurant)}
//           {JSON.stringify(postedDate)}
//         </Text>
//         <View
//           style={{
//             borderBottomColor: 'black',
//             borderBottomWidth: 1,
//           }}
//         />
//       </View>
//       <View style={styles.newPostContainer}>
//         <Text onPress={() => navigate("RestaurantNewPost")} style={styles.newPostText}> Add to cart </Text>
//         <Ionicons
//           name={Platform.OS === "ios" ? "ios-add-circle" : "md-add-circle"}
//           color="gray"
//           size={22}
//           onPress={() =>
//             this.addOrder()
//             // alert("Item added to cart");
//           }
//         />
//       </View>
//       </ScrollView>
//     );
//   }
// }
