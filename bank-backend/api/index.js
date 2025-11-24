require("dotenv").config();
const serverless = require("serverless-http");
const app = require("../app");
const connectDB = require("../config/db");

const MONGODB_URI = process.env.MONGODB_URI;
connectDB(MONGODB_URI);

module.exports.handler = serverless(app);
