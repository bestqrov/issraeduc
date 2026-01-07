import { getAccessToken } from '@/store/useAuthStore';

const getBaseUrl = () => {
    return '/api';
};

const API_BASE_URL = getBaseUrl();

const getAuthHeaders = () => {
    const token = getAccessToken();
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
};

export const transactionsApi = {
    async getAll() {
        const response = await fetch(`${API_BASE_URL}/transactions`, {
            headers: getAuthHeaders()
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    },

    async getStats() {
        const response = await fetch(`${API_BASE_URL}/transactions/stats`, {
            headers: getAuthHeaders()
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    },

    async create(data: {
        type: 'INCOME' | 'EXPENSE';
        amount: number;
        category: string;
        description?: string;
        date?: string;
    }) {
        const response = await fetch(`${API_BASE_URL}/transactions`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    },

    async delete(id: string) {
        const response = await fetch(`${API_BASE_URL}/transactions/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    }
};
