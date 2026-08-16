/**
 * Centralized API Service
 * Handles all API calls to the backend with proper authentication and error handling
 */

import config from "../config";

const API_BASE_URL = config.apiBaseUrl;

/**
 * Get authorization headers
 */
const getHeaders = (includeAuth = false) => {
  const headers = {
    "Content-Type": "application/json",
  };

  if (includeAuth) {
    const token = localStorage.getItem("token");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  return headers;
};

/**
 * Handle API response
 */
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const error = new Error(
      errorData.message || `HTTP Error: ${response.status}`
    );
    error.status = response.status;
    error.data = errorData;
    throw error;
  }

  return response.json().catch(() => ({}));
};

/**
 * Make API request
 */
const apiCall = async (
  endpoint,
  options = {},
  requiresAuth = false
) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = getHeaders(requiresAuth);

  const config = {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    return await handleResponse(response);
  } catch (error) {
    console.error(`API Error: ${endpoint}`, error);
    throw error;
  }
};

/**
 * ==========================================
 * PUBLIC APIS (No Authentication Required)
 * ==========================================
 */

export const studentAPIs = {
  /**
   * Get event details by tracking slug
   * GET /api/public/events/:trackingSlug
   */
  getEventBySlug: async (trackingSlug) => {
    return apiCall(`/api/public/events/${trackingSlug}`);
  },

  /**
   * Register student for event
   * POST /api/public/register
   */
  register: async (registrationData) => {
    return apiCall("/api/public/register", {
      method: "POST",
      body: JSON.stringify(registrationData),
    });
  },

  /**
   * Get application by tracking ID
   * GET /api/public/application/:trackingId
   */
  getApplication: async (trackingId) => {
    return apiCall(
      `/api/public/application/${trackingId}`
    );
  },

  /**
   * Start application
   * PATCH /api/public/application/:trackingId/start
   */
  startApplication: async (trackingId) => {
    return apiCall(
      `/api/public/application/${trackingId}/start`,
      {
        method: "PATCH",
      }
    );
  },

  /**
   * Complete application
   * PATCH /api/public/application/:trackingId/complete
   */
  completeApplication: async (
    trackingId,
    applicationData
  ) => {
    return apiCall(
      `/api/public/application/${trackingId}/complete`,
      {
        method: "PATCH",
        body: JSON.stringify(applicationData),
      }
    );
  },

  /**
   * Get registration status history
   * GET /api/registrations/:registrationId/status-history
   */
  getStatusHistory: async (registrationId) => {
    return apiCall(
      `/api/registrations/${registrationId}/status-history`
    );
  },
};

/**
 * ==========================================
 * AUTHENTICATION APIS
 * ==========================================
 */

export const authAPIs = {
  /**
   * Admin login
   * POST /api/auth/login
   */
  login: async (email, password) => {
    return apiCall("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },

  /**
   * Admin signup
   * POST /api/auth/signup
   */
  signup: async (signupData) => {
    return apiCall("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(signupData),
    });
  },

  /**
   * Logout
   */
  logout: () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated: () => {
    return Boolean(
      localStorage.getItem("token")
    );
  },
};

/**
 * ==========================================
 * ADMIN APIS (Requires Authentication)
 * ==========================================
 */

export const adminAPIs = {
  /**
   * Get dashboard overview
   * GET /api/dashboard/overview
   */
  getDashboardOverview: async () => {
    return apiCall(
      "/api/dashboard/overview",
      {},
      true
    );
  },

  /**
   * Create event
   * POST /api/events
   */
  createEvent: async (eventData) => {
    return apiCall(
      "/api/events",
      {
        method: "POST",
        body: JSON.stringify(eventData),
      },
      true
    );
  },

  /**
   * Get all events
   * GET /api/events
   */
  getEvents: async (filters = {}) => {
    const queryParams = new URLSearchParams(
      filters
    ).toString();
    const endpoint =
      `/api/events${queryParams ? `?${queryParams}` : ""}`;
    return apiCall(endpoint, {}, true);
  },

  /**
   * Get event details
   * GET /api/events/:eventId
   */
  getEventDetails: async (eventId) => {
    return apiCall(
      `/api/events/${eventId}`,
      {},
      true
    );
  },

  /**
   * Get event analytics
   * GET /api/events/:eventId/analytics
   */
  getEventAnalytics: async (eventId) => {
    return apiCall(
      `/api/events/${eventId}/analytics`,
      {},
      true
    );
  },

  /**
   * Export event data
   * GET /api/events/:eventId/export
   */
  exportEvent: async (eventId, format = "csv") => {
    return apiCall(
      `/api/events/${eventId}/export?format=${format}`,
      {},
      true
    );
  },

  /**
   * Get leads with filters
   * GET /api/leads?event=&college=&year=&status=&search=
   */
  getLeads: async (filters = {}) => {
    const queryParams = new URLSearchParams(
      filters
    ).toString();
    const endpoint =
      `/api/leads${queryParams ? `?${queryParams}` : ""}`;
    return apiCall(endpoint, {}, true);
  },

  /**
   * Get lead details
   * GET /api/leads/:trackingId
   */
  getLeadDetails: async (trackingId) => {
    return apiCall(
      `/api/leads/${trackingId}`,
      {},
      true
    );
  },

  /**
   * Export leads
   * GET /api/leads/export?...
   */
  exportLeads: async (filters = {}) => {
    const queryParams = new URLSearchParams({
      format: "csv",
      ...filters,
    }).toString();
    return apiCall(
      `/api/leads/export?${queryParams}`,
      {},
      true
    );
  },
};

/**
 * Export default API object with all categories
 */
export default {
  studentAPIs,
  authAPIs,
  adminAPIs,
};
