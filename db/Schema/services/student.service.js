const studentModel = require("../models/student.model");

/**
 * Create a new student or update an existing student
 * with the same email.
 */
async function createOrUpdateStudent(data) {
  if (!data.name || !data.email) {
    throw new Error("Name and email are required");
  }

  const student = await studentModel.createOrUpdateStudent({
    name: data.name,
    email: data.email,
    phone: data.phone || null,
    college: data.college || null,
    year: data.year || null,
    fieldOfStudy: data.fieldOfStudy || null,
  });

  return student;
}


/**
 * Get a student by ID.
 */
async function getStudentById(studentId) {
  if (!studentId) {
    throw new Error("Student ID is required");
  }

  const student = await studentModel.getStudentById(studentId);

  if (!student) {
    throw new Error("Student not found");
  }

  return student;
}


/**
 * Get a student by email.
 */
async function getStudentByEmail(email) {
  if (!email) {
    throw new Error("Email is required");
  }

  const student = await studentModel.getStudentByEmail(email);

  if (!student) {
    throw new Error("Student not found");
  }

  return student;
}


module.exports = {
  createOrUpdateStudent,
  getStudentById,
  getStudentByEmail,
};