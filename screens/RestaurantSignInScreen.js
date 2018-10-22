import React from 'react';
import { 
  Button,
  ScrollView, 
  View, 
  StyleSheet, 
  Text, 
  TextInput,
} from 'react-native';
import { ExpoLinksView } from '@expo/samples';

export default class RestaurantSignUpScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'example@gmail.com',
      password: '',
    };
  }

  static navigationOptions = {
    title: 'RestaurantSignIn',
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView style={styles.container}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}> Email </Text> 
          <TextInput 
            onChangeText={(text) => this.setState({email: text})}
            style={styles.input}
            value={this.state.email}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}> Password </Text> 
          <TextInput 
            onChangeText={(text) => this.setState({password: text})}
            secureTextEntry={true}
            style={styles.input}
            value={this.state.password}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text> New restaurant? Sign up </Text>
          <Text 
            onPress={() => void(0)}
            style={styles.link}>
            here. 
          </Text>
        </View>
        <View style={styles.buttons}>
          <Button
            onPress={() => void(0)}
            title='Submit'
          />
          <Button
            onPress={() => navigate('Home')}
            title='Go Back'
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  buttons: {
    paddingTop: 40,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  input: {
    fontSize: 24,
    color: 'rgba(96,100,109, 1)',
    flex: 1,
  },
  inputContainer: {
    paddingTop: 40,
    paddingLeft: 15,
    paddingRight: 10,
    flex: 1,
    flexDirection: 'row',
  },
  label: {
    fontSize: 24,
    color: 'rgba(0, 122, 255, 1)',
    paddingRight: 10,
  },
  link: {
    color: 'rgba(0, 122, 255, 1)',
  }
});
