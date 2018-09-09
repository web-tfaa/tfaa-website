import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/auth';

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
  messagingSenderId: process.env.GATSBY_FIREBASE_MESSAGING_SENDER_ID,
  projectId: process.env.GATSBY_FIREBASE_PROJECT_ID,
  storageBucket: process.env.GATSBY_FIREBASE_STORAGE_BUCKET,
};

// const config = process.env.NODE_ENV === 'production'
//   ? prodConfig
//   : devConfig;

if (!firebase.apps.length) {
  console.log('firebase.apps', firebase.apps.length, firebase.apps);
  firebase.initializeApp(devConfig);
}

// firebase.initializeApp(devConfig);

// eslint-disable-next-line
let db, auth;

if (typeof window !== 'undefined') {
  db = firebase.database();
  auth = firebase.auth();
}

// const auth = firebase.auth();
// const db = firebase.firestore();

export { auth, db };
