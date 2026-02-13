const express = require('express');
const router = express.Router();
const transactionService = require('../services/TransactionService');

// POST /api/wallet/tip
router.post('/tip', async (req, res) => {
    try {
        const { fromUserId, toUserId, amount } = req.body;

        const result = await transactionService.executeTip(fromUserId, toUserId, amount);

        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({
            error: err.message || "Wallet Error"
        });
    }
});

module.exports = router;
