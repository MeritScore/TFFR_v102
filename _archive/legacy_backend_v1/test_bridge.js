const RepositoryFactory = require('./core/database/index');
const marketService = require('./services/backend-api/src/services/MarketService');
const chatService = require('./services/backend-api/src/services/ChatService');
const networkService = require('./services/backend-api/src/services/NetworkService');
const RepositoryFactoryInstance = RepositoryFactory.getInstance();

async function testBridge() {
    console.log("==========================================");
    console.log("   TESTING BACKEND V3 BRIDGE (DUAL-ENGINE)");
    console.log("==========================================\n");

    try {
        // 1. NETWORK TEST
        console.log(">>> [NETWORK] Creating Users...");
        const userA = await RepositoryFactoryInstance.createUser({ username: 'Alice_Bridge', role: 'FAN' });
        const userB = await RepositoryFactoryInstance.createUser({ username: 'Bob_Bridge', role: 'VIP' });
        console.log(`User A: ${userA.id}, User B: ${userB.id}`);

        console.log(">>> [NETWORK] Testing Follow...");
        await networkService.toggleFollow(userA.id, userB.id);
        console.log("Alice followed Bob (Success)");

        // 2. MARKET TEST
        console.log("\n>>> [MARKET] Creating Gig...");
        const gig = await marketService.createGig({
            title: "Testing V3 Bridge Gig",
            price: 50,
            location: "Section 101",
            type: "OFFER",
            userId: userA.id
        });
        console.log(`Gig Created: ${gig.base_id} - ${gig.title}`);

        console.log(">>> [MARKET] Retrieving Gigs...");
        const gigs = await marketService.getGigs('OFFER');
        console.log(`Found ${gigs.length} Offers.`);

        // 3. CHAT TEST
        console.log("\n>>> [CHAT] Sending Message...");
        const msg = await chatService.sendMessage({
            text: "Hello from the V3 Bridge Simulation!",
            senderId: userA.id,
            channel: 'GLOBAL',
            type: 'CHAT'
        });
        console.log(`Message Sent: ${msg.id}`);

        console.log(">>> [CHAT] Retrieving Messages...");
        const msgs = await chatService.getMessages('GLOBAL', 5);
        console.log(`Retrieved ${msgs.length} messages.`);

        if (msgs.length > 0) {
            console.log(`Latest: ${msgs[0].text}`);
        }

        console.log("\n==========================================");
        console.log("   [SUCCESS] BRIDGE VERIFIED");
        console.log("==========================================");

    } catch (err) {
        console.error("\n[FAILED] Bridge Test Failed:", err);
    }
}

// Run (Assuming DATABASE_MODE is set in environment or default)
// Check env first
if (!process.env.GOOGLE_CLOUD_PROJECT) {
    console.log("WARNING: GOOGLE_CLOUD_PROJECT not set. Auth might fail in Spanner mode.");
    // We assume default logic handles it or we set dummy for test
    process.env.GOOGLE_CLOUD_PROJECT = 'test-project';
}

testBridge();
