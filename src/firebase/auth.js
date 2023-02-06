// External Dependencies
import React from 'react';

// Internal Dependencies
import { auth } from './firebase';
import { useGetAuthUser } from '../utils/hooks/useGetAuthUser';

// Sign Up
export const doCreateUserWithEmailAndPassword = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password);

// Sign In
export const doSignInWithEmailAndPassword = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

// Sign out
export const doSignOut = () => auth.signOut();

// Password Reset
export const doPasswordReset = (email) =>
  auth.sendPasswordResetEmail(email);

// Password Change
export const doPasswordUpdate = (password) =>
  auth.currentUser.updatePassword(password);

export const doUpdateEmail = (newEmail) => {
  const { setCurrentAuthUser } = useGetAuthUser();

  return auth.currentUser.updateEmail(newEmail)
    .then((res) => {
      console.log('doUpdateEmail .. .res', res);
    });;
}
