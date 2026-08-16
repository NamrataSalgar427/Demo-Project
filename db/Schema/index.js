const pool = require("./config/db");

const adminModel = require("./models/admin.model");
const eventModel = require("./models/event.model");
const studentModel = require("./models/student.model");
const registrationModel = require("./models/registration.model");
const applicationModel = require("./models/application.model");
const statusHistoryModel =
  require("./models/statusHistory.model");

const adminService =
  require("./services/admin.service");

const eventService =
  require("./services/event.service");

const registrationService =
  require("./services/registration.service");

const applicationService =
  require("./services/application.service");

const statusHistoryService =
  require("./services/statusHistory.service");

module.exports = {
  pool,

  models: {
    admin: adminModel,
    event: eventModel,
    student: studentModel,
    registration: registrationModel,
    application: applicationModel,
    statusHistory: statusHistoryModel,
  },

  services: {
    admin: adminService,
    event: eventService,
    registration: registrationService,
    application: applicationService,
    statusHistory: statusHistoryService,
  },
};