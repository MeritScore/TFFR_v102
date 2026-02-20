import { API_BASE_URL, ENDPOINTS } from './config';
import { Message, User } from '../types';

export const chatClient = {
    getMessages: async (channelId?: string): Promise<Message[]> => {
        try {
            const id = channelId || 'GLOBAL';
            const url = `${API_BASE_URL}${ENDPOINTS.CHAT_MESSAGES}/${id}`;

            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Error fetching messages: ${response.statusText}`);
            }
            const data = await response.json();

            // Convert timestamp strings back to Date objects
            return data.map((msg: any) => ({
                ...msg,
                timestamp: new Date(msg.timestamp)
            }));
        } catch (error) {
            console.error('Failed to fetch messages:', error);
            return [];
        }
    },

    postMessage: async (text: string, sender: User, channelId?: string): Promise<Message | null> => {
        try {
            const payload = {
                text,
                sender,
                timestamp: new Date(),
                channelId
            };

            const response = await fetch(`${API_BASE_URL}${ENDPOINTS.CHAT_MESSAGES}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`Error posting message: ${response.statusText}`);
            }

            const data = await response.json();
            return {
                ...data,
                timestamp: new Date(data.timestamp)
            };
        } catch (error) {
            console.error('Failed to post message:', error);
            return null;
        }
    }
};
