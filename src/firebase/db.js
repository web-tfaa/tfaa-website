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
export const doGetInvoiceId = (callback) =>
  db.collection('Document_ID')
    .doc('invoice_18-19')
    .get()
    .then((doc) => {
      if (doc.exists) {
        console.log('documnet data for invoice→', doc.data());
        callback(doc.data().currentInvoiceId);
      } else {
        // doc.data() will be undefined in this case
        console.log('no such document for invoice');
      }
    })
    .catch((err) => {
      console.log('Error getting document for invoice:', err);
    });

// Invoice actions
export const doGetReceiptId = (callback) =>
  db.collection('Document_ID')
    .doc('receipt_18-19')
    .get()
    .then((doc) => {
      if (doc.exists) {
        console.log('documnet data for receipt →', doc.data());
        callback(doc.data().currentReceiptId);
      } else {
        // doc.data() will be undefined in this case
        console.log('no such document for receipt');
      }
    })
    .catch((err) => {
      console.log('Error getting document for receipt:', err);
    });
