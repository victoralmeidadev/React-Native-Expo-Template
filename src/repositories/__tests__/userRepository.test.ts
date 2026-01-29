import { UserRepository } from '@src/repositories/userRepository';
import { apiClient } from '@src/services/api/client';

jest.mock('@src/services/api/client');

describe('UserRepository', () => {
  let repository: UserRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    repository = new UserRepository(apiClient);
  });

  describe('getUser', () => {
    it('should fetch a single user', async () => {
      const mockUser = {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
      };

      (apiClient.get as jest.Mock).mockResolvedValue(mockUser);

      const result = await repository.getUser('1');

      expect(apiClient.get).toHaveBeenCalledWith('/users/1');
      expect(result).toEqual(mockUser);
    });

    it('should handle errors when fetching user', async () => {
      const error = new Error('Not found');
      (apiClient.get as jest.Mock).mockRejectedValue(error);

      await expect(repository.getUser('1')).rejects.toThrow('Not found');
    });
  });

  describe('getUsers', () => {
    it('should fetch multiple users with pagination', async () => {
      const mockUsers = [
        { id: '1', name: 'User 1', email: 'user1@example.com' },
        { id: '2', name: 'User 2', email: 'user2@example.com' },
      ];

      (apiClient.get as jest.Mock).mockResolvedValue(mockUsers);

      const result = await repository.getUsers(1, 10);

      expect(apiClient.get).toHaveBeenCalledWith('/users?page=1&pageSize=10');
      expect(result).toEqual(mockUsers);
    });
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const newUserData = {
        name: 'New User',
        email: 'newuser@example.com',
      };
      const mockResponse = {
        id: '3',
        ...newUserData,
      };

      (apiClient.post as jest.Mock).mockResolvedValue(mockResponse);

      const result = await repository.createUser(newUserData);

      expect(apiClient.post).toHaveBeenCalledWith('/users', newUserData);
      expect(result).toEqual(mockResponse);
    });
  });
});
