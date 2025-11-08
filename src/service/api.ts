import type { Student } from '../types/student';

const API_URL = import.meta.env.VITE_API_URL || 'https://690a98ca1a446bb9cc2304ea.mockapi.io/studentManagement';

export const api = {
  getAll: async (): Promise<Student[]> => {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Failed to fetch students');
    return response.json();
  },

  getById: async (id: string): Promise<Student> => {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error('Failed to fetch student');
    return response.json();
  },

  create: async (student: Omit<Student, 'id'>): Promise<Student> => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(student)
    });
    if (!response.ok) throw new Error('Failed to create student');
    return response.json();
  },

  update: async (id: string, student: Partial<Student>): Promise<Student> => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(student)
    });
    if (!response.ok) throw new Error('Failed to update student');
    return response.json();
  },

  delete: async (id: string): Promise<void> => {
    const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Failed to delete student');
  }
};