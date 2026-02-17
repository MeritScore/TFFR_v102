/**
 * src/adapters/api/chatRoutes.js
 * 
 * ROUTES: The Hive Mind Chat
 * Maps HTTP requests to ChatService methods.
 */

const express = require('express');
const router = express.Router();

module.exports = (chatService) => {

    // POST /chat/messages
    router.post('/messages', async (req, res) => {
        try {
            // In a real app, user comes from req.user (JWT)
            const { user, channelId, content } = req.body;

            if (!user || !user.id || !user.username) {
                return res.status(400).json({ error: "User object with id and username is required" });
            }

            const message = await chatService.postMessage(user, channelId, content);
            res.status(201).json(message);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    });

    // GET /chat/messages/:channelId
    router.get('/messages/:channelId', async (req, res) => {
        try {
            const { channelId } = req.params;
            const messages = await chatService.getChannelHistory(channelId);
            res.json(messages);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    });

    return router;
};
