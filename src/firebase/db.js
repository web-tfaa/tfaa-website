import { db } from './firebase';

// User API
export const doCreateEntry = (form, documentId, callback) =>
  db.collection('registration_18-19')
    .doc(documentId)
    .set(form)
    .then(() => {
      console.log(`Registration for ${documentId} was successful`);
      callback(form);
    })
    .catch(err =>{
      console.log(`Error adding registration for ${documentId} document`, err);
    });

export const doUpdateEntry = (form, documentId) =>
  db.collection('registration_18-19')
    .doc(documentId)
    .update({
      AmountPaid: form.amount,
      MemberType: form.level,
      PaymentOption: form.paymentId ? 'Paypal' : 'Invoiced',
      PaypalPayerID: form.payerId || '',
      PaypalPaymentID: form.paymentId || '',
      invoiceDate: form.invoiceDate || '',
      invoiceId: form.invoiceId,
      receiptDate: form.receiptDate || '',
      receiptId: form.receiptId,
    })
    .then(() => {
      console.log(`Updating payment info for ${documentId} was successful`);
    })
    .catch(err =>{
      console.log(`Error updating payment info for ${documentId} document`, err);
    });

export const doGetUsers = (userList, callback) => {
  const updatedUserList = userList;
  return db.collection('registration_18-19')
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
export const doGetInvoiceId = (callback) =>
  db.collection('Document_ID')
    .doc('invoice_18-19')
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
  const invoiceDocRef = db.collection('Document_ID').doc('invoice_18-19');

  return db.runTransaction((transaction) =>
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
      }),
    )
    .then(() => {
      console.log('transaction successfully committed');
    })
    .catch((err) => {
      console.log('transaction failed', err);
    });
  };

// Receipt actions
export const doGetReceiptId = (callback) =>
  db.collection('Document_ID')
    .doc('receipt_18-19')
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
  const receiptDocRef = db.collection('Document_ID').doc('receipt_18-19');

  return db.runTransaction((transaction) =>
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
      }),
    )
    .then(() => {
      console.log('transaction successfully committed');
    })
    .catch((err) => {
      console.log('transaction failed', err);
    });
  };
