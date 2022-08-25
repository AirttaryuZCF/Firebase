// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyBgT8bhmUrXScp1eYuJgPooWm8oLb51_ew',
	authDomain: 'fir-39754.firebaseapp.com',
	projectId: 'fir-39754',
	storageBucket: 'fir-39754.appspot.com',
	messagingSenderId: '981941936821',
	appId: '1:981941936821:web:8ff33b73fd16081eaf54fc',
	measurementId: 'G-K3R8Y5BDSN',
}

// Initialize Firebase
const Firebase = initializeApp(firebaseConfig)

export default Firebase
