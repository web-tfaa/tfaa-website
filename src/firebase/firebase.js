import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// https://firebase.google.com/docs/web/setup?authuser=0

// TODO: Set up a separate prod config
const prodConfig = {
  apiKey: process.env.GATSBY_FIREBASE_API_KEY_PROD,
  authDomain: process.env.GATSBY_FIREBASE_AUTH_DOMAIN_PROD,
  databaseURL: process.env.GATSBY_FIREBASE_DATABASE_URL_PROD,
  projectId: process.env.GATSBY_FIREBASE_PROJECT_ID_PROD,
  storageBucket: process.env.GATSBY_FIREBASE_STORAGE_BUCKET_PROD,
  messagingSenderId: process.env.GATSBY_FIREBASE_MESSAGING_SENDER_ID_PROD,
};

const devConfig = {
  apiKey: process.env.GATSBY_FIREBASE_API_KEY,
  authDomain: process.env.GATSBY_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.GATSBY_FIREBASE_DATABASE_URL,
  messagingSenderId: process.env.GATSBY_FIREBASE_MESSAGING_SENDER_ID,
  projectId: process.env.GATSBY_FIREBASE_PROJECT_ID,
  storageBucket: process.env.GATSBY_FIREBASE_STORAGE_BUCKET,
};

const config = process.env.NODE_ENV === 'production'
  ? prodConfig
  : devConfig;

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

// eslint-disable-next-line
let db, auth;

if (typeof window !== 'undefined') {
  // Initialize Cloud Firestore through Firebase
  db = firebase.firestore();

  // Disable deprecated features
  db.settings({
    timestampsInSnapshots: true,
  });

  auth = firebase.auth();
}

export { auth, db };
