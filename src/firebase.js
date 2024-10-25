import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyBlh7fjD6rUGSijtnd1k8VDBD9xB5Ci3u4",
    authDomain: "invoice-app-c3550.firebaseapp.com",
    projectId: "invoice-app-c3550",
    storageBucket: "invoice-app-c3550.appspot.com",
    messagingSenderId: "815654016281",
    appId: "1:815654016281:web:64c380af333c4b201e6188",
    measurementId: "G-FHX60YD5WM"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore(app);