/**
 * Core HTTP client utility and domain API services wrapper.
 * Centralizes request dispatch, bearer token injection, and global error handling.
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

async function request(endpoint, options = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  const token = typeof window !== "undefined" ? localStorage.getItem("stylehub_token") : null;
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const jsonResponse = await response.json();

    if (!response.ok) {
      throw new Error(jsonResponse.message || "Network error or server fault encountered.");
    }

    return jsonResponse;
  } catch (error) {
    console.error(`API Client Error [${endpoint}]:`, error.message);
    throw error;
  }
}

export const api = {
  get: (endpoint, options) => request(endpoint, { ...options, method: "GET" }),
  post: (endpoint, body, options) => request(endpoint, { ...options, method: "POST", body: JSON.stringify(body) }),
  put: (endpoint, body, options) => request(endpoint, { ...options, method: "PUT", body: JSON.stringify(body) }),
  delete: (endpoint, options) => request(endpoint, { ...options, method: "DELETE" }),
};

export const userService = {
  getProfile: async (userId) => {
    const res = await api.get(`/users/${userId}`);
    return res.data;
  },
  updateProfile: async (userId, payload) => {
    const res = await api.put(`/users/profile/${userId}`, payload);
    return res.data;
  },
  getAllUsers: async () => {
    const res = await api.get("/users");
    return res.data;
  }
};

export const serviceApi = {
  getAllServices: async () => {
    const res = await api.get("/services");
    return res.data;
  },
  createService: async (payload) => {
    const res = await api.post("/services", payload);
    return res.data;
  },
  updateService: async (id, payload) => {
    const res = await api.put(`/services/${id}`, payload);
    return res.data;
  }
};

export const appointmentApi = {
  getAllAppointments: async () => {
    const res = await api.get("/appointments");
    return res.data;
  },
  getClientAppointments: async (clientId) => {
    const res = await api.get(`/appointments/client/${clientId}`);
    return res.data;
  },
  createAppointment: async (payload) => {
    const res = await api.post("/appointments", payload);
    return res.data;
  },
  cancelAppointment: async (appointmentId) => {
    const res = await api.delete(`/appointments/${appointmentId}`);
    return res.data;
  },
  // أضف هذه الدالة لتحديث حالة الموعد (مثل تحويله إلى DONE)
  updateStatus: async (appointmentId, status) => {
    const res = await api.put(`/appointments/${appointmentId}/status?status=${status}`);
    return res.data;
  },

  // ... الدوال السابقة ...
  resetDayQueue: async () => {
    const res = await api.delete("/appointments/reset-day");
    return res.data;
  }

};