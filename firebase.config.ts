// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDd7qqwLbm4LgsMRhrPH8onFsvfbSAfrjw',
  authDomain: 'nutri-dub.firebaseapp.com',
  projectId: 'nutri-dub',
  storageBucket: 'nutri-dub.appspot.com',
  messagingSenderId: '499605578737',
  appId: '1:499605578737:web:7f22fbfb7fe15108255a50',
  measurementId: 'G-66PFLNN1X2'
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
