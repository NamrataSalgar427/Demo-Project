import api from "./api";

const eventService = {

  // =========================================
  // ADMIN
  // =========================================

  // Get all events
  getEvents: async () => {
    return await api(
      "/api/events"
    );
  },

  // Get one event
  getEventById: async (eventId) => {
    return await api(
      `/api/events/${eventId}`
    );
  },

  // Create event
  createEvent: async (eventData) => {
    return await api(
      "/api/events",
      {
        method: "POST",

        body: JSON.stringify(
          eventData
        ),
      }
    );
  },

  // Get event analytics
  getEventAnalytics: async (
    eventId
  ) => {
    return await api(
      `/api/events/${eventId}/analytics`
    );
  },

  // Export event data
  exportEvent: async (eventId) => {
    return await api(
      `/api/events/${eventId}/export`
    );
  },

  // =========================================
  // PUBLIC
  // =========================================

  // Get event using tracking slug
  getPublicEvent: async (
    trackingSlug
  ) => {
    return await api(
      `/api/public/events/${trackingSlug}`
    );
  },
};

export default eventService;