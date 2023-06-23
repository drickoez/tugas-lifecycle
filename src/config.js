const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  newsApiKey: process.env.API_KEY,
};
