const generateTrackingId = () => {
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `KAT-${random}`;
};

module.exports = generateTrackingId;