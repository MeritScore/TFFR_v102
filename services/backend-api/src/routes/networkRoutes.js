const express = require('express');
const router = express.Router();
const networkService = require('../services/NetworkService');

// GET /api/network/profile/:handle
router.get('/profile/:handle', async (req, res) => {
    try {
        const { handle } = req.params;
        const profile = await networkService.getProfile(handle);
        if (!profile) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(profile);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /api/network/follow
router.post('/follow', async (req, res) => {
    try {
        const { followerId, targetId } = req.body;
        const result = await networkService.toggleFollow(followerId, targetId);
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
