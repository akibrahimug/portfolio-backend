const basicAuth = require("basic-auth");
const bcrypt = require("bcryptjs");
const { User } = require("../models");

// A middleware functions to authenticate the request
exports.userAuth = async (req, res, next) => {
  // the message to display
  let message;

  // Parse the user's credentials from the auth header
  const credentials = basicAuth(req);
  // if the credentials are in the database
  if (credentials) {
    // Get the user's data from the database by email
    const user = await User.findOne({
      where: {
        emailAddress: credentials.name,
      },
    });
    // if the user is in the database
    if (user) {
      // compare the password against the hash
      const authenticated = bcrypt.compareSync(credentials.pass, user.password);
      // if the password matche and they belong to the current user
      if (authenticated) {
        console.log(`Authentication successful for ${user.firstName}`);
        // Store the user on the req obj
        req.currentUser = user;
      } else {
        message = `Authentication failed for ${user.emailAddress}`;
      }
    } else {
      message = "Authentication Headers not found";
    }
  }
  if (message) {
    console.warn(message);
    res.status(404).json({ message: "Access Denied" });
  } else {
    next();
  }
};
