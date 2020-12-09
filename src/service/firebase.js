import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCx1H8Mlz-f5T5fMo8P3vL9fidUdpGAlMA",
    authDomain: "liphaestus.firebaseapp.com",
    databaseURL: "https://liphaestus.firebaseio.com",
    projectId: "liphaestus"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export const firebaseAuth = firebaseApp.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();

export const firebaseDatabase = firebaseApp.database();
