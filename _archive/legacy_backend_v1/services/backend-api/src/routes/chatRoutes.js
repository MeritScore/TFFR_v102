const express = require('express');
const router = express.Router();
const chatService = require('../services/ChatService');

// GET /api/chat/messages?channel=GLOBAL&limit=50
router.get('/messages', async (req, res) => {
    try {
        const channel = req.query.channel || 'GLOBAL';
        const limit = parseInt(req.query.limit) || 50;
        const messages = await chatService.getMessages(channel, limit);
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /api/chat/messages
router.post('/messages', async (req, res) => {
    try {
        const messageData = req.body;
        // userId should come from auth, but we accept body for V7 Bridge
        const newMessage = await chatService.sendMessage(messageData);
        res.status(201).json(newMessage);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// POST /api/chat/promo (Admin only typically)
router.post('/promo', async (req, res) => {
    try {
        const promoData = req.body;
        const newPromo = await chatService.createFlashPromo(promoData);
        res.status(201).json(newPromo);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
