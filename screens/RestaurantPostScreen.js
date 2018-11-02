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
    return (
      <ScrollView style={styles.container}>
        <View style={styles.newPostContainer}>
          <Text onPress={() => navigate("RestaurantNewPost")} style={styles.label}> New Post </Text>
          <Ionicons
            name={Platform.OS === "ios" ? "ios-add-circle" : "md-add-circle"}
            color="black"
            size={30}
            onPress={() => navigate("RestaurantNewPost")}
          />
        </View>
        <View style={styles.postContainer}>
          <Text style={styles.label}>
            Available Orders
          </Text>
        </View>
        <View style={styles.postContainer}>
          <Text style={styles.label}>
            Filled Orders
          </Text>
        </View>
      </ScrollView>
    );
  }
}
