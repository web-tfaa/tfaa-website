import firebase from "firebase";
import "firebase/storage";

// https://firebase.google.com/docs/web/setup?authuser=0

// TODO: Set up a separate prod config
// const prodConfig = {
//   apiKey: process.env.GATSBY_FIREBASE_API_KEY,
//   authDomain: process.env.GATSBY_FIREBASE_AUTH_DOMAIN,
//   databaseURL: process.env.GATSBY_FIREBASE_DATABASE_URL,
//   projectId: process.env.GATSBY_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.GATSBY_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.GATSBY_FIREBASE_MESSAGING_SENDER_ID,
// };

const devConfig = {
  apiKey: process.env.GATSBY_FIREBASE_API_KEY,
  authDomain: process.env.GATSBY_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.GATSBY_FIREBASE_DATABASE_URL,
  projectId: process.env.GATSBY_FIREBASE_PROJECT_ID,
  storageBucket: process.env.GATSBY_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.GATSBY_FIREBASE_MESSAGING_SENDER_ID,
};

// const config = process.env.NODE_ENV === 'production'
//   ? prodConfig
//   : devConfig;

if (!firebase.apps.length) {
  firebase.initializeApp(devConfig);
}

const db = firebase.database();
const auth = firebase.auth();
const storage = firebase.storage();

export {
  auth,
  db,
  storage,
};
