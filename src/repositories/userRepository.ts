import { apiClient, ApiClient } from '@src/services/api/client';
import { User, ApiResponse } from '@src/types/api';

export class UserRepository {
  constructor(private apiClient: ApiClient = apiClient) {}

  async getUser(id: string): Promise<User> {
    return this.apiClient.get<User>(`/users/${id}`);
  }

  async getUsers(page: number = 1, pageSize: number = 10): Promise<User[]> {
    return this.apiClient.get<User[]>(
      `/users?page=${page}&pageSize=${pageSize}`
    );
  }

  async createUser(
    data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<User> {
    return this.apiClient.post<User>('/users', data);
  }

  async updateUser(id: string, data: Partial<User>): Promise<User> {
    return this.apiClient.put<User>(`/users/${id}`, data);
  }

  async deleteUser(id: string): Promise<void> {
    await this.apiClient.delete(`/users/${id}`);
  }

  async searchUsers(query: string): Promise<User[]> {
    return this.apiClient.get<User[]>(`/users/search?q=${query}`);
  }
}

// Singleton instance
export const userRepository = new UserRepository();
