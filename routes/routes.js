const express = require("express");
const router = express.Router();
const {
  User,
  TechStack,
  Experience,
  Certification,
  Badge,
  Avarta,
  Message,
  Methodology,
  Project,
  Resume,
  Social,
  PersonalStatement,
  ProjectTechStack,
} = require("../models");
const { userAuth } = require("../middleware/userAuth");
const { asyncHandler } = require("../middleware/asyncHandler");

// Create a new user
router.post(
  "/users",
  asyncHandler(async (req, res) => {
    try {
      await User.create(req.body);
      res.status(201).location("/users").end();
    } catch (error) {
      if (
        error.name === "SequelizeValidationError" ||
        error.name === "SequelizeUniqueConstraintError"
      ) {
        const errors = error.errors.map((err) => err.message);
        res.status(400).json({ errors });
      } else {
        throw error;
      }
    }
  })
);

// Get the current authenticated user
router.get(
  "/users",
  userAuth,
  asyncHandler(async (req, res) => {
    try {
      const user = req.currentUser;
      res.json({
        userID: user.userID,
        firstName: user.firstName,
        lastName: user.lastName,
        emailAddress: user.emailAddress,
      });
    } catch (error) {
      throw error;
    }
  })
);

// Create a new tech stack
router.post(
  "/technologies",
  userAuth,
  asyncHandler(async (req, res) => {
    try {
      const user = req.currentUser;
      const techStack = await TechStack.create(req.body);
      // await techStack.setUser(user);
      res.status(201).location("/techstacks").end();
    } catch (error) {
      if (
        error.name === "SequelizeValidationError" ||
        error.name === "SequelizeUniqueConstraintError"
      ) {
        const errors = error.errors.map((err) => err.message);
        res.status(400).json({ errors });
      } else {
        throw error;
      }
    }
  })
);

// Get all tech stacks
router.get(
  "/technologies",
  asyncHandler(async (req, res) => {
    try {
      const techStacks = await TechStack.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
      res.status(200).json(techStacks);
    } catch (error) {
      throw error;
    }
  })
);

// Create a new experience
router.post(
  "/experiences",
  userAuth,
  asyncHandler(async (req, res) => {
    try {
      const user = req.currentUser;
      const experience = await Experience.create(req.body);
      // await experience.setUser(user);
      res.status(201).location("/experiences").end();
    } catch (error) {
      if (
        error.name === "SequelizeValidationError" ||
        error.name === "SequelizeUniqueConstraintError"
      ) {
        const errors = error.errors.map((err) => err.message);
        res.status(400).json({ errors });
      } else {
        throw error;
      }
    }
  })
);

// Get all experiences
router.get(
  "/experiences",
  asyncHandler(async (req, res) => {
    try {
      const experiences = await Experience.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
      res.status(200).json(experiences);
    } catch (error) {
      throw error;
    }
  })
);

// Create a new certification
router.post(
  "/certifications",
  userAuth,
  asyncHandler(async (req, res) => {
    try {
      const user = req.currentUser;
      const certification = await Certification.create(req.body);
      // await certification.setUser(user);
      res.status(201).location("/certification").end();
    } catch (error) {
      if (
        error.name === "SequelizeValidationError" ||
        error.name === "SequelizeUniqueConstraintError"
      ) {
        const errors = error.errors.map((err) => err.message);
        res.status(400).json({ errors });
      } else {
        throw error;
      }
    }
  })
);

// Get all certifications
router.get(
  "/certifications",
  asyncHandler(async (req, res) => {
    try {
      const certifications = await Certification.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
      res.status(200).json(certifications);
    } catch (error) {
      throw error;
    }
  })
);

// Create a new badge
router.post(
  "/badges",
  userAuth,
  asyncHandler(async (req, res) => {
    try {
      const user = req.currentUser;
      const badge = await Badge.create(req.body);
      res.status(201).location("/badges").end();
    } catch (error) {
      if (
        error.name === "SequelizeValidationError" ||
        error.name === "SequelizeUniqueConstraintError"
      ) {
        const errors = error.errors.map((err) => err.message);
        res.status(400).json({ errors });
      } else {
        throw error;
      }
    }
  })
);

// Get all badges
router.get(
  "/badges",
  asyncHandler(async (req, res) => {
    try {
      const badges = await Badge.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
      res.status(200).json(badges);
    } catch (error) {
      throw error;
    }
  })
);

// Create a new project
router.post(
  "/projects",
  asyncHandler(async (req, res) => {
    try {
      const project = await Project.create(req.body);
      // await project.setUser(user);
      res.status(201).location("/projects").end();
    } catch (error) {
      if (
        error.name === "SequelizeValidationError" ||
        error.name === "SequelizeUniqueConstraintError"
      ) {
        const errors = error.errors.map((err) => err.message);
        res.status(400).json({ errors });
      } else {
        throw error;
      }
    }
  })
);

// Get all projects
router.get(
  "/projects",
  asyncHandler(async (req, res) => {
    try {
      const projects = await Project.findAll();
      res.status(200).json(projects);
    } catch (error) {
      throw error;
    }
  })
);

// Create a new avatar
router.post(
  "/avartas",
  userAuth,
  asyncHandler(async (req, res) => {
    try {
      const user = req.currentUser;
      const avatar = await Avarta.create(req.body);
      // await avatar.setUser(user);
      res.status(201).location("/avartas").end();
    } catch (error) {
      if (
        error.name === "SequelizeValidationError" ||
        error.name === "SequelizeUniqueConstraintError"
      ) {
        const errors = error.errors.map((err) => err.message);
        res.status(400).json({ errors });
      } else {
        throw error;
      }
    }
  })
);

