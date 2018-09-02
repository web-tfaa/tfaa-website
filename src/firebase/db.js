import { db } from './firebase';

// User API
export const doCreateEntry = (form, documentId) =>
  db.collection('registration_18-19')
    .doc(documentId)
    .set(form)
    .then(() => {
      console.log(`Registration for ${form.First_Name} ${form.Last_Name} was successful`);
    })
    .catch(err =>{
      console.log(`Error adding registration for ${form.First_Name} ${form.Last_Name} document`, err);
    });
