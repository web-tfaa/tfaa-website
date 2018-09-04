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

// export const doGetInvoiceId = () =>
//   db.collection('Document_ID')
//     .doc('invoice_18-19')
