const statusHistoryModel =
  require("../models/statusHistory.model");

async function getStatusHistory(registrationId) {
  return statusHistoryModel.getStatusHistory(
    registrationId
  );
}

module.exports = {
  getStatusHistory,
};