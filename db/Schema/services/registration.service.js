const studentModel = require("../models/student.model");
const registrationModel = require("../models/registration.model");
const applicationModel = require("../models/application.model");
const {
  generateTrackingId,
} = require("../utils/generateTrackingId");

async function registerStudent(data) {
  const student = await studentModel.createOrUpdateStudent({
    name: data.name,
    email: data.email,
    phone: data.phone,
    college: data.college,
    year: data.year,
    fieldOfStudy: data.fieldOfStudy,
  });

  const trackingId = generateTrackingId();

  const registration =
    await registrationModel.createRegistration({
      studentId: student.id,
      eventId: data.eventId,
      trackingId,
    });

  const application =
    await applicationModel.createApplication(
      registration.id
    );

  return {
    student,
    registration,
    application,
    trackingId,
  };
}

async function getByTrackingId(trackingId) {
  return registrationModel.getRegistrationByTrackingId(
    trackingId
  );
}

module.exports = {
  registerStudent,
  getByTrackingId,
};