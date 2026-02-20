import { initializeApp } from 'firebase/app';
import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    User as FirebaseUser
} from 'firebase/auth';
import { firebaseConfig } from './firebaseConfig';
import { API_BASE_URL } from './config';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Providers
const providers: { [key: string]: any } = {
    google: new GoogleAuthProvider()
};

export const FirebaseClient = {
    signInWithProvider: async (providerName: 'google' | 'facebook' | 'apple' | 'github' | 'twitter') => {
        try {
            const provider = providers[providerName];
            if (!provider) throw new Error(`Provider ${providerName} not supported`);

            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            const idToken = await user.getIdToken();

            return { user, idToken };
        } catch (error: any) {
            console.error(`${providerName} Sign-In Error`, error);
            throw error;
        }
    },

    registerWithEmail: async (email: string, password: string) => {
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            const user = result.user;
            const idToken = await user.getIdToken();
            return { user, idToken };
        } catch (error: any) {
            console.error('Email Registration Error', error);
            throw error;
        }
    },

    loginWithEmail: async (email: string, password: string) => {
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            const user = result.user;
            const idToken = await user.getIdToken();
            return { user, idToken };
        } catch (error: any) {
            console.error('Email Login Error', error);
            throw error;
        }
    },

    authenticateWithBackend: async (idToken: string) => {
        const response = await fetch(`${API_BASE_URL}/auth/google`, { // Using /google as generic firebase auth endpoint for now
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ idToken })
        });

        if (!response.ok) {
            throw new Error('Backend authentication failed');
        }

        return await response.json();
    }
};
