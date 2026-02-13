const chatController = {
    getMessages: async (req, res) => {
        try {
            const limit = parseInt(req.query.limit) || 50;
            const messages = await req.db.getMessages(limit);
            res.json(messages);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    sendMessage: async (req, res) => {
        try {
            const { content, senderId, topicTag } = req.body;

            if (!content || !senderId) {
                return res.status(400).json({ error: "Missing content or senderId" });
            }

            const messageId = await req.db.saveMessage({
                content,
                senderId,
                topicTag: topicTag || 'GENERAL'
            });

            // Simulate "Live" response via SSE or Polling
            // For now, just return the ID
            res.json({ id: messageId, status: "SENT" });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = chatController;
