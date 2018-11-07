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
        <Text style={styles.detailText}>description</Text>
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
      </View>
    )
  }

  renderContactHeader = () => {
    const { img } = this.props
    return (
      <View style={styles.headerContainer}>
        <View style={styles.coverContainer}>
          <ImageBackground
            source={{
              uri: 'https://www.bandarrestaurant.com/wp-content/uploads/2018/04/Bandar-Lobby.jpg',
            }}
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
        <View style={styles.footer}>
          <TouchableOpacity style={styles.buttonFooter}>
            <Text style={styles.textFooter}>CALL</Text>
          </TouchableOpacity>
          <View style={styles.borderCenter} />
          <TouchableOpacity style={styles.buttonFooter}>
            <Text style={styles.textFooter}>EMAIL</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
