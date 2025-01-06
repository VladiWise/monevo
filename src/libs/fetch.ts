const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
    console.error("NEXT_PUBLIC_API_URL environment variable is not set.");
    throw new Error("NEXT_PUBLIC_API_URL environment variable is not set.");    
}

const handleRequest = async (url: string, options: RequestInit) => {
  const response = await fetch(url, options);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Something went wrong");
  }

  const data = await response.json();
  return data;
};

const api = {
  get: async (endpoint: string, customOptions: RequestInit = {}, url = "") => {
    url = `${API_URL}${endpoint}`;

    // Merge custom options with default options
    const options: RequestInit = {
      method: "GET", // Default method
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
      },
      body: JSON.stringify(body),
    });
  },

  put: async (endpoint: string, body = {}) => {
    const url = `${API_URL}${endpoint}`;
    return handleRequest(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  },

  patch: async (endpoint: string, body = {}) => {
    const url = `${API_URL}${endpoint}`;
    return handleRequest(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  },

  delete: async (endpoint: string) => {
    const url = `${API_URL}${endpoint}`;
    return handleRequest(url, {
      method: "DELETE",
    });
  },
};

export default api;
