const IDatabaseRepository = require('./IDatabaseRepository');
const { Spanner } = require('@google-cloud/spanner');

/**
 * SpannerRepository (Engine A)
 * Optimized for GCP 90-Day Free Trial (100 Processing Units).
 * 
 * RISK WARNING:
 * DO NOT exceed 1000 concurrent sessions.
 * DO NOT click Upgrade.
 */
class SpannerRepository extends IDatabaseRepository {
    constructor() {
        super();
        this.spanner = new Spanner({ projectId: process.env.GOOGLE_CLOUD_PROJECT });
        this.instanceId = 'the-fun-fan-hivemind'; // Trial Instance
        this.databaseId = 'hivemind-v1';
        this.instance = this.spanner.instance(this.instanceId);
        this.database = this.instance.database(this.databaseId);
        console.log(" [ENGINE A] Spanner Repository Initialized (TRIAL MODE)");
    }

    async saveMessage(message) {
        // Spanner 'Messages' table
        const msgId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
        const record = {
            MessageId: msgId,
            Content: message.content || message.text,
            SenderId: message.senderId,
            ChannelId: message.channel || 'GLOBAL',
            Type: message.type || 'CHAT',
            Timestamp: Spanner.timestamp(Date.now())
        };

        try {
            await this.database.table('Messages').insert([record]);
            return msgId;
        } catch (err) {
            console.error("Spanner saveMessage Failed:", err);
            throw err;
        }
    }

    async getMessages(channel, limit = 50) {
        const sql = `SELECT * FROM Messages WHERE ChannelId = @channel ORDER BY Timestamp DESC LIMIT @limit`;
        const params = {
            channel: channel || 'GLOBAL',
            limit: limit
        };

        try {
            const [rows] = await this.database.run({ sql, params });
            return rows.map(row => {
                const r = row.toJSON();
                return {
                    id: r.MessageId,
                    text: r.Content,
                    senderId: r.SenderId,
                    channel: r.ChannelId,
                    type: r.Type,
                    timestamp: r.Timestamp
                };
            }).reverse();
        } catch (err) {
            console.error("Spanner getMessages Failed:", err);
            return [];
        }
    }

    async getUser(handle) {
        const query = {
            sql: `SELECT * FROM Users WHERE Username = @handle LIMIT 1`,
            params: { handle }
        };

        try {
            const [rows] = await this.database.run(query);
            if (rows.length === 0) return null;
            const row = rows[0].toJSON();
            // Map Spanner columns to JS object
            return {
                id: row.UserId,
                username: row.Username,
                role: row.Role,
                meritScore: row.ReputationScore
            };
        } catch (err) {
            console.error("Spanner getUser Failed:", err);
            return null;
        }
    }

    async createUser(userData) {
        const userId = `u_${Math.random().toString(36).substr(2, 9)}`;
        const newUser = {
            UserId: userId,
            Username: userData.username,
            Role: userData.role || 'FAN',
            ReputationScore: 500,
            WalletBalance: Spanner.numeric(0)
        };

        try {
            await this.database.table('Users').insert([newUser]);
            return {
                id: userId,
                username: userData.username,
                role: newUser.Role,
                meritScore: newUser.ReputationScore
            };
        } catch (err) {
            console.error("Spanner createUser Failed:", err);
            throw err;
        }
    }

    async syncOfflineQueue(items) {
        const table = this.database.table('Messages');
        const mutations = [];
        for (const item of items) {
            if (item.type === 'MESSAGE') {
                const mk = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
                mutations.push({
                    MessageId: mk,
                    Content: item.payload.content,
                    SenderId: item.payload.senderId,
                    Timestamp: Spanner.timestamp(Date.now())
                });
            }
        }
        if (mutations.length > 0) {
            try {
                await table.insert(mutations);
                return { success: true, count: mutations.length };
            } catch (err) {
                console.error("Spanner Offline Sync Failed:", err);
                throw err;
            }
        }
        return { success: true, count: 0 };
    }

