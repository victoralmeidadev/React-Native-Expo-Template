import { ApiErrorClass, NetworkErrorClass } from '@src/types/api';

export function formatError(error: Error | null): string {
  if (!error) {
    return '';
  }

  if (error instanceof NetworkErrorClass) {
    return 'Unable to connect. Please check your internet connection.';
  }

  if (error instanceof ApiErrorClass) {
    if (error.statusCode === 401) {
      return 'Unauthorized. Please log in again.';
    }
    if (error.statusCode === 403) {
      return 'You do not have permission to access this resource.';
    }
    if (error.statusCode === 404) {
      return 'Resource not found.';
    }
    if (error.statusCode >= 500) {
      return 'Server error. Please try again later.';
    }
    return error.message;
  }

  return error.message || 'An unexpected error occurred';
}

export function isNetworkError(error: Error | null): boolean {
  return error instanceof NetworkErrorClass;
}

export function isApiError(error: Error | null): boolean {
  return error instanceof ApiErrorClass;
}

export function getApiErrorStatus(error: Error | null): number | null {
  if (error instanceof ApiErrorClass) {
    return error.statusCode;
  }
  return null;
}
