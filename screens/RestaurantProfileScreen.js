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
  }

  static navigationOptions = {
    title: 'Business Profile',
  };

  renderDetail = () => {
    return (
      <View>
        <Text style={styles.detailText}>Nom Cafe is a restaurant established in 2018 dedicated to serving the students of Princeton University.</Text>
        <Text style={styles.subDetailText}>{this.props.detail}</Text>
      </View>
    )
  }

  renderDescription = () => {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <View style={{flex:1, flexDirection:'row'}}>
          <Text style={styles.restaurantText}>Nom Cafe</Text>
          <FontAwesome
            style={{alignSelf:'center'}}
            name="edit"
            color="gray"
            size={22}
            onPress={() => navigate("EditProfile")}
          />
        </View>
        <Text style={styles.descriptionText}>1 Nassau St., Princeton NJ 08544</Text>
        <Text style={styles.descriptionText}>000-000-0000</Text>
      </View>
    )
  }

  renderContactHeader = () => {
    const { img } = this.props
    return (
      <View style={styles.headerContainer}>
        <View style={styles.coverContainer}>
          <ImageBackground
            source={require("../assets/images/barbecue.jpg")}
            style={styles.coverImage}
          >
          </ImageBackground>
        </View>
      </View>
    )
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.mainViewStyle}>
        <ScrollView style={styles.scroll}>
          <View>
            <View>
              {this.renderContactHeader()}
            </View>
          </View>
          <View style={styles.productRow}>{this.renderDescription()}</View>
          <View style={styles.productRow}>{this.renderDetail()}</View>
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
      </View>
    );
  }
}
