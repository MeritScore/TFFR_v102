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

    getRoleFromEmail(email) {
        const normalized = email.toLowerCase();
        const roleMap = {
            'godj@thefunfanreporter.com': 'GOD_MODE',
            'archy@ai.thefunfanreporter.com': 'ARCHY',
            'assi@ai.thefunfanreporter.com': 'ASSI',
            'desy@ai.thefunfanreporter.com': 'DESY',
            'mark@ai.thefunfanreporter.com': 'MARK',
            'hacky@ai.thefunfanreporter.com': 'HACKY',
            'flor@ai.thefunfanreporter.com': 'FLOR',
            'sirena@ai.thefunfanreporter.com': 'SIRENA',
            'datin@ai.thefunfanreporter.com': 'DATIN',
            'vippy@ai.thefunfanreporter.com': 'VIPPY',
            'guide@ai.thefunfanreporter.com': 'AI_SUPPORT',
            'sponsor@thefunfanreporter.com': 'SPONSOR',
            'owner@thefunfanreporter.com': 'OWNER',
            'manager@thefunfanreporter.com': 'MANAGER',
            'promoter@thefunfanreporter.com': 'PROMOTER',
        };
        return roleMap[normalized] || 'USER';
    }

    async loginWithGoogle(idToken) {
        const googleUser = await this.verifyGoogleToken(idToken);
        const targetRole = this.getRoleFromEmail(googleUser.email);

        // Check if user exists in our DB, if not create them
        let user = await this.db.getUser(googleUser.uid);
        if (!user) {
            user = {
                id: googleUser.uid,
                username: googleUser.name || googleUser.email.split('@')[0],
                email: googleUser.email,
                avatarUrl: googleUser.picture || '',
                meritScore: 100, // Starting score
                role: targetRole
            };
            await this.db.createUser(user);
        } else if (user.role !== targetRole) {
            // Enforce role consistency (upgrades/downgrades)
            user.role = targetRole;
            await this.db.updateUser(user.id, { role: targetRole });
        }

        return user;
    }
}

module.exports = AuthService;
