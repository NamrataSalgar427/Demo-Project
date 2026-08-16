// utils/validators.js
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const validateRegistration = ({ name, email, trackingSlug }) => {
  const errors = [];
  if (!name || name.trim().length < 2) errors.push('Valid name is required');
  if (!email || !isValidEmail(email)) errors.push('Valid email is required');
  if (!trackingSlug) errors.push('trackingSlug is required');
  return errors;
};

module.exports = { isValidEmail, validateRegistration };