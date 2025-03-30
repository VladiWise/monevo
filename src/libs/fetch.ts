const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY

import { getErrorMessage } from "@/utils/getErrorMessage";

if (!API_URL) {
  console.error("NEXT_PUBLIC_API_URL environment variable is not set.");
  throw new Error("NEXT_PUBLIC_API_URL environment variable is not set.");
}

if (!API_KEY) {
  console.error("NEXT_PUBLIC_API_KEY environment variable is not set.");
  throw new Error("NEXT_PUBLIC_API_KEY environment variable is not set.");
}

const handleRequest = async (url: string, options: RequestInit) => {
  "use server";
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Something went wrong")
    }

    const data = await response.json();
    return data;

  } catch (error) {
    throw new Error(getErrorMessage(error));
  }

};

const api = {
  get: async (endpoint: string, customOptions: RequestInit = {}, url = "") => {
    url = `${API_URL}${endpoint}`;
    // Merge custom options with default options
    const options: RequestInit = {
      method: "GET", // Default method
      headers: {
        "x-api-key": API_KEY,
      },

      cache: "force-cache",
      ...customOptions, // Custom options override defaults
    };

    return handleRequest(url, options);
  },

  post: async (endpoint: string, body = {}) => {
    const url = `${API_URL}${endpoint}`;
    return handleRequest(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
      },
      body: JSON.stringify(body),
    });
  },

  put: async (endpoint: string, customOptions: RequestInit = {}, body = {}) => {
    const url = `${API_URL}${endpoint}`;
    return handleRequest(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
      },
      body: JSON.stringify(body),
      ...customOptions,
    });
  },

  patch: async (endpoint: string, body = {}) => {
    const url = `${API_URL}${endpoint}`;
    return handleRequest(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
      },
      body: JSON.stringify(body),
    });
  },

  delete: async (endpoint: string) => {
    const url = `${API_URL}${endpoint}`;
    return handleRequest(url, {
      method: "DELETE",
      headers: {
        "x-api-key": API_KEY,
      },
    });
  },
};

export default api;
