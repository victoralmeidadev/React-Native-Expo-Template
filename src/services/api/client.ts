import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { Config } from '@src/config/environment';
import { ApiErrorClass, NetworkErrorClass } from '@src/types/api';

export class ApiClient {
  private httpClient: AxiosInstance;

  constructor(baseURL: string = Config.apiUrl) {
    this.httpClient = axios.create({
      baseURL,
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor
    this.httpClient.interceptors.request.use(
      config => {
        if (Config.enableNetworkLogging) {
          console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`);
        }
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.httpClient.interceptors.response.use(
      response => {
        if (Config.enableNetworkLogging) {
          console.log(
            `[API] Response ${response.status} ${response.config.url}`
          );
        }
        return response;
      },
      error => {
        return Promise.reject(this.handleError(error));
      }
    );
  }

  private handleError(error: unknown): Error {
    if (axios.isAxiosError(error)) {
      if (!error.response) {
        return new NetworkErrorClass(
          error.message || 'Failed to connect to the server'
        );
      }

      const status = error.response.status;
      const message =
        (error.response.data as any)?.message || error.message || 'API Error';

      return new ApiErrorClass(status, error, message);
    }

    return error instanceof Error ? error : new Error('Unknown error');
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.httpClient.get<T>(url, config);
    return response.data;
  }

  public async post<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.httpClient.post<T>(url, data, config);
    return response.data;
  }

  public async put<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.httpClient.put<T>(url, data, config);
    return response.data;
  }

  public async patch<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.httpClient.patch<T>(url, data, config);
    return response.data;
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.httpClient.delete<T>(url, config);
    return response.data;
  }

  public setAuthToken(token: string) {
    this.httpClient.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  public clearAuthToken() {
    delete this.httpClient.defaults.headers.common.Authorization;
  }
}

// Singleton instance
export const apiClient = new ApiClient();
