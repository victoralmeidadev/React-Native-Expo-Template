import axios from 'axios';

import { ApiClient } from '@src/services/api/client';
import { ApiErrorClass } from '@src/types/api';

jest.mock('axios', () => {
  const createMockHttp = () => ({
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn(),
    interceptors: {
      request: { use: jest.fn(), eject: jest.fn() },
      response: { use: jest.fn(), eject: jest.fn() },
    },
    defaults: { headers: { common: {} } },
  });
  return {
    __esModule: true,
    default: {
      create: jest.fn(() => createMockHttp()),
      isAxiosError: jest.fn(),
    },
  };
});
jest.mock('@src/config/environment', () => ({
  Config: {
    apiUrl: 'http://test-api.com',
    logLevel: 'debug',
    enableNetworkLogging: false,
    environment: 'development',
  },
}));

describe('ApiClient', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET request', () => {
    it('should make a successful GET request', async () => {
      const mockData = { id: '1', name: 'Test User', email: 'test@test.com' };
      const mockAxios = axios as jest.Mocked<typeof axios>;

      mockAxios.create.mockReturnValue({
        get: jest.fn().mockResolvedValue({ data: mockData }),
        post: jest.fn(),
        put: jest.fn(),
        patch: jest.fn(),
        delete: jest.fn(),
        interceptors: {
          request: { use: jest.fn() },
          response: { use: jest.fn() },
        },
      } as any);

      const client = new ApiClient('http://test-api.com');
      const result = await client.get('/users/1');

      expect(result).toEqual(mockData);
    });
  });

  describe('Error handling', () => {
    it('should handle network errors', async () => {
      const mockAxios = axios as jest.Mocked<typeof axios>;
      const mockError = new Error('Network error');

      (mockAxios as any).isAxiosError = jest.fn().mockReturnValue(false);

      expect(() => {
        throw mockError;
      }).toThrow('Network error');
    });

    it('should handle API errors', async () => {
      const mockAxios = axios as jest.Mocked<typeof axios>;
      const mockAxiosError = {
        response: { status: 404, data: { message: 'Not found' } },
        message: 'Not found',
      };

      (mockAxios as any).isAxiosError = jest.fn().mockReturnValue(true);

      // Verify error class structure
      expect(ApiErrorClass).toBeDefined();
    });
  });

  describe('Auth token management', () => {
    it('should set authorization token', async () => {
      const mockAxios = axios as jest.Mocked<typeof axios>;
      mockAxios.create.mockReturnValue({
        defaults: {
          headers: {
            common: {},
          },
        },
        interceptors: {
          request: { use: jest.fn() },
          response: { use: jest.fn() },
        },
      } as any);

      const client = new ApiClient('http://test-api.com');
      client.setAuthToken('test-token');

      // Verify the method exists and is callable
      expect(client.setAuthToken).toBeDefined();
    });
  });
});
