function generateEventCode(college) {
  const year = new Date().getFullYear();

  const collegeCode = college
    .replace(/[^a-zA-Z]/g, "")
    .substring(0, 3)
    .toUpperCase();

  const randomNumber = Math.floor(
    10 + Math.random() * 90
  );

  return `KAT-${collegeCode}-${year}-${randomNumber}`;
}

module.exports = {
  generateEventCode,
};