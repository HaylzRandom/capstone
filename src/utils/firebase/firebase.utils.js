// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from 'firebase/auth';

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// Your web app's Firebase configuration

const firebaseConfig = {
	apiKey: 'AIzaSyA2iKt51_i32Gf_w9_io__TokiqACj-jK8',

	authDomain: 'clothing-store-db-b02cf.firebaseapp.com',

	projectId: 'clothing-store-db-b02cf',

	storageBucket: 'clothing-store-db-b02cf.appspot.com',

	messagingSenderId: '138331817693',

	appId: '1:138331817693:web:bdf93dd22d5609a3723d34',
};

// Initialize Firebase

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
	prompt: 'select_account',
});

export const auth = getAuth();
// Sign in with Google - Pop up edition
export const signInWithGooglePopup = () =>
	signInWithPopup(auth, googleProvider);
// Sign in with Google - Will redirect
export const signInWithGoogleRedirect = () =>
	signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
	userAuth,
	additionalInformation = { displayName: '' }
) => {
	if (!userAuth) return;

	const userDocRef = doc(db, 'users', userAuth.uid);

	const userSnapshot = await getDoc(userDocRef);

	// if user data does not exist
	if (!userSnapshot.exists()) {
		// create / set the document with the data from userAuth in my collection
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
				...additionalInformation,
			});
		} catch (error) {
			console.log('error creating user', error.message);
		}
	}

	// if user data exists
	return userDocRef;
	// return userDocRef
};

// Create user with email and password
export const createAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;
	return await createUserWithEmailAndPassword(auth, email, password);
};

// Sign in with email and password
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;
	return await signInWithEmailAndPassword(auth, email, password);
};
