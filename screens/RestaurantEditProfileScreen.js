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
      name: 'Restaurant Name',
      address: 'Restaurant Address',
      phone: 'Phone Number',
      email: 'example@gmail.com',
      description: 'Add description here.',
    };
  }

  static navigationOptions = {
    title: 'Edit Profile',
  };

  renderDetail = () => {
    return (
      <View>
        <TextInput 
          onFocus={() => this.setState({description: ''})}
          onChangeText={(text) => this.setState({description: text})}
          style={styles.detailText}
          value={this.state.description}
        />
        <Text style={styles.subDetailText}>{this.props.detail}</Text>
      </View>
    )
  }

  renderDescription = () => {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <TextInput 
          onFocus={() => this.setState({name: ''})}
          onChangeText={(text) => this.setState({name: text})}
          style={styles.restaurantEditText}
          value={this.state.name}
        />
        <TextInput 
            onFocus={() => this.setState({address: ''})}
            onChangeText={(text) => this.setState({address: text})}
            style={styles.descriptionEditText}
            value={this.state.address}
          />
        <TextInput 
          onFocus={() => this.setState({phone: ''})}
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
          <View style={[styles.container, this.props.containerStyle]}>
            <View style={styles.cardContainer}>
              {this.renderContactHeader()}
            </View>
          </View>
          <View style={styles.productRow}>{this.renderDescription()}</View>
          <View style={styles.productRow}>{this.renderDetail()}</View>
        </ScrollView>
        <ScrollView style={styles.scroll}>
          <TouchableOpacity onPress={this.handlPress}>
            <Text
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

