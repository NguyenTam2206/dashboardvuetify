// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from 'firebase/app';
import 'firebase/firestore';

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");

// TODO: Replace the following with your app's Firebase project configuration
var firebaseConfig = {
    apiKey: "AIzaSyBmECceSAlLiSHPoqTO2WiPRXbUG5q3kxs",
    authDomain: "vue-example2206.firebaseapp.com",
    databaseURL: "https://vue-example2206.firebaseio.com",
    projectId: "vue-example2206",
    storageBucket: "vue-example2206.appspot.com",
    messagingSenderId: "652354516052",
    appId: "1:652354516052:web:a3885aec3d9b51fee8e9c1"
  };
  
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default db;