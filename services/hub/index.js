/**
 * index.js
 * 
 * THE HUB ENTRY POINT
 * Initializes the backend service and injects the database engine.
 */

const RepositoryFactory = require('./src/RepositoryFactory');

// 1. Initialize DB Connection
const db = RepositoryFactory.getRepository();
db.connect();

// 2. Initialize API Server
const createServer = require('./src/adapters/api/server');
const app = createServer(db);

// 3. Start Listening
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`\n--- TFFR HUB STARTED ---`);
    console.log(`🚀 Server listening on port ${PORT}`);
    console.log(`🔷 Engine Mode: ${db.name}`);
});
