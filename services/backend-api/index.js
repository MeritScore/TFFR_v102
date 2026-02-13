const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const RepositoryFactory = require('../../core/database/index');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Dual-Engine Core
const db = RepositoryFactory.getInstance();

// Inject DB into request
app.use((req, res, next) => {
    req.db = db;
    next();
});

// Import Routes
// Note: These will be verified/created in following steps
const authRoutes = require('./src/routes/authRoutes');
const chatRoutes = require('./src/routes/chatRoutes');
const marketRoutes = require('./src/routes/marketRoutes');
const networkRoutes = require('./src/routes/networkRoutes');
const walletRoutes = require('./src/routes/walletRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/market', marketRoutes);
app.use('/api/network', networkRoutes);
app.use('/api/wallet', walletRoutes);

// Health Check
app.get('/health', async (req, res) => {
    try {
        const isHealthy = await db.healthCheck();
        const mode = process.env.DATABASE_MODE || 'firestore_prod';

        res.json({
            status: isHealthy ? 'ONLINE' : 'OFFLINE',
            engine: mode === 'spanner_trial' ? 'SpannerRepository (Engine A)' : 'FirestoreRepository (Engine B)',
            timestamp: new Date().toISOString()
        });
    } catch (err) {
        res.status(500).json({ status: 'ERROR', message: 'Engine health check failed' });
    }
});

app.listen(PORT, () => {
    console.log(`
    ==========================================
    THE IRON VAULT (BACKEND API V3)
    ==========================================
    [STATUS]  ONLINE
    [PORT]    ${PORT}
    [ENGINE]  DUAL-ENGINE CORE READY
    ==========================================
    `);
});