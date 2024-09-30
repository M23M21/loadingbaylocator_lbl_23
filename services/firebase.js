import { initializeApp } from 'firebase/app';
import { initializeAuth, getAuth, sendPasswordResetEmail, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { Platform, Alert } from 'react-native';


const firebaseConfig = {
  apiKey: "AIzaSyANg6pLx0zR5Ajg4FFjFDPvaxPNy1O2njU",
  authDomain: "loadinbaylocator.firebaseapp.com",
  projectId: "loadinbaylocator",
  storageBucket: "loadinbaylocator.appspot.com",
  messagingSenderId: "836229091487",
  appId: "1:836229091487:web:45453d6bb97f00ce1892aa",
  measurementId: "G-SRQMY42FM6"
};const app = initializeApp(firebaseConfig);

let auth;

if (Platform.OS === 'web') {

  auth = getAuth(app); 
} else {

  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });
}
const firestore = getFirestore(app);
const handlePasswordReset = (email, router) => {
  sendPasswordResetEmail(auth, email)
    .then(() => {
      Alert.alert('Success', 'Password reset email sent');
      router.back();
    })
    .catch((error) => {
      Alert.alert('Error', error.message);
    });
};
export { auth, firestore, handlePasswordReset };
