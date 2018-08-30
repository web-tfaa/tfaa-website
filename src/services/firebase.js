// ./src/services/firebase.js
import firebase from "firebase";
import "firebase/firestore";

const devConfig = {
  apiKey: process.env.GATSBY_FIREBASE_API_KEY,
  authDomain: process.env.GATSBY_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.GATSBY_FIREBASE_DATABASE_URL,
  projectId: process.env.GATSBY_FIREBASE_PROJECT_ID,
  storageBucket: process.env.GATSBY_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.GATSBY_FIREBASE_MESSAGING_SENDER_ID,
};

class Firebase {
  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp(devConfig);
    }
    this.store = firebase.firestore;
    this.auth = firebase.auth;
  }

  get registration() {
    return this.store().collection('registration');
  }
}

export default new Firebase();
