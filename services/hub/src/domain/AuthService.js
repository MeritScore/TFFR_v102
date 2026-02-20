const admin = require('firebase-admin');

class AuthService {
    constructor(dbOrFactory) {
        // Initialize Firebase Admin if not already initialized
        if (!admin.apps.length) {
            admin.initializeApp({
                credential: admin.credential.applicationDefault(),
                projectId: 'thefunfanreporter'
            });
        }
        this.auth = admin.auth();
        this.db = dbOrFactory;
    }

    async verifyGoogleToken(idToken) {
        try {
            const decodedToken = await this.auth.verifyIdToken(idToken);
            return {
                uid: decodedToken.uid,
                email: decodedToken.email,
                name: decodedToken.name,
                picture: decodedToken.picture
            };
        } catch (error) {
            console.error('Error verifying Firebase ID token:', error);
            throw new Error('Invalid Token');
        }
    }

    async loginWithGoogle(idToken) {
        const googleUser = await this.verifyGoogleToken(idToken);

        // Check if user exists in our DB, if not create them
        let user = await this.db.getUser(googleUser.uid);
        if (!user) {
            user = {
                id: googleUser.uid,
                username: googleUser.name || googleUser.email.split('@')[0],
                email: googleUser.email,
                avatarUrl: googleUser.picture,
                meritScore: 100, // Starting score
                role: 'USER'
            };
            await this.db.createUser(user);
        }

        return user;
    }
}

module.exports = AuthService;
