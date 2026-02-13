const TransactionService = require('./services/backend-api/src/services/TransactionService');
const RepositoryFactory = require('./core/database/index');

async function testTipping() {
    console.log("🚀 Testing Transaction/Tipping Logic...");

    // Mock user IDs
    const userA = 'user_A_' + Date.now();
    const userB = 'user_B_' + Date.now();

    try {
        console.log(`Attempting tip from ${userA} to ${userB}...`);
        const result = await TransactionService.executeTip(userA, userB, 50);
        console.log("✅ Tip Result:", result);

        if (result.success && result.transactionId) {
            console.log("Transaction successfully recorded in the Vault.");
        } else {
            console.error("❌ Transaction failed to return success.");
        }
    } catch (err) {
        console.error("❌ Test Failed:", err);
    }
}

// Run (Assuming we have Firestore credentials or mock for local)
// For this test in the specific environment without creds, it might fail on the actual DB write
// but we want to see the logic execute up to that point.
testTipping();
