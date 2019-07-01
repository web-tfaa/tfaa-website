import { db } from './firebase';
import { currentSchoolYearShort } from '../utils/helpers';

// Create/Update user entry in Firestore
export const doCreateEntry = (form, collection, documentId, callback) =>
  db.collection(`${collection}_${currentSchoolYearShort}`)
    .doc(documentId)
    .set(form)
    .then(() => {
      console.log(`Registration for ${documentId} was successful`);
      callback(form);
    })
    .catch((err) => {
      console.log(`Error adding registration for ${documentId} document`, err);
    });

export const doUpdateEntry = (form, collection, documentId) =>
  !console.log(form) && db.collection(`${collection}_${currentSchoolYearShort}`)
    .doc(documentId)
    .update(form)
    .then(() => {
      console.log(`Updating payment info for ${documentId} was successful`);
    })
    .catch((err) => {
      console.log(`Error updating payment info for ${documentId} document`, err);
    });

// Retrieves all registered members/sponsors for the current school year
export const doGetUsers = (collection, userList, callback) => {
  const updatedUserList = userList;
  return db.collection(`${collection}_${currentSchoolYearShort}`)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        updatedUserList[doc.id] = doc.data();
      });
      return callback(updatedUserList);
    })
    .catch((error) => {
      console.log('Error getting user docs: ', error);
    });
};

// Invoice actions
export const doGetInvoiceId = callback =>
  db.collection('Document_ID')
    .doc(`invoice_${currentSchoolYearShort}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        // doc.data() will be undefined in this case
        console.log('no such document for invoice');
      } else {
        callback(doc.data().currentInvoiceId);
      }
    })
    .catch((err) => {
      console.log('Error getting document for invoice:', err);
    });

export const doUpdateInvoiceId = () => {
  const invoiceDocRef = db.collection('Document_ID').doc(`invoice_${currentSchoolYearShort}`);

  return db.runTransaction(transaction =>
    transaction
      .get(invoiceDocRef)
      .then((doc) => {
        if (!doc.exists) {
          // doc.data() will be undefined in this case
          console.log('no such document for invoice');
        } else {
          const newInvoiceId = doc.data().currentInvoiceId + 1;
          transaction.update(invoiceDocRef, { currentInvoiceId: newInvoiceId });
        }
      })
      .catch((err) => {
        console.log('Error getting document for invoice:', err);
      }))
    .then(() => {
      console.log('transaction successfully committed');
    })
    .catch((err) => {
      console.log('transaction failed', err);
    });
};

// Receipt actions
export const doGetReceiptId = callback =>
  db.collection('Document_ID')
    .doc(`receipt_${currentSchoolYearShort}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        // doc.data() will be undefined in this case
        console.log('no such document for receipt');
      } else {
        callback(doc.data().currentReceiptId);
      }
    })
    .catch((err) => {
      console.log('Error getting document for receipt:', err);
    });

export const doUpdateReceiptId = () => {
  const receiptDocRef = db.collection('Document_ID').doc(`receipt_${currentSchoolYearShort}`);

  return db.runTransaction(transaction =>
    transaction
      .get(receiptDocRef)
      .then((doc) => {
        if (!doc.exists) {
          // doc.data() will be undefined in this case
          console.log('no such document for receipt');
        } else {
          const newReceiptId = doc.data().currentReceiptId + 1;
          transaction.update(receiptDocRef, { currentReceiptId: newReceiptId });
        }
      })
      .catch((err) => {
        console.log('Error getting document for receipt:', err);
      }))
    .then(() => {
      console.log('transaction successfully committed');
    })
    .catch((err) => {
      console.log('transaction failed', err);
    });
};
