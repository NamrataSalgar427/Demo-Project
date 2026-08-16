const applicationModel = require("../models/application.model");
const registrationModel = require("../models/registration.model");
const statusHistoryModel = require("../models/statusHistory.model");

async function startApplication(trackingId) {
  const registration =
    await registrationModel.getRegistrationByTrackingId(
      trackingId
    );

  if (!registration) {
    throw new Error("Registration not found");
  }

  const oldStatus =
    registration.status || "registered";

  const application =
    await applicationModel.startApplication(
      registration.id
    );

  await statusHistoryModel.createStatusHistory({
    registrationId: registration.id,
    oldStatus,
    newStatus: "started",
  });

  return application;
}

async function completeApplication(trackingId) {
  const registration =
    await registrationModel.getRegistrationByTrackingId(
      trackingId
    );

  if (!registration) {
    throw new Error("Registration not found");
  }

  const application =
    await applicationModel.completeApplication(
      registration.id
    );

  await statusHistoryModel.createStatusHistory({
    registrationId: registration.id,
    oldStatus: "started",
    newStatus: "completed",
  });

  return application;
}

module.exports = {
  startApplication,
  completeApplication,
};