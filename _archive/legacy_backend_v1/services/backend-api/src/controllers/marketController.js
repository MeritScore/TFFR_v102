const marketController = {
    getAuctions: async (req, res) => {
        try {
            const auctions = await req.db.getAuctions();
            res.json(auctions);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    placeBid: async (req, res) => {
        try {
            const { auctionId, userId, amount } = req.body;

            // Transactional Bid logic handled in Repository
            const updatedAuction = await req.db.placeBid(auctionId, userId, amount);

            res.json({ success: true, auction: updatedAuction });

        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
};

module.exports = marketController;
