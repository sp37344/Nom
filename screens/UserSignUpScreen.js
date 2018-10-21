import React from 'react';
import { ScrollView, 
  View, 
  StyleSheet, 
  Text, 
  Button
} from 'react-native';
import { ExpoLinksView } from '@expo/samples';

export default class UserSignUpScreen extends React.Component {
  static navigationOptions = {
    title: 'UserSignUp',
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView style={styles.container}>
        <View style={styles.backBarContainer}>
          <Button
              onPress={() => navigate('Home')}
              title='back'
            />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
