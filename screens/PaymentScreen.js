/* Code adapted from https://blog.bam.tech/developper-news/setup-stripe-react-native-nodejs and https://www.youtube.com/watch?v=NmNNbQKlF0I */

import React, { Component } from 'react';
import { 
  View, 
  Button,
  TextInput, 
  TouchableOpacity,
  Text,
} from 'react-native';
import styles from '../styles';
import Stripe from 'react-native-stripe-api';
// import stripe from 'tipsi-stripe';

// stripe.setOptions({
//   publishableKey: 'pk_test_z89g76srzE80SPaXbyDZaz1y',
// });

export default class PaymentScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			number: "4242424242424242",
			exp_month: "01",
			exp_year: "2019",
			cvc: "111",
      address_zip: "00000",
		};
	}

  makePayment(){
    const apiKey = 'sk_test_gStrSdMCeuTN1MX2Y9fX4Jlj';
    const client = new Stripe(apiKey);
    client.createToken({
       number: "4242424242424242",
       exp_month: "01",
       exp_year: "2019",
       cvc: "111",
       address_zip: "00000",
    }).then((customer) => {
      console.log(customer);
      //userID is from firebase
      client.createCustomer(customer.id, 'customer@email.com', '<Your user ID>', 'John', 'Doe');
    // client.createToken(this.state).then((customer) => {
      // console.log(customer);
      // this.props.navigation.navigate('UserPost');
    }).catch((e) => {
      console.log(e);
      // this.props.navigation.navigate('UserPost');
    });
    // alert("paid");
    
  }
  // requestPayment = () => {
  // this.setState({ isPaymentPending: true });
  // return stripe
  //   .paymentRequestWithCardForm()
  //   .then(stripeTokenInfo => {
  //     return doPayment(100, stripeTokenInfo.tokenId);
  //   })
  //   .then(() => {
  //     console.warn('Payment succeeded!');
  //   })
  //   .catch(error => {
  //     console.warn('Payment failed', { error });
  //   })
  //   .finally(() => {
  //     this.setState({ isPaymentPending: false });
  //   });
  // };

  render() {
    return (
    	<View style={styles.loginContainer}>
        <View style={styles.loginField}>
          <Text style={styles.loginLabel}>card number</Text>
          <TextInput
            onChangeText={(number) => this.setState({number})}
            style={styles.loginInput}
            placeholder={""}
            value={this.state.number}
            placeholderTextColor={"orange"}
          />
        </View>
        <View style={styles.loginField}>
          <Text style={styles.loginLabel}>expiration month</Text>
          <TextInput
            onChangeText={(exp_month) => this.setState({exp_month})}
            style={styles.loginInput}
            placeholder={""}
            value={this.state.exp_month}
            placeholderTextColor={"orange"}
          />
        </View>
        <View style={styles.loginField}>
          <Text style={styles.loginLabel}>expiration year</Text>
          <TextInput
            onChangeText={(exp_year) => this.setState({exp_year})}
            style={styles.loginInput}
            placeholder={""}
            value={this.state.exp_year}
            placeholderTextColor={"orange"}
          />
        </View>
        <View style={styles.loginField}>
          <Text style={styles.loginLabel}>cvc</Text>
          <TextInput
            onChangeText={(cvc) => this.setState({cvc})}
            style={styles.loginInput}
            placeholder={""}
            value={this.state.cvc}
            placeholderTextColor={"orange"}
          />
        </View>
        <View style={styles.loginField}>
          <Text style={styles.loginLabel}>cvc</Text>
          <TextInput
            onChangeText={(address_zip) => this.setState({address_zip})}
            style={styles.loginInput}
            placeholder={""}
            value={this.state.address_zip}
            placeholderTextColor={"orange"}
          />
        </View>
        <TouchableOpacity onPress={this.handlPress}>
          <Text
            onPress={this.makePayment}
            disabled={this.state.isPaymentPending}
            style={styles.buttonOpaque}
            textDecorationLine={'underline'}>
            Make Payment
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}