import { db } from './firebase';

// User API
export const doCreateEntry = (form, documentId, callback) =>
  db.collection('registration_18-19')
    .doc(documentId)
    .set(form)
    .then(() => {
      console.log(`Registration for ${form.First_Name} ${form.Last_Name} was successful`);
      callback(form);
    })
    .catch(err =>{
      console.log(`Error adding registration for ${form.First_Name} ${form.Last_Name} document`, err);
    });

export const doUpdateEntry = (form, documentId) =>
  db.collection('registration_18-19')
    .doc(documentId)
    .update({
      Payment_Method: form.paymentId ? 'paypal' : 'invoiced',
      Invoice_Number: form.invoiceId,
      Receipt_Number: form.receiptId,
    })
    .then(() => {
      console.log(`Updating payment info for ${form.First_Name} ${form.Last_Name} was successful`);
    })
    .catch(err =>{
      console.log(`Error updating payment info for ${form.First_Name} ${form.Last_Name} document`, err);
    });


// Invoice actions
const invoiceDocRef = db.collection('Document_ID').doc('invoice_18-19');

export const doGetInvoiceId = (callback) =>
  db.collection('Document_ID')
    .doc('invoice_18-19')
    .get()
    .then((doc) => {
      if (!doc.exists) {
        // doc.data() will be undefined in this case
        console.log('no such document for invoice');
      } else {
        console.log('document data for invoice →', doc.data());
        callback(doc.data().currentInvoiceId);
      }
    })
    .catch((err) => {
      console.log('Error getting document for invoice:', err);
    });

export const doUpdateInvoiceId = () =>
  db.runTransaction((transaction) =>
    transaction
      .get(invoiceDocRef)
      .then((doc) => {
        if (!doc.exists) {
          // doc.data() will be undefined in this case
          console.log('no such document for invoice');
        } else {
          console.log('document data for invoice →', doc.data());

          const newInvoiceId = doc.data().currentInvoiceId + 1;
          transaction.update(invoiceDocRef, { currentInvoiceId: newInvoiceId });
        }
      })
      .catch((err) => {
        console.log('Error getting document for invoice:', err);
      }),
    )
    .then(() => {
      console.log('transaction successfully committed');
    })
    .catch((err) => {
      console.log('transaction failed', err);
    });


// Receipt actions
const receiptDocRef = db.collection('Document_ID').doc('receipt_18-19');

export const doGetReceiptId = (callback) =>
  db.collection('Document_ID')
    .doc('receipt_18-19')
    .get()
    .then((doc) => {
      if (!doc.exists) {
        // doc.data() will be undefined in this case
        console.log('no such document for receipt');
      } else {
        console.log('document data for receipt →', doc.data());
        callback(doc.data().currentReceiptId);
      }
    })
    .catch((err) => {
      console.log('Error getting document for receipt:', err);
    });

export const doUpdatReceiptId = () =>
  db.runTransaction((transaction) =>
    transaction
      .get(receiptDocRef)
      .then((doc) => {
        if (!doc.exists) {
          // doc.data() will be undefined in this case
          console.log('no such document for receipt');
        } else {
          console.log('document data for receipt →', doc.data());

          const newReceiptId = doc.data().currentReceiptId + 1;
          transaction.update(receiptDocRef, { currentReceiptId: newReceiptId });
        }
      })
      .catch((err) => {
        console.log('Error getting document for receipt:', err);
      }),
    )
    .then(() => {
      console.log('transaction successfully committed');
    })
    .catch((err) => {
      console.log('transaction failed', err);
    });
