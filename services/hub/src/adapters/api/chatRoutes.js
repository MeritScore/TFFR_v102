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
            // In a real app, user comes from req.user (JWT), but matching frontend for now
            const { sender, channelId, text } = req.body;

            if (!sender || !sender.id || !sender.username) {
                return res.status(400).json({ error: "Sender object with id and username is required" });
            }

            const message = await chatService.postMessage(sender, channelId, text);
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
