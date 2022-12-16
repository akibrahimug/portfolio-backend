"use strict";

// load modules
const express = require("express");
const { sequelize } = require("./models");
const routes = require("./routes/routes");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const picRoutes = require("./routes/picRoutes");
const logger = require("morgan");
const passport = require("passport");
const session = require("express-session");

// variable to enable global error logging
const enableGlobalErrorLogging =
  process.env.ENABLE_GLOBAL_ERROR_LOGGING === "true";

// create the Express app
const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
app.use(session({ secret: "cess and Ezra" }));
app.use("/pictures", picRoutes);
app.use("/api", routes);

app.use(passport.initialize());
app.use(passport.session());

// root route
// get time
const time = new Date().toLocaleTimeString();
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to my REST API @ " + time,
  });
});

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: "Route Not Found",
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

// set our port
app.set("port", process.env.DB_PORT || 8080);

// Test the database connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
  await sequelize.sync({ force: false });
})();

// start listening on our port
const server = app.listen(app.get("port"), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});
