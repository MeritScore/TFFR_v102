const IDatabaseRepository = require('./IDatabaseRepository');
const { Firestore } = require('@google-cloud/firestore');

/**
 * FirestoreRepository (Engine B)
 * Optimized for Hyper-Scale Broadcast (75k+ Users).
 * 
 * Features:
 * - Geo-Sharding (to prevent hotspotting)
 * - Batch Writes (to save costs)
 */
class FirestoreRepository extends IDatabaseRepository {
    constructor() {
        super();
        this.firestore = new Firestore();
        console.log(" [ENGINE B] Firestore Repository Initialized (BURST MODE)");
    }

    async getEventHype(eventId) {
        // Aggregation Query (Supported in Firestore 2026)
        const snapshot = await this.firestore.collection('events').doc(eventId).collection('shards').count().get();
        return snapshot.data().count;
    }

    async syncUserScore(userId, scoreData) {
        // Eventual Consistency is acceptable here
        const userRef = this.firestore.collection('users').doc(userId);
        await userRef.set({
            meritScore: scoreData.total,
            lastUpdated: Firestore.FieldValue.serverTimestamp()
        }, { merge: true });
    }

    async getUser(handle) {
        const usersRef = this.firestore.collection('users');
        const snapshot = await usersRef.where('username', '==', handle).limit(1).get();
        if (snapshot.empty) return null;

        const doc = snapshot.docs[0];
        return { id: doc.id, ...doc.data() };
    }

    async createUser(userData) {
        const usersRef = this.firestore.collection('users');
        // Basic Merit Score for new users
        const newUser = {
            username: userData.username,
            role: userData.role || 'FAN',
            meritScore: 500, // Starting score
            createdAt: Firestore.FieldValue.serverTimestamp()
        };

        const docRef = await usersRef.add(newUser);
        return { id: docRef.id, ...newUser };
    }

    async syncOfflineQueue(items) {
        const batch = this.firestore.batch();
        let opsCount = 0;

        for (const item of items) {
            if (item.type === 'MESSAGE') {
                const zoneId = item.payload.zoneId || 'default_zone';
                const shardId = Math.floor(Math.random() * 100);
                const path = `events/current_event/zones/${zoneId}/messages_shard_${shardId}`;
                const ref = this.firestore.collection(path).doc();
                batch.set(ref, {
                    ...item.payload,
                    timestamp: Firestore.FieldValue.serverTimestamp(),
                    isOfflineSync: true
                });
                opsCount++;
            }
        }

        if (opsCount > 0) {
            await batch.commit();
        }

        return { success: true, count: opsCount };
    }

    async saveTransaction(transaction) {
        const txRef = this.firestore.collection('transactions').doc();
        const txData = {
            ...transaction,
            id: txRef.id,
            status: transaction.status || 'PENDING',
            timestamp: Firestore.FieldValue.serverTimestamp()
        };
        await txRef.set(txData);
        return txRef.id;
    }

    async createGig(gigData) {
        const gigRef = this.firestore.collection('gigs').doc();
        const newGig = {
            ...gigData,
            id: gigRef.id,
            createdAt: Firestore.FieldValue.serverTimestamp(),
            status: 'OPEN'
        };
        await gigRef.set(newGig);
        return gigRef.id;
    }

    async getGigs(filter) {
        let query = this.firestore.collection('gigs');

        if (filter && filter.type && filter.type !== 'ALL') {
            query = query.where('type', '==', filter.type);
        }

        // Default to showing only OPEN gigs
        query = query.where('status', '==', 'OPEN').orderBy('createdAt', 'desc').limit(50);

        const snapshot = await query.get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }

    async saveMessage(message) {
        // GEO-SHARDING LOGIC (Keep for archives/analytics)
        const zoneId = message.zoneId || 'default_zone';
        const shardId = Math.floor(Math.random() * 100);
        const path = `events/current_event/zones/${zoneId}/messages_shard_${shardId}`;
        const colRef = this.firestore.collection(path);

        // VIEW LOGIC (For Frontend Retrieval)
        const channel = message.channel || 'GLOBAL';
        const viewRef = this.firestore.collection(`channels/${channel}/messages`);

        try {
            const batch = this.firestore.batch();

            // 1. Write to Shard
            const shardDoc = colRef.doc();
            batch.set(shardDoc, {
                content: message.content, // Map content to text for frontend? Frontend uses 'text'.
                text: message.content || message.text,
                senderId: message.senderId,
                timestamp: Firestore.FieldValue.serverTimestamp(),
                originalId: shardDoc.id
            });

            // 2. Write to View
            const viewDoc = viewRef.doc();
            batch.set(viewDoc, {
                id: viewDoc.id,
                text: message.content || message.text,
                sender: message.senderId, // Frontend expects object or string
                senderId: message.senderId,
                type: message.type || 'CHAT',
                timestamp: Firestore.FieldValue.serverTimestamp(),
                metadata: message.metadata || {}
            });

            await batch.commit();
            return viewDoc.id;
        } catch (err) {
            console.error("Firestore Write Failed:", err);
            throw err;
        }
    }

    async getMessages(channel, limit = 50) {
        const msgsRef = this.firestore.collection(`channels/${channel}/messages`);
        const snapshot = await msgsRef.orderBy('timestamp', 'desc').limit(limit).get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })).reverse();
    }

    async toggleFollow(followerId, targetId) {
        const followRef = this.firestore.collection('users').doc(followerId).collection('following').doc(targetId);
        const doc = await followRef.get();

        if (doc.exists) {
            await followRef.delete();
            return false; // Unfollowed
        } else {
            await followRef.set({
                targetId: targetId,
                timestamp: Firestore.FieldValue.serverTimestamp()
            });
            return true; // Followed
        }
    }

    async healthCheck() {
        // Simple write check
        try {
            await this.firestore.collection('health').add({ t: Date.now() });
            return true;
        } catch (e) {
            return false;
        }
    }
}

module.exports = FirestoreRepository;
