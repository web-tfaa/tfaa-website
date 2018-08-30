import { db } from './firebase';

// User API

export const doCreateEntry = (form) =>
  db.collection('registration')
    .add(form)
    .then((docRef) => {
      console.log('Document written with ID: ', docRef.id);
    })
    .catch(err => console.log('Error adding document', err));

// export const onceGetUsers = () => db.ref('users').once('value');
