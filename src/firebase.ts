import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyATiJpM14Y8HPRLWbaL_uNhsVRjy7uqjNo',
  authDomain: 'hanbit-directory-dev.firebaseapp.com',
  projectId: 'hanbit-directory-dev',
  storageBucket: 'hanbit-directory-dev.appspot.com',
  messagingSenderId: '575510018711',
  appId: '1:575510018711:web:f56b4085358482ee4547d2',
  measurementId: 'G-KMQ9GC3BZJ',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
