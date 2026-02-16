const API_BASE_URL = 'http://localhost:3001/api';

export const api = {
    // Market
    getGigs: async (type: string = 'ALL') => {
        const response = await fetch(`${API_BASE_URL}/market/gigs?type=${type}`);
        return response.json();
    },
    createGig: async (gigData: any) => {
        const response = await fetch(`${API_BASE_URL}/market/gigs`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(gigData)
        });
        return response.json();
    },

    // Chat
    getMessages: async (channel: string = 'GLOBAL') => {
        const response = await fetch(`${API_BASE_URL}/chat/messages?channel=${channel}`);
        const data = await response.json();
        // Map Backend 'senderId' to Frontend 'sender' object
        return data.map((msg: any) => ({
            ...msg,
            timestamp: new Date(msg.timestamp), // Fix: Convert string to Date
            sender: msg.sender ? msg.sender : {
                id: msg.senderId || 'unknown',
                username: msg.senderId === 'SYSTEM' ? 'SYSTEM' : `User_${msg.senderId.substr(0, 4)}`,
                meritScore: 500,
                avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${msg.senderId}`
            },
            replies: msg.replies?.map((r: any) => ({
                ...r,
                timestamp: new Date(r.timestamp), // Fix: Convert reply timestamps too
                sender: r.sender ? r.sender : { id: 'unknown', username: 'Unknown', meritScore: 0, avatarUrl: '' }
            }))
        }));
    },
    sendMessage: async (messageData: any) => {
        const response = await fetch(`${API_BASE_URL}/chat/messages`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(messageData)
        });
        const msg = await response.json();
        return {
            ...msg,
            sender: {
                id: msg.senderId || 'unknown',
                username: 'You',
                meritScore: 1000,
                avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=You'
            }
        };
    },

    // Network
    getProfile: async (handle: string) => {
        const response = await fetch(`${API_BASE_URL}/network/profile/${handle}`);
        if (!response.ok) return null;
        return response.json();
    },
    follow: async (data: { followerId: string; targetId: string }) => {
        const response = await fetch(`${API_BASE_URL}/network/follow`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return response.json();
    },

    // Wallet
    tip: async (tipData: any) => {
        const response = await fetch(`${API_BASE_URL}/wallet/tip`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(tipData)
        });
        return response.json();
    }
};
