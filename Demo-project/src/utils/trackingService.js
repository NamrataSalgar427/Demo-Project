/**
 * Generate a unique tracking ID
 * Format: TRK-YYYYMMDD-XXXXXXXX
 */
export const generateTrackingId = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const random = Math.random()
    .toString(36)
    .substring(2, 10)
    .toUpperCase();

  return `TRK-${year}${month}${day}-${random}`;
};

/**
 * Store student registration data locally
 */
export const saveRegistration = (trackingId, formData) => {
  const registrations =
    JSON.parse(
      localStorage.getItem("student_registrations") || "{}"
    ) || {};

  registrations[trackingId] = {
    ...formData,
    registeredAt: new Date().toISOString(),
    status: "registered",
  };

  localStorage.setItem(
    "student_registrations",
    JSON.stringify(registrations)
  );
};

/**
 * Get student registration data by tracking ID
 */
export const getRegistration = (trackingId) => {
  const registrations =
    JSON.parse(
      localStorage.getItem("student_registrations") || "{}"
    ) || {};

  return registrations[trackingId] || null;
};

/**
 * Update student application data
 */
export const updateRegistration = (
  trackingId,
  updates
) => {
  const registrations =
    JSON.parse(
      localStorage.getItem("student_registrations") || "{}"
    ) || {};

  if (registrations[trackingId]) {
    registrations[trackingId] = {
      ...registrations[trackingId],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    localStorage.setItem(
      "student_registrations",
      JSON.stringify(registrations)
    );
  }
};
