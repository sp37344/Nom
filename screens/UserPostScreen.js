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
    this.state = {
      isLoading: true,
      availableList: [],
    };
  }

  static navigationOptions = {
    title: 'Posts',
  };

  // getAvailablePosts() {
  //   return new Promise(function (resolve, reject) {
  //     console.log('Getting restaurant available list')
  //     var availableList = [];
  //     var restaurantQuery = firebase.database().ref('restaurants/').orderByChild("active").equalTo(1);
  //     restaurantQuery.once("value")
  //       .then(function(snapshot) {
  //         snapshot.forEach(function(restaurantSnapshot) {
  //           console.log(restaurantSnapshot.child("email").val());
  //           var restaurantEmail = restaurantSnapshot.child("email").val();
  //           var restaurant = restaurantSnapshot.child("name").val();
  //           var restaurantAvailableList = [];
  //           var foodQuery = firebase.database().ref('food/').orderByChild("restaurant").equalTo(restaurantEmail);
  //           foodQuery.once("value")
  //             .then(function(snapshot) {
  //               snapshot.forEach(function(childSnapshot) {
  //                   // add logic here to only show active food listings
  //                   if (childSnapshot.child("active").val() == 1) {
  //                     console.log(childSnapshot.child("item").val());
  //                     restaurantAvailableList.push({
  //                       item: childSnapshot.child("item").val(),
  //                       description: childSnapshot.child("description").val(),
  //                       price: childSnapshot.child("price").val(),
  //                       dietaryRestrictions: childSnapshot.child("dietaryRestrictions").val(),
  //                       cuisine: childSnapshot.child("cuisine").val()
  //                     });
  //                   }
  //               })
  //             }).then(function() {
  //               if (restaurantAvailableList.length > 0) {
  //                 availableList.push ({
  //                   name: restaurant,
  //                   available: restaurantAvailableList
  //                 })
  //                 console.log("availableList", availableList);
  //               }
  //             })
  //         })
  //       })
  //       .then(function() {
  //         console.log('AVAILABLE LIST IN FUNCTION');
  //         console.log(availableList);
  //         // return availableList;
  //         resolve(availableList);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //         reject('error: ', error);
  //       })
  //     })
  //   }
  //
  // componentDidMount() {
  //     this.getAvailablePosts().then((availableList) => {
  //       console.log('promise returned');
  //       this.setState({
  //         availableList: availableList,
  //         isLoading: false,
  //       });
  //     }, (error) => {
  //       alert(error);
  //     })
  //   }

  render() {
    const { navigate } = this.props.navigation;
    const restaurantList = [
    {
      name: 'Panera Bread',
      available: [
        {
          item: 'Banana Bread',
          price: '$2.50'
        },
        {
          item: 'Coffee with Cream',
          price: '$1.50'
        },
        {
          item: 'Baked Muffin',
          price: '$2.50'
        },
      ]
    },
    {
      name: 'Kung Fu Tea',
      available: [
        {
          item: 'Wintermelon Milk Green Tea',
          price: '$2.50'
        },
      ]
    },
  ]

  return (
    <ScrollView style={styles.container}>
      <View style={styles.postContainer}>
          {
            restaurantList.map((restaurant, i) => (
              <View>
                <Text style={styles.label}>
                  {restaurant.name}
                </Text>
                <View
                  style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                  }}
                />
                {restaurant.available.map((item, j) => (
                  <ListItem
                    key={j}
                    title={item.item}
                    subtitle={item.price}
                    onPress={(item) => navigate("UserViewPost", {
                      item: item.item,
                      price: item.price
                      })} // and u pass props here
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
//   render() {
//     if (this.state.isLoading == true || this.state.availableList == undefined) {
//       return (
//         <View style={styles.postContainer}>
//           <Text style={styles.label}>
//             Loading...
//           </Text>
//         </View>
//       )
//     } else {
//       const { navigate } = this.props.navigation;
//
//     // const restaurantList = availableList
//     // [
//     //   {
//     //     name: 'Panera Bread',
//     //     available: [
//     //       {
//     //         item: 'muffins',
//     //         price: '$2.50'
//     //       },
//     //       {
//     //         item: 'coffee',
//     //         price: '$1.50'
//     //       },
//     //       {
//     //         item: 'baked goods',
//     //         price: '$2.50'
//     //       },
//     //     ]
//     //   },
//     //   {
//     //     name: 'Kung Fu tea',
//     //     available: [
//     //       {
//     //         item: 'Bubble Tea',
//     //         price: '$2.50'
//     //       },
//     //     ]
//     //   },
//     // ]
//
//     return (
//       <ScrollView style={styles.container}>
//         <View style={styles.postContainer}>
//             {
//               this.state.availableList.map((restaurant, i) => (
//                 <View>
//                   <Text style={styles.label}>
//                     {restaurant.name}
//                   </Text>
//                   <View
//                     style={{
//                       borderBottomColor: 'black',
//                       borderBottomWidth: 1,
//                     }}
//                   />
//                   {restaurant.available.map((item, j) => (
//                     <ListItem
//                       key={j}
//                       title={item.item}
//                       subtitle={item.price}
//                       onPress={() => navigate("UserViewPost")} // and u pass props here
//                     />
//                   ))}
//                 </View>
//               ))
//             }
//         </View>
//       </ScrollView>
//     );
//   }
// }
// }
