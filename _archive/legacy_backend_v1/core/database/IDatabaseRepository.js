/**
 * IDatabaseRepository.js
 * The Hexagonal Interface for the "Dual-Engine" Architecture.
 * 
 * Strict Mandate:
 * All business logic must depend ONLY on this class, never on 'SpannerRepository' 
 * or 'FirestoreRepository' directly.
 */
class IDatabaseRepository {
    constructor() {
        if (this.constructor === IDatabaseRepository) {
            throw new Error("IDatabaseRepository is an Interface and cannot be instantiated directly.");
        }
    }

    /**
     * Saves a new chat message to the active engine.
     * @param {Object} message - { content, senderId, timestamp, zoneId }
     * @returns {Promise<string>} - The ID of the saved message.
     */
    async saveMessage(message) {
        throw new Error("Method 'saveMessage' must be implemented.");
    }

    /**
     * Syncs the latest Merit Score for a user.
     * @param {string} userId 
     * @param {Object} scoreData - { consistency, complexity, velocity, total }
     * @returns {Promise<void>}
     */
    async syncUserScore(userId, scoreData) {
        throw new Error("Method 'syncUserScore' must be implemented.");
    }

    /**
     * Retrives the current "Hype" level (User Count / Activity) for an event.
     * @param {string} eventId 
     * @returns {Promise<number>}
     */
    async getEventHype(eventId) {
        throw new Error("Method 'getEventHype' must be implemented.");
    }

    /**
     * Retrieves a user by their handle/username.
     * @param {string} handle 
     * @returns {Promise<Object|null>}
     */
    async getUser(handle) {
        throw new Error("Method 'getUser' must be implemented.");
    }

    /**
     * Creates a new user.
     * @param {Object} userData - { username, role }
     * @returns {Promise<Object>}
     */
    async createUser(userData) {
        throw new Error("Method 'createUser' must be implemented.");
    }

    /**
     * Syncs a batch of offline actions when connectivity returns.
     * @param {Array<Object>} items - List of actions { type, payload, timestamp }
     * @returns {Promise<Object>} - { success: true, count: number }
     */
    async syncOfflineQueue(items) {
        throw new Error("Method 'syncOfflineQueue' must be implemented.");
    }

    /**
     * Records a financial transaction (Lip, Gig, etc.)
     * @param {Object} transaction - { fromId, toId, amount, type }
     * @returns {Promise<string>} - Transaction ID
     */
    async saveTransaction(transaction) {
        throw new Error("Method 'saveTransaction' must be implemented.");
    }

    /**
     * Creates a new Gig/Offer in the marketplace
     * @param {Object} gigData - { title, price, location, type, userId }
     * @returns {Promise<string>} - Gig ID
     */
    async createGig(gigData) {
        throw new Error("Method 'createGig' must be implemented.");
    }

    /**
     * Retrieves active gigs from the marketplace
     * @param {Object} filter - { type: 'OFFER' | 'REQUEST' | 'ALL' }
     * @returns {Promise<Array>} - List of gigs
     */
    async getGigs(filter) {
        throw new Error("Method 'getGigs' must be implemented.");
    }

    /**
     * Saves a chat message to the database
     * @param {Object} message - { text, senderId, type, channel, metadata }
     * @returns {Promise<string>} - Message ID
     */
    async saveMessage(message) {
        throw new Error("Method 'saveMessage' must be implemented.");
    }

    /**
     * Retrieves recent messages from a channel
     * @param {string} channel - e.g., 'GLOBAL', 'VIP'
     * @param {number} limit - Number of messages to retrieve
     * @returns {Promise<Array>} - List of messages
     */
    async getMessages(channel, limit) {
        throw new Error("Method 'getMessages' must be implemented.");
    }

    /**
     * Toggles a follow relationship between two users.
     * @param {string} followerId 
     * @param {string} targetId 
     * @returns {Promise<boolean>} - True if followed, False if unfollowed
     */
    async toggleFollow(followerId, targetId) {
        throw new Error("Method 'toggleFollow' must be implemented.");
    }

    /**
     * Checks health and connectivity of the current engine.
     * @returns {Promise<boolean>}
     */
    async healthCheck() {
        throw new Error("Method 'healthCheck' must be implemented.");
    }
}

module.exports = IDatabaseRepository;
