/**
 * test/load_test.js
 * 
 * SCALABILITY VERIFICATION
 * Simulates concurrent message posting to test Dual-Engine performance.
 */

const RepositoryFactory = require('../src/RepositoryFactory');
const ChatService = require('../src/domain/ChatService');

const TOTAL_REQUESTS = 100;

async function runLoadTest(mode) {
    console.log(`\n>>> STARTING LOAD TEST: ${mode} <<<`);

    // 1. Setup Environment
    if (mode) process.env.DATABASE_MODE = mode;
    else delete process.env.DATABASE_MODE;

    // 2. Initialize Stack
    const db = RepositoryFactory.getRepository();
    const chatService = new ChatService(db);

    console.log(`[LOAD_TEST] Target Engine: ${db.name}`);

    // 3. Generate Traffic
    const requests = [];
    const startTime = Date.now();

    for (let i = 0; i < TOTAL_REQUESTS; i++) {
        const user = { id: `user-${i}`, username: `bot-${i}` };
        requests.push(chatService.postMessage(user, 'general', `Load Test Message ${i}`));
    }

    // 4. Execute concurrently
    try {
        await Promise.all(requests);
        const duration = Date.now() - startTime;
        console.log(`[LOAD_TEST] SUCCESS: Processed ${TOTAL_REQUESTS} messages in ${duration}ms.`);
        console.log(`[LOAD_TEST] Throughput: ${(TOTAL_REQUESTS / duration * 1000).toFixed(2)} req/sec`);
    } catch (error) {
        console.error(`[LOAD_TEST] FAILED:`, error);
    }
}

async function main() {
    await runLoadTest('FIRESTORE');
    await runLoadTest('SPANNER');
}

main();
