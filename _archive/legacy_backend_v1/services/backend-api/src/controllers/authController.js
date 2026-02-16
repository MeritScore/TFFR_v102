const authController = {
    login: async (req, res) => {
        try {
            const { handle, secret } = req.body;

            // For hackathon/v1, we use a simple secret check or allow any login if we are in "Simulation Mode"
            // In the "Iron Vault", we check against the DB.

            // 1. Try to find user
            let user = await req.db.getUser(handle);

            if (!user) {
                // AUTO-PROVISIONING for Hackathon Speed
                // If user doesn't exist, create them with valid secret
                // Basic secret validation: must start with "TFFR"

                if (secret && secret.startsWith("TFFR")) {
                    user = await req.db.createUser({ username: handle, role: 'FAN' });
                } else {
                    return res.status(401).json({ error: "Invalid Secret Code" });
                }
            }

            // 2. Return User Context
            res.json({
                user: {
                    id: user.id,
                    username: user.username,
                    role: user.role,
                    meritScore: user.meritScore
                },
                token: "mock-jwt-token-for-phase-1"
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
};

module.exports = authController;
