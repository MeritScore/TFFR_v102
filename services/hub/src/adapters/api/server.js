/**
 * src/adapters/api/server.js
 * 
 * HOST: The Express Application
 * Configures middleware, security, and routes.
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

function createServer(dbRepository) {
    const app = express();

    // 1. Security & Middleware
    app.use(helmet()); // Secure HTTP headers
    app.use(cors({
        origin: [
            'http://localhost:3000',
            'https://thefunfanreporter.com',
            'https://www.thefunfanreporter.com',
            'https://merit-score-frontend-223594773840.us-central1.run.app'
        ],
        credentials: true
    }));   // Enable Cross-Origin Resource Sharing
    app.use(morgan('dev')); // Logger
    app.use(express.json()); // Parse JSON bodies

    // 2. Health Check (The Heartbeat)
    app.get('/health', (req, res) => {
        const engineName = dbRepository.name || 'UNKNOWN';
        res.json({
            status: 'UP',
            timestamp: new Date().toISOString(),
            engine: engineName,
            mode: process.env.DATABASE_MODE || 'DEFAULT'
        });
    });

    // 3. Domain Services
    const AuthService = require('../../domain/AuthService');
    const ChatService = require('../../domain/ChatService'); // Import ChatService

    const authService = new AuthService(dbRepository);
    const chatService = new ChatService(dbRepository);      // Instantiate ChatService

    // 4. API Routes
    const authRoutes = require('./authRoutes')(authService);
    const chatRoutes = require('./chatRoutes')(chatService); // Import ChatRoutes

    app.use('/auth', authRoutes);
    app.use('/chat', chatRoutes);                            // Mount ChatRoutes

    app.get('/', (req, res) => {
        res.send('The Fun Fan Reporter Hub is Active 🐝');
    });

    return app;
}

module.exports = createServer;
