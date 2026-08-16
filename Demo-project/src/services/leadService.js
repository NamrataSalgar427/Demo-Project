import api from "./api";

const leadService = {

  // =========================================
  // DASHBOARD
  // =========================================

  getDashboardOverview: async () => {
    return await api(
      "/api/dashboard/overview"
    );
  },

  // =========================================
  // LEADS
  // =========================================

  getLeads: async (filters = {}) => {

    const params =
      new URLSearchParams();

    if (filters.event) {
      params.set(
        "event",
        filters.event
      );
    }

    if (filters.college) {
      params.set(
        "college",
        filters.college
      );
    }

    if (filters.year) {
      params.set(
        "year",
        filters.year
      );
    }

    if (filters.status) {
      params.set(
        "status",
        filters.status
      );
    }

    if (filters.search) {
      params.set(
        "search",
        filters.search
      );
    }

    const queryString =
      params.toString();

    const endpoint = queryString
      ? `/api/leads?${queryString}`
      : "/api/leads";

    return await api(endpoint);
  },

  // Get one lead
  getLeadByTrackingId: async (
    trackingId
  ) => {
    return await api(
      `/api/leads/${trackingId}`
    );
  },

  // Export leads
  exportLeads: async (
    filters = {}
  ) => {

    const params =
      new URLSearchParams();

    if (filters.event) {
      params.set(
        "event",
        filters.event
      );
    }

    if (filters.college) {
      params.set(
        "college",
        filters.college
      );
    }

    if (filters.year) {
      params.set(
        "year",
        filters.year
      );
    }

    if (filters.status) {
      params.set(
        "status",
        filters.status
      );
    }

    if (filters.search) {
      params.set(
        "search",
        filters.search
      );
    }

    const queryString =
      params.toString();

    const endpoint = queryString
      ? `/api/leads/export?${queryString}`
      : "/api/leads/export";

    return await api(endpoint);
  },
};

export default leadService;