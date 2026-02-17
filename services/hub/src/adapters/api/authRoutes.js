/**
 * src/adapters/api/authRoutes.js
 * 
 * ROUTES: Authentication
 * Maps HTTP requests to AuthService methods.
 */

const express = require('express');
const router = express.Router();

module.exports = (authService) => {

    // POST /auth/register
    router.post('/register', async (req, res) => {
        try {
            const { username, password, role } = req.body;
            if (!username || !password) {
                return res.status(400).json({ error: "Username and password are required" });
            }
            const user = await authService.register(username, password, role);
            res.status(201).json({ message: "User created", userId: user.id });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    });

    // POST /auth/login
    router.post('/login', async (req, res) => {
        try {
            const { username, password } = req.body;
            if (!username || !password) {
                return res.status(400).json({ error: "Username and password are required" });
            }
            const result = await authService.login(username, password);
            res.json(result);
        } catch (error) {
            res.status(401).json({ error: error.message });
        }
    });

    // POST /auth/google
    router.post('/google', async (req, res) => {
        try {
            const { idToken } = req.body;
            if (!idToken) {
                return res.status(400).json({ error: "ID Token required" });
            }
            const user = await authService.loginWithGoogle(idToken);
            // Return JWT session token if we want to stick to our own session management, 
            // OR just return the user and let frontend trust Firebase token. 
            // Ideally, we issue our own JWT so we control session duration.
            // For now, let's just return the user object.
            res.json({ user });
        } catch (error) {
            console.error(error);
            res.status(401).json({ error: "Authentication Failed" });
        }
    });

    return router;
};
