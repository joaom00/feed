const API_URL = 'http://localhost:3000/api';

export const api = {
  get: async <T>(url: string, init?: Omit<RequestInit, 'body'>) => {
    const response = await fetch(`${API_URL}${url}`, init);
    const data = await response.json();
    return data as T;
  },
  post: async <T>(url: string, body?: Record<string, unknown>, init?: Omit<RequestInit, 'body'>) => {
    const response = await fetch(`${API_URL}${url}`, {
      ...init,
      method: 'POST',
      body: JSON.stringify(body)
    });
    const data = await response.json();
    return data as T;
  },
  put: async <T>(url: string, body?: Record<string, unknown>, init?: Omit<RequestInit, 'body'>) => {
    const response = await fetch(`${API_URL}${url}`, {
      ...init,
      method: 'PUT',
      body: JSON.stringify(body)
    });
    const data = await response.json();
    return data as T;
  }
};
