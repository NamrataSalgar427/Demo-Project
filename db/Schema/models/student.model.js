const pool = require("../config/db");
const loadSQL = require("../utils/sqlLoader");

const insertStudentQuery = loadSQL("insert_student.sql");

async function createOrUpdateStudent({
  name,
  email,
  phone,
  college,
  year,
  fieldOfStudy,
}) {
  const result = await pool.query(insertStudentQuery, [
    name,
    email,
    phone,
    college,
    year,
    fieldOfStudy,
  ]);

  return result.rows[0];
}

async function getStudentById(studentId) {
  const result = await pool.query(
    `
    SELECT
      id,
      name,
      email,
      phone,
      college,
      year,
      field_of_study,
      created_at
    FROM students
    WHERE id = $1
    `,
    [studentId]
  );

  return result.rows[0] || null;
}

async function getStudentByEmail(email) {
  const result = await pool.query(
    `
    SELECT
      id,
      name,
      email,
      phone,
      college,
      year,
      field_of_study,
      created_at
    FROM students
    WHERE email = $1
    `,
    [email]
  );

  return result.rows[0] || null;
}

module.exports = {
  createOrUpdateStudent,
  getStudentById,
  getStudentByEmail,
};