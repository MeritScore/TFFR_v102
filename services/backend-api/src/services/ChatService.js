const RepositoryFactory = require('../../../../core/database/index');

class ChatService {
    constructor() {
        this.db = RepositoryFactory.getInstance();
    }

    /**
     * Sends a message to a channel
     * @param {Object} messageData - { text, senderId, channel, type, metadata }
     */
    async sendMessage(messageData) {
        if (!messageData.text || !messageData.senderId) {
            throw new Error("Missing required fields for Message.");
        }

        const message = {
            ...messageData,
            content: messageData.text, // Repository expects 'content' or 'text' depending on engine
            timestamp: new Date().toISOString()
        };

        try {
            const messageId = await this.db.saveMessage(message);
            return {
                base_id: messageId,
                ...message,
                id: messageId // ensure id is top level
            };
        } catch (err) {
            console.error("ChatService sendMessage Error:", err);
            throw new Error("Failed to send message");
        }
    }

    /**
     * Retrieves recent messages from a channel
     * @param {string} channel - e.g. 'GLOBAL', 'VIP'
     * @param {number} limit 
     */
    async getMessages(channel = 'GLOBAL', limit = 50) {
        try {
            const messages = await this.db.getMessages(channel, limit);
            return messages;
        } catch (err) {
            console.error("ChatService getMessages Error:", err);
            // Return empty array instead of crashing for chat
            return [];
        }
    }

    /**
     * Admin/System method to create Flash Promos
     */
    async createFlashPromo(promoData) {
        // Promos are just special messages with metadata
        return this.sendMessage({
            ...promoData,
            type: 'FLASH_PROMO',
            channel: 'GLOBAL' // Promos usually go to global
        });
    }
}

module.exports = new ChatService();
