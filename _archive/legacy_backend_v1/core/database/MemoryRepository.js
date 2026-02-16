const IDatabaseRepository = require('./IDatabaseRepository');

/**
 * MemoryRepository (Engine C)
 * In-Memory persistence for Local Development and Demos.
 * Non-persistent: Data is lost on server restart.
 */
class MemoryRepository extends IDatabaseRepository {
    constructor() {
        super();
        this.data = {
            users: [],
            messages: [],
            gigs: [],
            transactions: [],
            followers: [],
            health: []
        };
        console.log(" [ENGINE C] Memory Repository Initialized (LOCAL DEMO MODE)");

        // Seed some data
        this.seedData();
    }

    seedData() {
        // Mock Users
        const u1 = { id: 'u1', username: 'Benito Martinez', meritScore: 180, avatarUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=400&h=400&fit=crop' };
        const u2 = { id: 'u2', username: 'Marilyn Alvarado', meritScore: 230, avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop' };
        const u3 = { id: 'u3', username: 'CryptoKing', meritScore: 120, avatarUrl: 'https://picsum.photos/205/205' };

        this.createUser(u1);
        this.createUser(u2);
        this.createUser(u3);

        const now = Date.now();

        // 1. Gig Offer
        this.data.messages.push({
            id: 'msg-demo-all-buttons',
            text: 'Need 3 people to help unload equipment at the VIP Backstage entrance. Must have credentials or high Merit Score level. Bidding open.',
            senderId: u3.id,
            sender: u3, // Pre-populate for frontend
            timestamp: new Date().toISOString(),
            type: 'GIG_OFFER',
            channel: 'GLOBAL',
            metadata: { gigTitle: 'Equipment Unload', amount: 300 },
            replies: [
                { id: 'r1', text: 'I have a score of 180, is that enough?', sender: u1, timestamp: new Date(now - 1000 * 60 * 2).toISOString(), type: 'CHAT' },
                { id: 'r2', text: 'On my way now!', sender: u2, timestamp: new Date(now - 1000 * 60 * 1).toISOString(), type: 'CHAT' }
            ]
        });

        // 2. Flash Promo
        this.data.messages.push({
            id: 'msg-flash-promo',
            text: 'Target: Names starting with "M"',
            senderId: 'SYSTEM',
            sender: 'SYSTEM',
            timestamp: new Date().toISOString(),
            type: 'FLASH_PROMO',
            channel: 'GLOBAL',
            metadata: {
                gigTitle: '1 FREE DRINK',
                venue: 'The Turbo Paddock',
                timeLeft: '29:59',
                target: 'Names starting with "M"'
            }
        });

        // 3. Marilyn Message
        this.data.messages.push({
            id: 'msg-marilyn',
            text: 'Just processed a high-value trade at the North Gate. Everything is moving smoothly!',
            senderId: u2.id,
            sender: u2,
            timestamp: new Date().toISOString(),
            channel: 'GLOBAL',
            type: 'CHAT'
        });

        // 4. Benito Message
        this.data.messages.push({
            id: 'msg-benito',
            text: "Does anyone have a spare entry pass? I'm blocked from the VIP zone.",
            senderId: u1.id,
            sender: u1,
            timestamp: new Date().toISOString(),
            channel: 'GLOBAL',
            type: 'CHAT'
        });
    }

    async healthCheck() {
        return true;
    }

    async saveMessage(message) {
        const msg = {
            id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
            ...message,
            timestamp: new Date().toISOString()
        };
        this.data.messages.push(msg);
        return msg.id;
    }

    async getMessages(channel, limit = 50) {
        return this.data.messages
            .filter(m => m.channel === channel || (!m.channel && channel === 'GLOBAL'))
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            .slice(0, limit);
    }

    async createGig(gigData) {
        const gig = {
            id: `gig_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
            ...gigData,
            status: 'OPEN',
            createdAt: new Date().toISOString()
        };
        this.data.gigs.push(gig);
        return gig.id;
    }

    async getGigs(filter) {
        let gigs = this.data.gigs.filter(g => g.status === 'OPEN');
        if (filter && filter.type && filter.type !== 'ALL') {
            gigs = gigs.filter(g => g.type === filter.type);
        }
        return gigs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    async createUser(userData) {
        const user = {
            id: `u_${Math.random().toString(36).substr(2, 5)}`,
            ...userData,
            meritScore: 500,
            createdAt: new Date().toISOString()
        };
        this.data.users.push(user);
        return user;
    }

    async getUser(handle) {
        return this.data.users.find(u => u.username === handle) || null;
    }

    async toggleFollow(followerId, targetId) {
        const idx = this.data.followers.findIndex(f => f.followerId === followerId && f.targetId === targetId);
        if (idx >= 0) {
            this.data.followers.splice(idx, 1);
            return false;
        } else {
            this.data.followers.push({ followerId, targetId, timestamp: new Date().toISOString() });
            return true;
        }
    }

    async saveTransaction(transaction) {
        const tx = {
            id: `tx_${Date.now()}`,
            ...transaction,
            status: 'COMPLETED',
            timestamp: new Date().toISOString()
        };
        this.data.transactions.push(tx);
        return tx.id;
    }

    // Add other required methods with no-op or simple logic
    async syncUserScore(userId, scoreData) { return; }
    async getEventHype(eventId) { return 100; }
    async syncOfflineQueue(items) { return { success: true, count: items.length }; }
}

module.exports = MemoryRepository;
