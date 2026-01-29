import { AxiosError } from 'axios';

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

export class ApiErrorClass extends Error {
  constructor(
    public statusCode: number,
    public originalError: AxiosError,
    message: string
  ) {
    super(message);
    this.name = 'ApiError';
    Object.setPrototypeOf(this, ApiErrorClass.prototype);
  }
}

export class NetworkErrorClass extends Error {
  constructor(message: string = 'Network error') {
    super(message);
    this.name = 'NetworkError';
    Object.setPrototypeOf(this, NetworkErrorClass.prototype);
  }
}