    async saveTransaction(transaction) {
        // Spanner 'Trades' table
        const tradeId = `tx_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
        const record = {
            TradeId: tradeId,
            BuyerId: transaction.fromId,
            SellerId: transaction.toId,
            Amount: Spanner.numeric(transaction.amount),
            Status: transaction.status || 'PENDING',
            CreatedAt: Spanner.timestamp(Date.now())
        };

        try {
            await this.database.table('Trades').insert([record]);
            return tradeId;
        } catch (err) {
            console.error("Spanner saveTransaction Failed:", err);
            throw err;
        }
    }

    async createGig(gigData) {
        const gigId = `gig_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
        const newGig = {
            GigId: gigId,
            Title: gigData.title,
            Price: Spanner.numeric(gigData.price),
            Location: gigData.location,
            Type: gigData.type, // 'OFFER' or 'REQUEST'
            UserId: gigData.userId,
            Status: 'OPEN',
            CreatedAt: Spanner.timestamp(Date.now())
        };

        try {
            await this.database.table('Gigs').insert([newGig]);
            return gigId;
        } catch (err) {
            console.error("Spanner createGig Failed:", err);
            throw err;
        }
    }

    async getGigs(filter) {
        let sql = `SELECT * FROM Gigs WHERE Status = 'OPEN'`;
        const params = {};

        if (filter && filter.type && filter.type !== 'ALL') {
            sql += ` AND Type = @type`;
            params.type = filter.type;
        }

        sql += ` ORDER BY CreatedAt DESC LIMIT 50`;

        try {
            const [rows] = await this.database.run({ sql, params });
            return rows.map(row => {
                const r = row.toJSON();
                return {
                    id: r.GigId,
                    title: r.Title,
                    price: r.Price,
                    location: r.Location,
                    type: r.Type,
                    userId: r.UserId,
                    status: r.Status,
                    createdAt: r.CreatedAt
                };
            });
        } catch (err) {
            console.error("Spanner getGigs Failed:", err);
            return [];
        }
    }

    async syncUserScore(userId, scoreData) {
        // ACID Transaction required for Merit Score
        const table = this.database.table('MeritScores');
        await this.database.runTransactionAsync(async (transaction) => {
            await transaction.update('MeritScores', [
                { UserId: userId, TotalScore: scoreData.total, LastUpdated: Spanner.timestamp(Date.now()) }
            ]);
            await transaction.commit();
        });
    }

    async getEventHype(eventId) {
        // Simple count query
        const [rows] = await this.database.run({
            sql: `SELECT COUNT(*) as exact_count FROM EventActivity WHERE EventId = @eventId`,
            params: { eventId }
        });
        // Mock return for now if EventActivity table doesn't exist or is empty
        return rows && rows[0] ? rows[0].toJSON().exact_count : 0;
    }

    async toggleFollow(followerId, targetId) {
        const table = this.database.table('Followers');
        const query = {
            sql: `SELECT * FROM Followers WHERE FollowerId = @followerId AND TargetId = @targetId LIMIT 1`,
            params: { followerId, targetId }
        };

        try {
            const [rows] = await this.database.run(query);
            if (rows.length > 0) {
                // DELETE (Unfollow)
                // Spanner delete requires Key
                await table.deleteRows([[followerId, targetId]]);
                return false;
            } else {
                // INSERT (Follow)
                await table.insert([{
                    FollowerId: followerId,
                    TargetId: targetId,
                    Timestamp: Spanner.timestamp(Date.now())
                }]);
                return true;
            }
        } catch (err) {
            console.error("Spanner toggleFollow Failed:", err);
            throw err;
        }
    }

    async healthCheck() {
        try {
            const [rows] = await this.database.run({ sql: 'SELECT 1' });
            return !!rows;
        } catch (e) {
            return false;
        }
    }
}

module.exports = SpannerRepository;
