/**
 * src/domain/ChatService.js
 * 
 * BUSINESS LOGIC: The Super Hive Mind
 * Handles message processing, validation, and retrieval.
 */

class ChatService {
    constructor(dbRepository) {
        this.db = dbRepository;
    }

    async postMessage(sender, channelId, text) {
        if (!text || text.trim() === "") {
            throw new Error("Message text cannot be empty");
        }

        const messageData = {
            sender,         // Full user object
            channelId: channelId || 'GLOBAL',
            text,           // Changed from content to text
            type: 'CHAT',   // Defaulting to chat type
            timestamp: new Date()
        };

        const savedMessage = await this.db.saveMessage(messageData);
        return savedMessage;
    }

    async getChannelHistory(channelId) {
        return await this.db.getMessages(channelId);
    }
}

module.exports = ChatService;