// Get all avatars
router.get(
  "/avartas",
  asyncHandler(async (req, res) => {
    try {
      const avatars = await Avarta.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
      res.status(200).json(avatars);
    } catch (error) {
      throw error;
    }
  })
);

// Create a new socials
router.post(
  "/socials",
  userAuth,
  asyncHandler(async (req, res) => {
    try {
      const user = req.currentUser;
      const social = await Social.create(req.body);
      // await social.setUser(user);
      res.status(201).location("/socials").end();
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        const errors = error.errors.map((err) => err.message);
        res.status(400).json({ errors });
      } else {
        throw error;
      }
    }
  })
);

// Get all socials
router.get(
  "/socials",
  asyncHandler(async (req, res) => {
    try {
      const socials = await Social.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
      res.status(200).json(socials);
    } catch (error) {
      throw error;
    }
  })
);

// Create a new personalStatment
router.post(
  "/personalStatement",
  userAuth,
  asyncHandler(async (req, res) => {
    try {
      const user = req.currentUser;
      const personalStatment = await PersonalStatement.create(req.body);
      res.status(201).location("/").end();
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        const errors = error.errors.map((err) => err.message);
        res.status(400).json({ errors });
      } else {
        throw error;
      }
    }
  })
);

// get all personalStatments
router.get(
  "/personalStatement",
  asyncHandler(async (req, res) => {
    try {
      const personalStatment = await PersonalStatement.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
      res.status(200).json(personalStatment);
    } catch (error) {
      throw error;
    }
  })
);

// Create a Resume
router.post(
  "/resumes",
  userAuth,
  asyncHandler(async (req, res) => {
    try {
      const user = req.currentUser;
      const resume = await Resume.create(req.body);
      res.status(201).location("/resume").end();
    } catch (error) {
      if (
        error.name === "SequelizeValidationError" ||
        error.name === "SequelizeUniqueConstraintError"
      ) {
        const errors = error.errors.map((err) => err.message);
        res.status(400).json({ errors });
      } else {
        throw error;
      }
    }
  })
);

// Get the all resume
router.get(
  "/resumes",
  asyncHandler(async (req, res) => {
    try {
      const resume = await Resume.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      res.status(200).json(resume);
    } catch (error) {
      throw error;
    }
  })
);

// update a resume
router.put(
  "/resume/:id",
  userAuth,
  asyncHandler(async (req, res) => {
    try {
      const user = req.currentUser;
      const resume = await Resume.findOne({
        where: {
          resumeID: req.params.id,
        },
      });
      res.status(204).json(resume);
    } catch (error) {
      if (
        error.name === "SequelizeValidationError" ||
        error.name === "SequelizeUniqueConstraintError"
      ) {
        const errors = error.errors.map((err) => err.message);
        res.status(400).json({ errors });
      } else {
        throw error;
      }
    }
  })
);

// create Message
router.post(
  "/messages",
  asyncHandler(async (req, res) => {
    try {
      const message = await Message.create(req.body);
      res.status(201).location("/message").end();
    } catch (error) {
      if (
        error.name === "SequelizeValidationError" ||
        error.name === "SequelizeUniqueConstraintError"
      ) {
        const errors = error.errors.map((err) => err.message);
        res.status(400).json({ errors });
      }
    }
  })
);

// get all messages
router.get(
  "/messages",
  asyncHandler(async (req, res) => {
    try {
      const messages = await Message.findAll({
        attributes: {
          exculde: ["createdAt", "updatedAt"],
        },
      });
      res.status(200).json(messages);
    } catch (error) {
      throw error;
    }
  })
);

// get single message
router.get(
  "/message/:id",
  asyncHandler(async (req, res) => {
    try {
      const message = await Message.findOne({
        where: { messageID: req.params.id },
      });
      res.status(200).json(message);
    } catch (error) {
      throw error;
    }
  })
);

// delete message
router.delete(
  "/messages/:id",
  userAuth,
  asyncHandler(async (req, res) => {
    const user = req.currentUser;
    const message = await Message.findByPk(req.params.id);
    if (message) {
      await message.destroy();
      res.status(204).location("/").end;
    }
  })
);

// create   Methodology
router.post(
  "/methodology",
  asyncHandler(async (req, res) => {
    try {
      const methodology = await Methodology.create(req.body);
      res.status(201).location("/methodology").end();
    } catch (error) {
      if (
        error.name === "SequelizeValidationError" ||
        error.name === "SequelizeUniqueConstraintError"
      ) {
        const errors = error.errors.map((err) => err.message);
        res.status(400).json({ errors });
      }
    }
  })
);

// Get all Methods
router.get(
  "/methodology",
  asyncHandler(async (req, res) => {
    try {
      const methodology = await Methodology.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      res.status(200).json(methodology);
    } catch (error) {
      throw error;
    }
  })
);

// get projectTechStack
router.get(
  "/projectTechStack",
  asyncHandler(async (req, res) => {
    try {
      const projectTechStack = await ProjectTechStack.findAll();
      res.status(200).json(projectTechStack);
    } catch (error) {
      throw error;
    }
  })
);

module.exports = router;
