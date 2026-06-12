// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getAuth} from "./firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyChBW4hFdfCmT1QCrFvuqEzfaRVe9XfM9w",
    authDomain: "orgcasas-5c482.firebaseapp.com",
    projectId: "orgcasas-5c482",
    storageBucket: "orgcasas-5c482.firebasestorage.app",
    messagingSenderId: "387368700143",
    appId: "1:387368700143:web:4d04c9b03510284fe5f31a",
    measurementId: "G-XDLT7R9DTV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);