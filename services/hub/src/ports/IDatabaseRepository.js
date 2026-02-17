/**
 * IDatabaseRepository.js
 * 
 * THE PORT (Interface)
 * This file defines the contract that any database adapter must implement.
 * JavaScript doesn't have native interfaces, so we enforce this via error throwing.
 */

class IDatabaseRepository {
    constructor() {
        if (this.constructor === IDatabaseRepository) {
            throw new Error("Cannot instantiate abstract class IDatabaseRepository directly.");
        }
    }

    /**
     * Connect to the database
     */
    async connect() {
        throw new Error("Method 'connect()' must be implemented.");
    }

    /**
     * Create a new user
     * @param {Object} userData 
     * @returns {Promise<Object>} The created user
     */
    async createUser(userData) {
        throw new Error("Method 'createUser()' must be implemented.");
    }

    /**
     * Get a user by ID
     * @param {string} userId 
     * @returns {Promise<Object>} The user data
     */
    async getUser(userId) {
        throw new Error("Method 'getUser()' must be implemented.");
    }

    /**
     * Get a user by Username (for Login)
     * @param {string} username 
     * @returns {Promise<Object>} The user data
     */
    async getUserByUsername(username) {
        throw new Error("Method 'getUserByUsername()' must be implemented.");
    }

    /**
     * Save a chat message
     * @param {Object} messageData 
     * @returns {Promise<Object>} The saved message
     */
    async saveMessage(messageData) {
        throw new Error("Method 'saveMessage()' must be implemented.");
    }

    /**
     * Get messages from a channel
     * @param {string} channelId 
     * @param {number} limit 
     * @returns {Promise<Array>} List of messages
     */
    async getMessages(channelId, limit = 50) {
        throw new Error("Method 'getMessages()' must be implemented.");
    }

    /**
     * Record a transaction
     * @param {Object} txData 
     * @returns {Promise<Object>} The transaction record
     */
    async recordTransaction(txData) {
        throw new Error("Method 'recordTransaction()' must be implemented.");
    }
}

module.exports = IDatabaseRepository;
