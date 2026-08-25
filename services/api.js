/**
 * Production-ready API abstraction layer with a unified Mock/Real toggle switch.
 * Allows seamless switching between backend REST endpoints and local mock database entities.
 */

import { mockUsers, mockServices, mockStaffSchedules, mockAppointments, mockSalonSettings } from "../data/mockDatabase";

const USE_MOCK_DATA = true; 

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
    if (USE_MOCK_DATA) {
      const user = mockUsers.find(u => u.id === Number(userId));
      return user || null;
    }
    const res = await api.get(`/users/${userId}`);
    return res.data;
  },
  updateProfile: async (userId, payload) => {
    if (USE_MOCK_DATA) {
      const user = mockUsers.find(u => u.id === Number(userId));
      if (user) Object.assign(user, payload);
      return user;
    }
    const res = await api.put(`/users/profile/${userId}`, payload);
    return res.data;
  },
  getAllUsers: async () => {
    if (USE_MOCK_DATA) {
      return mockUsers;
    }
    const res = await api.get("/users");
    return res.data;
  }
};

export const serviceApi = {
  getAllServices: async () => {
    if (USE_MOCK_DATA) {
      return mockServices;
    }
    const res = await api.get("/services");
    return res.data;
  },
  createService: async (payload) => {
    if (USE_MOCK_DATA) {
      const newSvc = { id: mockServices.length + 1, ...payload };
      mockServices.push(newSvc);
      return newSvc;
    }
    const res = await api.post("/services", payload);
    return res.data;
  },
  updateService: async (id, payload) => {
    if (USE_MOCK_DATA) {
      const svc = mockServices.find(s => s.id === Number(id));
      if (svc) Object.assign(svc, payload);
      return svc;
    }
    const res = await api.put(`/services/${id}`, payload);
    return res.data;
  }
};

export const appointmentApi = {
  getAllAppointments: async () => {
    if (USE_MOCK_DATA) {
      return mockAppointments;
    }
    const res = await api.get("/appointments");
    return res.data;
  },
  getClientAppointments: async (clientId) => {
    if (USE_MOCK_DATA) {
      return mockAppointments.filter(a => Number(a.clientId) === Number(clientId));
    }
    const res = await api.get(`/appointments/client/${clientId}`);
    return res.data;
  },
  createAppointment: async (payload) => {
    if (USE_MOCK_DATA) {
      const newAppt = { id: mockAppointments.length + 1, status: 'PENDING', ...payload };
      mockAppointments.push(newAppt);
      return newAppt;
    }
    const res = await api.post("/appointments", payload);
    return res.data;
  },
  cancelAppointment: async (appointmentId) => {
    if (USE_MOCK_DATA) {
      const appt = mockAppointments.find(a => a.id === Number(appointmentId));
      if (appt) appt.status = 'CANCELLED';
      return appt;
    }
    const res = await api.delete(`/appointments/${appointmentId}`);
    return res.data;
  },
  updateStatus: async (appointmentId, status) => {
    if (USE_MOCK_DATA) {
      const appt = mockAppointments.find(a => a.id === Number(appointmentId));
      if (appt) appt.status = status;
      return appt;
    }
    const res = await api.put(`/appointments/${appointmentId}/status?status=${status}`);
    return res.data;
  },
  resetDayQueue: async () => {
    if (USE_MOCK_DATA) {
      mockAppointments.forEach(a => { if (a.status !== 'CANCELLED') a.status = 'DONE'; });
      return true;
    }
    const res = await api.delete("/appointments/reset-day");
    return res.data;
  }
};

// ============================================================================
// Authentication Services (Mock vs Real) - تمت إضافتها لحل المشكلة
// ============================================================================
export const authService = {
  login: async (credentials) => {
    if (USE_MOCK_DATA) {
      const identifier = credentials.usernameOrEmail;
      const user = mockUsers.find(u => u.username === identifier || u.email === identifier);
      
      if (!user || credentials.password !== "123456") {
        throw new Error("Invalid username or password (Mock)");
      }

      return {
        message: "Login successful (Mock)",
        data: {
          token: "mock-jwt-token-stylehub-999",
          user: {
            id: user.id,
            username: user.username,
            fullName: user.fullName,
            email: user.email,
            role: user.role
          }
        }
      };
    }
    const res = await api.post("/auth/login", credentials);
    return res;
  }
};