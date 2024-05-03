const convict = require("convict");
convict.addFormat(require("convict-format-with-validator").ipaddress);
require("dotenv").config();

// Define a schema
var config = convict({
  env: {
    doc: "The application environment.",
    format: ["production", "development", "test"],
    default: "development",
    env: "NODE_ENV",
  },
  port: {
    doc: "The port to bind.",
    format: "port",
    default: 8080,
    env: "PORT",
    arg: "port",
  },
  db: {
    host: {
      doc: "Database host name/IP",
      format: String,
      default: "127.0.0.1",
      env: "DB_HOST",
    },
    name: {
      doc: "Database name",
      format: String,
      default: "database_development",
      env: "DB_NAME",
    },
    username: {
      doc: "db user",
      format: String,
      default: "root",
      env: "DB_USER",
    },
    password: {
      doc: "db password",
      format: "*",
      default: null,
      env: "DB_PASS",
    },
    port: {
      doc: "db port",
      format: String,
      default: "3306",
      env: "DB_PORT",
    },
  },
  signIn: {
    jwtSecret: {
      doc: "The secret for jwt",
      format: String,
      default: "",
      env: "JWT_SECRET",
      arg: "secret",
    },
  },
});

// Perform validation
config.validate({ allowed: "strict" });
module.exports = config;
