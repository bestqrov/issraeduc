import api from '../api';
import type { ApiResponse } from '@/types';

export interface Parent {
    id: string;
    name: string;
    phone: string;
    email?: string;
    whatsapp?: string;
    address?: string;
    cin?: string;
    students?: any[];
    createdAt: string;
    updatedAt: string;
}

export async function getParents(): Promise<Parent[]> {
    const response = await api.get<ApiResponse<Parent[]>>('/parents');
    return response.data.data;
}

export async function getParentById(id: string): Promise<Parent> {
    const response = await api.get<ApiResponse<Parent>>(`/parents/${id}`);
    return response.data.data;
}

export async function createParent(data: Partial<Parent>): Promise<Parent> {
    const response = await api.post<ApiResponse<Parent>>('/parents', data);
    return response.data.data;
}

export async function updateParent(id: string, data: Partial<Parent>): Promise<Parent> {
    const response = await api.put<ApiResponse<Parent>>(`/parents/${id}`, data);
    return response.data.data;
}

export async function deleteParent(id: string): Promise<void> {
    await api.delete(`/parents/${id}`);
}
