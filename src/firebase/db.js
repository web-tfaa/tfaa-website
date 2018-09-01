import { db } from './firebase';

// User API

export const doCreateEntry = (form, documentId) =>
  db.collection('registration_18-19')
    .doc(documentId)
    .set(form)
    .then((docRef) => {
      console.log('Document written with ID: ', docRef.id);
    })
    .catch(err => console.log('Error adding document', err));
