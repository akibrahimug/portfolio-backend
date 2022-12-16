const express = require("express");
const router = express.Router();
const { Storage } = require("@google-cloud/storage");
const Multer = require("multer");
// const GoogleStrategy = require("passport-google-token").Strategy;
// const passport = require("passport");
// const { User } = require("../models");
// const AuthControler = require("../middleware/googleOauthHandler");

require("dotenv").config();

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
  },
});

let projectId = process.env.PROJECT_ID;
let keyFilename = process.env.KEY_FILENAME;

const storage = new Storage({
  projectId,
  keyFilename,
});

const bucket = storage.bucket(process.env.BUCKET_NAME);

router.post("/uploads", multer.single("imgfile"), (req, res) => {
  try {
    if (req.file) {
      const blob = bucket.file(req.file.originalname);
      const blobStream = blob.createWriteStream();
      blobStream.on("finish", () => {
        res.status(200).json({ mesage: "File uploaded successfully" });
      });
      blobStream.end(req.file.buffer);
    }
  } catch (err) {
    throw err;
  }
});

router.get("/uploads", async (req, res) => {
  try {
    const files = await bucket.getFiles();
    res.status(200).json(files);
  } catch (err) {
    throw err;
  }
});
// getprofile
// const getProfile = (profile) => {
//   const { id, displayName, emails, provider } = profile;
//   if (emails?.length) {
//     const email = emails[0].value;
//     return {
//       googleId: id,
//       firstName: displayName[0],
//       lastName: displayName[1],
//       emailAddress: email,
//       provider,
//     };
//   }
// };

// // Get user from google
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: "/pictures/auth/google/callback",
//       scope: ["profile"],
//     },

//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         const existsGoogleAccount = await User.findOne({
//           where: {
//             googleId: profile.id,
//           },
//         });
//         if (!existsGoogleAccount) {
//           const existsGoogleEmail = await User.findOne({
//             where: {
//               email: getProfile(profile).emailAddress,
//             },
//           });
//           if (!existsGoogleEmail) {
//             const newUser = await User.create(getProfile(profile));
//             return done(null, newUser);
//           }
//           return done(null, existsGoogleEmail);
//         }
//         return done(null, existsGoogleAccount);
//       } catch (err) {
//         throw err;
//       }
//     }
//   )
// );

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//   User.findByPk(id)
//     .then((user) => {
//       done(null, user);
//     })
//     .catch((err) => {
//       done(err, null);
//     });
// });

// Get user from google
// router.post(
//   "/auth/google/callback",
//   passport.authenticate(
//     "google-token",
//     { session: false },
//     AuthControler.googleLogin
//   )
// );

// login failed
// router.get("signin/failed", async (req, res) => {
//   res.status(401).json({
//     message: "Login failed",
//   });
// });

// // logout
// router.get("/logout", async (req, res) => {
//   req.logout();
//   res.redirect(process.env.CLIENT_URL);
// });

module.exports = router;
