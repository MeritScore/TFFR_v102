/**
 * FirestoreRepository.js
 * 
 * ENGINE B: "Everyday Mode"
 * Optimized for low cost and high flexibility.
 */

const IDatabaseRepository = require('../../ports/IDatabaseRepository');

// Mocking Firestore SDK for initial scaffold
// In real implementation: const { Firestore } = require('@google-cloud/firestore');

const admin = require('firebase-admin');

class FirestoreRepository extends IDatabaseRepository {
    constructor() {
        super();
        this.name = "ENGINE_B_FIRESTORE";
        console.log(`[${this.name}] Initialized. Cost-effective mode active.`);

        // Ensure app is initialized
        if (!admin.apps.length) {
            admin.initializeApp({
                credential: admin.credential.applicationDefault(),
                projectId: 'thefunfanreporter'
            });
        }
        this.db = admin.firestore();
    }

    async connect() {
        console.log(`[${this.name}] Connected to Firestore.`);
        return true;
    }

    async createUser(userData) {
        console.log(`[${this.name}] Creating user ${userData.username} in 'users' collection.`);
        const userRef = this.db.collection('users').doc(userData.id);
        await userRef.set({ ...userData, engine: this.name }, { merge: true });
        return { ...userData, engine: this.name };
    }

    async getUser(userId) {
        console.log(`[${this.name}] Fetching user ${userId} from 'users' collection.`);
        const doc = await this.db.collection('users').doc(userId).get();
        if (doc.exists) {
            return doc.data();
        }
        return null;
    }

    async getUserByUsername(username) {
        console.log(`[${this.name}] Querying 'users' collection where username == ${username}`);
        const snapshot = await this.db.collection('users').where('username', '==', username).limit(1).get();
        if (!snapshot.empty) {
            return snapshot.docs[0].data();
        }
        return null;
    }

    async saveMessage(messageData) {
        const channelId = messageData.channelId || 'GLOBAL';
        console.log(`[${this.name}] Adding message to 'channels/${channelId}/messages'`);
        const messageRef = this.db.collection('channels').doc(channelId).collection('messages').doc();

        const timestamp = admin.firestore.FieldValue.serverTimestamp();
        const payload = { ...messageData, id: messageRef.id, timestamp: timestamp };

        await messageRef.set(payload);

        // Return local timestamp for immediate frontend rendering
        return { ...payload, timestamp: new Date() };
    }

    async getMessages(channelId, limitNum = 50) {
        const cid = channelId || 'GLOBAL';
        console.log(`[${this.name}] Fetching last ${limitNum} messages from 'channels/${cid}/messages'`);

        const snapshot = await this.db.collection('channels')
            .doc(cid)
            .collection('messages')
            .orderBy('timestamp', 'desc')
            .limit(limitNum)
            .get();

        const messages = [];
        snapshot.forEach(doc => {
            const data = doc.data();
            messages.push({
                ...data,
                // Convert Firestore Timestamp to JS Date
                timestamp: data.timestamp ? data.timestamp.toDate() : new Date()
            });
        });

        // Frontend expects chronologically ascending
        return messages.reverse();
    }

    async recordTransaction(txData) {
        console.log(`[${this.name}] Recording transaction via Firestore batch write.`);
        const txRef = this.db.collection('transactions').doc();
        await txRef.set({ ...txData, id: txRef.id, status: 'committed', timestamp: admin.firestore.FieldValue.serverTimestamp() });
        return { id: txRef.id, ...txData, status: 'committed' };
    }
}

module.exports = FirestoreRepository;
