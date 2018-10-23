import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import firebase from 'firebase';

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  componentWillMount() {
    var config = {
      apiKey: "AIzaSyA6q1rjqcHFDOx8gujyKKlTvv_ozmEN94A",
      authDomain: "nom-app-ae9ce.firebaseapp.com",
      databaseURL: "https://nom-app-ae9ce.firebaseio.com",
      projectId: "nom-app-ae9ce",
      storageBucket: "nom-app-ae9ce.appspot.com",
      messagingSenderId: "868719673669"
    };
    firebase.initializeApp(config);
  }

  addNewFoodListing(String restaurantID) {
    var ref = firebase.database().ref("Food");
    var query = ref.orderByChild("database/ID").equalTo(oldFoodID);
    query.once("value", function(snapshot) {
      snapshot.ref.update(
        // add updated fields here
      )
      // snapshot.forEach(function(child) {
      //   console.log(child.key, child.val().bio);
      // });
    });
  }

  editExistingFoodListing(String oldFoodID) {
    var ref = firebase.database().ref("Food");
    var query = ref.orderByChild("database/ID").equalTo(oldFoodID);
    query.once("value", function(snapshot) {
      snapshot.ref.update(
        // add updated fields here
      )
      // snapshot.forEach(function(child) {
      //   console.log(child.key, child.val().bio);
      // });
    });
  }


  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppNavigator />
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
