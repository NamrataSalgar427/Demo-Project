const eventModel = require("../models/event.model");
const { generateEventCode } = require("../utils/generateEventCode");

async function createEvent(data, adminId) {
  const eventCode = await generateEventCode(
    data.college
  );

  return eventModel.createEvent({
    eventCode,
    name: data.name,
    college: data.college,
    location: data.location,
    eventDate: data.eventDate,
    description: data.description,
    createdBy: adminId,
  });
}

async function getAllEvents() {
  return eventModel.getAllEvents();
}

async function getEventById(eventId) {
  return eventModel.getEventById(eventId);
}

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
};