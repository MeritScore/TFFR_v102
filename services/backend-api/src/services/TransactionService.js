const RepositoryFactory = require('../../../../core/database/index');

class TransactionService {
    constructor() {
        this.db = RepositoryFactory.getInstance();
    }

    /**
     * Executes a tip transaction between two users.
     * @param {string} fromUserId - Sender ID
     * @param {string} toUserId - Recipient ID
     * @param {number} amount - Amount in Meritocracy Coins
     * @returns {Promise<Object>} - Transaction record
     */
    async executeTip(fromUserId, toUserId, amount) {
        // 1. Validation
        if (!fromUserId || !toUserId) throw new Error("Invalid User IDs");
        if (amount <= 0) throw new Error("Amount must be positive");
        if (fromUserId === toUserId) throw new Error("Cannot tip self");

        // 2. Fetch User Profiles to validate existence (Optional for V1 speed, but good for trust)
        // const sender = await this.db.getUser(fromUserId);
        // if (!sender) throw new Error("Sender not found");

        // 3. Create Transaction Record
        const releaseDate = new Date();
        releaseDate.setDate(releaseDate.getDate() + 7); // 7-Day Anti-Fraud Hold

        const transaction = {
            fromId: fromUserId,
            toId: toUserId,
            amount: amount,
            status: 'PENDING',
            type: 'TIP',
            releaseDate: releaseDate.toISOString(),
            createdAt: new Date().toISOString()
        };

        try {
            const txId = await this.db.saveTransaction(transaction);

            // 4. Return Success Response
            return {
                success: true,
                transactionId: txId,
                status: 'PENDING',
                message: "Tip sent! Funds held in 7-Day Vault."
            };
        } catch (err) {
            console.error("Execute Tip Failed:", err);
            throw new Error("Transaction Failed");
        }
    }
}

module.exports = new TransactionService();
