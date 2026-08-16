import api from "./api";

const studentService = {

  // =========================================
  // PUBLIC EVENT
  // =========================================

  getEventByTrackingSlug: async (
    trackingSlug
  ) => {
    return await api(
      `/api/public/events/${trackingSlug}`
    );
  },

  // =========================================
  // REGISTRATION
  // =========================================

  registerStudent: async (
    registrationData
  ) => {
    return await api(
      "/api/public/register",
      {
        method: "POST",

        body: JSON.stringify(
          registrationData
        ),
      }
    );
  },

  // =========================================
  // APPLICATION
  // =========================================

  getApplication: async (
    trackingId
  ) => {
    return await api(
      `/api/public/application/${trackingId}`
    );
  },

  // Start application
  startApplication: async (
    trackingId
  ) => {
    return await api(
      `/api/public/application/${trackingId}/start`,
      {
        method: "PATCH",
      }
    );
  },

  // Complete application
  completeApplication: async (
    trackingId,
    applicationData
  ) => {
    return await api(
      `/api/public/application/${trackingId}/complete`,
      {
        method: "PATCH",

        body: JSON.stringify(
          applicationData
        ),
      }
    );
  },
};

export default studentService;