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

export default class RestaurantPostScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: 'Posts',
  };

  render() {
    const { navigate } = this.props.navigation;
    
    const availableList = [
      {
        item: 'muffins',
        price: '$2.50'
      },
      {
        item: 'coffee',
        price: '$1.50'
      },
      {
        item: 'baked goods',
        price: '$2.50'
      },
    ]

    const soldList = [
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
      }
    ]

    const unSoldList = [
      {
        item: 'pastry',
        price: '$1.50'
      }
    ]

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
            Available Items
          </Text>
          <ScrollView style={styles.itemsContainer} showsVerticalScrollIndicator>
            {
              availableList.map((item, i) => (
                <ListItem
                  key={i}
                  title={item.item}
                  subtitle={item.price}
                  onPress={() => navigate("RestaurantViewPost")}
                />
              ))
            }
          </ScrollView>
        </View>
        <View style={styles.postContainer}>
          <Text style={styles.label}>
            Sold Items
          </Text>
          <ScrollView style={styles.itemsContainer} showsVerticalScrollIndicator>
            {
              soldList.map((item, i) => (
                <ListItem
                  key={i}
                  title={item.item}
                  subtitle={item.price}
                  onPress={() => navigate("RestaurantViewFilledPost")}
                />
              ))
            }
          </ScrollView>
        </View>
        <View style={styles.postContainer}>
          <Text style={styles.label}>
            Unsold Items
          </Text>
          <ScrollView style={styles.itemsContainer} showsVerticalScrollIndicator>
            {
              unSoldList.map((item, i) => (
                <ListItem
                  key={i}
                  title={item.item}
                  subtitle={item.price}
                  onPress={() => navigate("RestaurantViewFilledPost")}
                />
              ))
            }
          </ScrollView>
        </View>
      </ScrollView>
    );
  }
}
