// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	GoogleAuthProvider,
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

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
	prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
	const userDocRef = doc(db, 'users', userAuth.uid);
	console.log(userDocRef);

	const userSnapshot = await getDoc(userDocRef);
	console.log(userSnapshot);
	console.log(userSnapshot.exists());

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
			});
		} catch (error) {
			console.log('error creating user', error.message);
		}
	}

	// if user data exists
	return userDocRef;
	// return userDocRef
};
