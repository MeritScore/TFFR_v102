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

    async postMessage(user, channelId, content) {
        if (!content || content.trim() === "") {
            throw new Error("Message content cannot be empty");
        }

        const messageData = {
            userId: user.id,
            username: user.username,
            channelId,
            content,
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
