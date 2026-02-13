const RepositoryFactory = require('../../../../core/database/index');

class NetworkService {
    constructor() {
        this.db = RepositoryFactory.getInstance();
    }

    /**
     * Retrieves a user profile by handle
     */
    async getProfile(handle) {
        try {
            const user = await this.db.getUser(handle);
            if (!user) {
                // Return a mock/placeholder if not found for V7 Bridge smooth UX
                // or throw 404. Let's return null to let controller handle 404.
                return null;
            }
            return user;
        } catch (err) {
            console.error("NetworkService getProfile Error:", err);
            throw err;
        }
    }

    /**
     * Toggles follow status
     */
    async toggleFollow(followerId, targetId) {
        if (!followerId || !targetId) throw new Error("Missing IDs");
        if (followerId === targetId) throw new Error("Cannot follow self");

        try {
            const isFollowing = await this.db.toggleFollow(followerId, targetId);
            return {
                followerId,
                targetId,
                isFollowing
            };
        } catch (err) {
            console.error("NetworkService toggleFollow Error:", err);
            throw err;
        }
    }
}

module.exports = new NetworkService();
