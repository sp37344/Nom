import React from 'react';
import styles from '../styles';
import {
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';


export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.homeContainer}>      
          <View style={styles.welcomeContainer}>
            <Text style={Platform.OS === "ios" ? styles.nomTextIOS : styles.nomTextAndroid}>NOM</Text>
          </View>
        <TouchableOpacity onPress={this.handlPress}>
          <Text 
            onPress={() => navigate('UserSignIn')}
            style={styles.buttonTransparent}>
          
            User Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.handlPress}>
          <Text 
            onPress={() => navigate('RestaurantSignIn')}
            style={styles.buttonTransparent}
            textDecorationLine={'underline'}>
            Restaurant Login
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}