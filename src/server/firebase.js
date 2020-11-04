import firebase from 'firebase';

import 'firebase/auth';
import 'firebase/storage';
import 'firebase/database';

var firebaseConfig = {
  apiKey: "AIzaSyDSfmabIKwjQJL8bpHVCEnocEsKB6ukn_E",
  authDomain: "slack-clone-daba3.firebaseapp.com",
  databaseURL: "https://slack-clone-daba3.firebaseio.com",
  projectId: "slack-clone-daba3",
  storageBucket: "slack-clone-daba3.appspot.com",
  messagingSenderId: "206603323883",
  appId: "1:206603323883:web:0e07e3f6bbff3ec58a31ae",
  measurementId: "G-VXGQJGQRGF",
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;