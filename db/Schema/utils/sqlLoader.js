const fs = require("fs");
const path = require("path");

function loadSQL(fileName) {
  const filePath = path.join(__dirname, "../inserts", fileName);

  return fs.readFileSync(filePath, "utf8");
}

module.exports = loadSQL;