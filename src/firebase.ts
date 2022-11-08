import firebase from "firebase/app";
import { getAuth } from "firebase/auth";

const app = firebase.initializeApp({
    apiKey: "AIzaSyABzgP3bBaEPqmZeCkcEc61W4Ptq08ffJE",
    authDomain: "login-signup-7b454.firebaseapp.com",
    projectId: "login-signup-7b454",
    storageBucket: "login-signup-7b454.appspot.com",
    messagingSenderId: "478365399384",
    appId: "1:478365399384:web:c628e821437542b6434d2d"
})

export const auth = getAuth(app);
export default app;