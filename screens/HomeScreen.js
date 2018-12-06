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
      {/*
        <ImageBackground
            source={{
              uri: 'https://image.freepik.com/free-photo/tasty-fresh-unhealthy-hamburgers-with-ketchup-and-vegetables-and-chips-on-yellow-vibrant-bright-background-top-view-with-copy-space_1220-1332.jpg',
            }}
            resizeMode='cover'
            style={{width: null, height: null, flex: 1, backgroundAttachment: 'scroll'}}
          >
    */}
      
          <View style={styles.welcomeContainer}>
            <Text style={Platform.OS === "ios" ? styles.nomTextIOS : styles.nomTextAndroid}>NOM</Text>
          </View>
          {/*
          <View style={styles.buttonSection}>
          <View style={styles.button}>
            <Button
              onPress={() => navigate('UserSignIn')}
              title='User Login'
              color='white'
            />
            </View>
            <View style={styles.button}>
            <Button
              onPress={() => navigate('RestaurantSignIn')}
              title='Restaurant Login'
              color='white'
            />
            
            </View>
            </View>
          */}

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



          {/* <View style={styles.helpContainer}>
            <TouchableOpacity onPress={this._handleHelpPress} style={styles.helpLink}>
              <Text style={styles.helpLinkText}>Help, it didn’t automatically reload!</Text>
            </TouchableOpacity>
          </View> */}

        {/* <View style={styles.tabBarInfoContainer}>
          <Text style={styles.tabBarInfoText}>This is a tab bar. You can edit it in:</Text>

          <View style={[styles.codeHighlightContainer, styles.navigationFilename]}>
            <MonoText style={styles.codeHighlightText}>navigation/MainTabNavigator.js</MonoText>
          </View>
        </View> */}
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
