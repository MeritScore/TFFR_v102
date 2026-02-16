const RepositoryFactory = require('../../../../core/database/index');

class MarketService {
    constructor() {
        this.db = RepositoryFactory.getInstance();
    }

    /**
     * Creates a new Gig/Offer in the marketplace
     * @param {Object} gigData - { title, price, location, type, userId }
     */
    async createGig(gigData) {
        if (!gigData.title || !gigData.price || !gigData.userId) {
            throw new Error("Missing required fields for Gig creation.");
        }

        // Ensure price is positive
        if (gigData.price <= 0) {
            throw new Error("Price must be greater than 0.");
        }

        try {
            const gigId = await this.db.createGig(gigData);
            return {
                base_id: gigId,
                ...gigData,
                status: 'OPEN',
                createdAt: new Date().toISOString()
            };
        } catch (err) {
            console.error("MarketService createGig Error:", err);
            throw new Error("Failed to create Gig");
        }
    }

    /**
     * Retrieves active gigs from the marketplace
     * @param {string} type - 'OFFER' | 'REQUEST' | 'ALL'
     */
    async getGigs(type = 'ALL') {
        try {
            const filter = { type };
            const gigs = await this.db.getGigs(filter);
            return gigs;
        } catch (err) {
            console.error("MarketService getGigs Error:", err);
            throw new Error("Failed to retrieve Gigs");
        }
    }

    /**
     * Executes a bid/buy action on a gig (Simulated via TransactionService for V1)
     */
    async bidOnGig(gigId, buyerId, amount) {
        // This would interact with TransactionService for payment
        // For now, we just acknowledge the intent.
        // In a real flow:
        // 1. Lock Gig
        // 2. Process Payment (Hold)
        // 3. Notify Seller
        return {
            success: true,
            message: "Bid placed successfully. Funds held in Vault.",
            gigId: gigId,
            buyerId: buyerId,
            amount: amount,
            status: 'PENDING_APPROVAL'
        };
    }
}

module.exports = new MarketService();
