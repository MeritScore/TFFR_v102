/**
 * test/verify_dual_engine.js
 * 
 * Verification Script
 * Tests that the system correctly switches engines based on ENV variables.
 */

const RepositoryFactory = require('../src/RepositoryFactory');

function testEngine(mode) {
    console.log(`\n>>> TESTING MODE: ${mode || 'DEFAULT (UNDEFINED)'} <<<`);

    // Simulate ENV var
    if (mode) process.env.DATABASE_MODE = mode;
    else delete process.env.DATABASE_MODE;

    const db = RepositoryFactory.getRepository();

    if (mode === 'SPANNER' && db.name === 'ENGINE_A_SPANNER') {
        console.log("PASS: Spanner Engine correctly loaded.");
    } else if ((!mode || mode === 'FIRESTORE') && db.name === 'ENGINE_B_FIRESTORE') {
        console.log("PASS: Firestore Engine correctly loaded.");
    } else {
        console.error("FAIL: Incorrect Engine loaded.");
    }
}

// Run Tests
testEngine('FIRESTORE'); // Expect Engine B
testEngine('SPANNER');   // Expect Engine A
testEngine(undefined);   // Expect Engine B (Default)
