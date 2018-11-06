import * as firebase from 'firebase';
// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA6q1rjqcHFDOx8gujyKKlTvv_ozmEN94A",
  authDomain: "nom-app-ae9ce.firebaseapdp.com",
  databaseURL: "https://nom-app-ae9ce.firebaseio.com/",
  storageBucket: "gs://nom-app-ae9ce.appspot.com"
};

const Firebase = firebase.initializeApp(firebaseConfig);

module.exports = Firebase;
