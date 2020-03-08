import firebase from 'firebase/app';
import "firebase/auth";
import { fireEvent } from '@testing-library/react';

const firebaseConfig = {
    apiKey: "AIzaSyBSw9Nxy4vQnrmxH1VebqvNeW9bvTTflX0",
    authDomain: "plagiarism-checker-af3c8.firebaseapp.com",
    databaseURL: "https://plagiarism-checker-af3c8.firebaseio.com",
    projectId: "plagiarism-checker-af3c8",
    storageBucket: "plagiarism-checker-af3c8.appspot.com",
    messagingSenderId: "827416813758",
    appId: "1:827416813758:web:38070b76e17a918c2e3eef",
    measurementId: "G-KX4V5PVNP2"
  };

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();