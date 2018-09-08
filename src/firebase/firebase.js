import firebase from 'firebase/app';
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
  projectId: process.env.GATSBY_FIREBASE_PROJECT_ID,
  storageBucket: process.env.GATSBY_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.GATSBY_FIREBASE_MESSAGING_SENDER_ID,
};

// const config = process.env.NODE_ENV === 'production'
//   ? prodConfig
//   : devConfig;

// console.log('typeof winddddow', typeof window);

// if (!firebase.apps.length) {
//   firebase.initializeApp(devConfig);
// }
// firebase.initializeApp(devConfig);

// // eslint-disable-next-line
// let db, auth;

// if (typeof window !== 'undefined') {
//   db = firebase.database();
//   auth = firebase.auth();
// }

// const auth = firebase && firebase.auth();
// const db = firebase && firebase.firestore();

// export { auth, db };

// Component Definition
class Firebase {
  constructor() {
    firebase.initializeApp(devConfig);
    this.auth = firebase.auth();
    this.db = firebase.database();
  }

  // // Sign Up
  // doCreateUserWithEmailAndPassword = (email, password) =>
  //   this.auth.createUserWithEmailAndPassword(email, password);
  //
  // // Sign In
  // doSignInWithEmailAndPassword = (email, password) =>
  //   this.auth.signInWithEmailAndPassword(email, password);
  //
  // // Sign out
  // doSignOut = () => this.auth.signOut();
  //
  // // Password Reset
  // doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
  //
  // // Password Change
  // doPasswordUpdate = password =>
  //   this.auth.currentUser.updatePassword(password);
  //
  // // User API
  // doCreateEntry = (form, documentId, callback) =>
  //   this.db.collection('registration_18-19')
  //     .doc(documentId)
  //     .set(form)
  //     .then(() => {
  //       console.log(`Registration for ${form.First_Name} ${form.Last_Name} was successful`);
  //       callback(form);
  //     })
  //     .catch(err =>{
  //       console.log(`Error adding registration for ${form.First_Name} ${form.Last_Name} document`, err);
  //     });
  //
  // doUpdateEntry = (form, documentId) =>
  //   this.db.collection('registration_18-19')
  //     .doc(documentId)
  //     .update({
  //       Payment_Method: form.paymentId ? 'paypal' : 'invoiced',
  //       Level: form.level,
  //       Amount_Paid: form.amount,
  //     })
  //     .then(() => {
  //       console.log(`Updating payment info for ${form.First_Name} ${form.Last_Name} was successful`);
  //     })
  //     .catch(err =>{
  //       console.log(`Error updating payment info for ${form.First_Name} ${form.Last_Name} document`, err);
  //     });
  //
  //
  // // Invoice actions
  // invoiceDocRef = this.db.collection('Document_ID').doc('invoice_18-19');
  //
  // doGetInvoiceId = (callback) =>
  //   this.db.collection('Document_ID')
  //     .doc('invoice_18-19')
  //     .get()
  //     .then((doc) => {
  //       if (!doc.exists) {
  //         // doc.data() will be undefined in this case
  //         console.log('no such document for invoice');
  //       } else {
  //         callback(doc.data().currentInvoiceId);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log('Error getting document for invoice:', err);
  //     });
  //
  // doUpdateInvoiceId = () =>
  //   this.db.runTransaction((transaction) =>
  //     transaction
  //       .get(this.invoiceDocRef)
  //       .then((doc) => {
  //         if (!doc.exists) {
  //           // doc.data() will be undefined in this case
  //           console.log('no such document for invoice');
  //         } else {
  //           const newInvoiceId = doc.data().currentInvoiceId + 1;
  //           transaction.update(this.invoiceDocRef, { currentInvoiceId: newInvoiceId });
  //         }
  //       })
  //       .catch((err) => {
  //         console.log('Error getting document for invoice:', err);
  //       }),
  //     )
  //     .then(() => {
  //       console.log('transaction successfully committed');
  //     })
  //     .catch((err) => {
  //       console.log('transaction failed', err);
  //     });
  //
  //
  // // Receipt actions
  // receiptDocRef = this.db.collection('Document_ID').doc('receipt_18-19');
  //
  // doGetReceiptId = (callback) =>
  //   this.db.collection('Document_ID')
  //     .doc('receipt_18-19')
  //     .get()
  //     .then((doc) => {
  //       if (!doc.exists) {
  //         // doc.data() will be undefined in this case
  //         console.log('no such document for receipt');
  //       } else {
  //         callback(doc.data().currentReceiptId);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log('Error getting document for receipt:', err);
  //     });
  //
  // doUpdateReceiptId = () =>
  //   this.db.runTransaction((transaction) =>
  //     transaction
  //       .get(this.receiptDocRef)
  //       .then((doc) => {
  //         if (!doc.exists) {
  //           // doc.data() will be undefined in this case
  //           console.log('no such document for receipt');
  //         } else {
  //           const newReceiptId = doc.data().currentReceiptId + 1;
  //           transaction.update(this.receiptDocRef, { currentReceiptId: newReceiptId });
  //         }
  //       })
  //       .catch((err) => {
  //         console.log('Error getting document for receipt:', err);
  //       }),
  //     )
  //     .then(() => {
  //       console.log('transaction successfully committed');
  //     })
  //     .catch((err) => {
  //       console.log('transaction failed', err);
  //     });

}

export default Firebase;
