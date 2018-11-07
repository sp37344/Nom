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
import { 
  FontAwesome, 
  AntDesign, 
  MaterialCommunityIcons
} from '@expo/vector-icons';
import { MonoText } from '../components/StyledText';
import SettingsList from 'react-native-settings-list';
import styles from '../styles';

export default class RestaurantProfileScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: 'Settings',
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView style={styles.container}>
        <SettingsList borderColor='#d6d5d9' defaultItemSize={50}>
          <SettingsList.Item
            hasNavArrow={false}
            title='Payment'
            titleStyle={{color:'#009688', marginBottom:10, fontWeight:'500'}}
            itemWidth={50}
            borderHide={'Both'}
          />
          <SettingsList.Item
            icon={
              <MaterialCommunityIcons
                style={{alignSelf:'center', marginLeft:20, marginRight:20}}
                  name="credit-card"
                  color="gray"
                  size={22}
              />
            }
            hasNavArrow={false}
            itemWidth={70}
            titleStyle={{color:'black', fontSize: 16}}
            title='Edit Payment Option'
            onPress={() => navigate("EditProfile")}
          />
          
          <SettingsList.Item
            hasNavArrow={false}
            title='Account'
            titleStyle={{color:'#009688', marginBottom:10, fontWeight:'500'}}
            itemWidth={50}
            borderHide={'Both'}
          />
          <SettingsList.Item
            icon={
              <FontAwesome
                style={{alignSelf:'center', marginLeft:20, marginRight:20}}
                  name="edit"
                  color="gray"
                  size={22}
              />
            }
            hasNavArrow={false}
            itemWidth={70}
            titleStyle={{color:'black', fontSize: 16}}
            title='Edit Account'
            onPress={() => navigate("EditProfile")}
          />
          <SettingsList.Item
            icon={
              <AntDesign 
                style={{alignSelf:'center', marginLeft:20, marginRight:20}}
                  name="logout"
                  color="gray"
                  size={22}
              />
            }
            hasNavArrow={false}
            itemWidth={70}
            titleStyle={{color:'black', fontSize: 16}}
            title='Logout'
            onPress={() => navigate("Home")}
          />
        </SettingsList>
      </ScrollView>
    );
  }
}
