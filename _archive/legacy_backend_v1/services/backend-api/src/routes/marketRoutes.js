const express = require('express');
const router = express.Router();
const marketService = require('../services/MarketService');

// GET /api/market/gigs?type=ALL|OFFER|REQUEST
router.get('/gigs', async (req, res) => {
    try {
        const type = req.query.type || 'ALL';
        const gigs = await marketService.getGigs(type);
        res.status(200).json(gigs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /api/market/gigs
router.post('/gigs', async (req, res) => {
    try {
        const gigData = req.body;
        // In a real app, userId would come from Auth middleware (req.user.id)
        // For V7 Bridge, we accept it in body or header if present
        const newGig = await marketService.createGig(gigData);
        res.status(201).json(newGig);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// POST /api/market/gigs/:id/bid
router.post('/gigs/:id/bid', async (req, res) => {
    try {
        const { id } = req.params;
        const { buyerId, amount } = req.body;
        const result = await marketService.bidOnGig(id, buyerId, amount);
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
