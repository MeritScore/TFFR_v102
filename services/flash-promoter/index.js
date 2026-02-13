const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const RepositoryFactory = require('../../core/database/index');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3003;

app.use(cors());
app.use(express.json());

const db = RepositoryFactory.getInstance();

app.get('/health', async (req, res) => {
    res.json({ status: 'PROMOTER_ACTIVE', timestamp: new Date().toISOString() });
});

// Promoter Logic: Broadcast viral hype to specific zones
app.post('/promote', async (req, res) => {
    const { zoneId, message } = req.body;
    try {
        await db.saveMessage({
            content: `🔥 FLASH PROMO: ${message}`,
            senderId: 'SYSTEM_PROMOTER',
            zoneId: zoneId
        });
        res.json({ success: true, broadcast: 'SENT' });
    } catch (err) {
        res.status(500).json({ error: 'Promotion failed' });
    }
});

app.listen(PORT, () => {
    console.log(`[FLASH PROMOTER] Online on port ${PORT}`);
});
