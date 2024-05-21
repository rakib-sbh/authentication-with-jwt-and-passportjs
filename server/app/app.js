const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const connectDB = require("../config/db");
const User = require("../models/user.model");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

require("../config/passport");

//! connecting the database
connectDB(process.env.MONGO_URL);

//! register route
app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (user) {
      res.status(400).json({
        message: "User already registered",
      });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        username,
        password: hashedPassword,
      });

      await newUser.save();

      res.status(201).json({
        message: "User registered successfully",
        newUser,
      });
    }
  } catch (error) {
    throw Error(error.message);
  }
});

//! login route
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      res.status(404).json({
        message: "Login failed",
      });
    } else {
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        res.status(403).json({
          message: "Login failed",
        });
      } else {
        //? generate token with jwt
        const payload = {
          id: user._id,
          username: user.username,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: "7d",
        });

        res.status(200).json({
          message: "Login successful",
          user,
          token: `Bearer ${token}`,
        });
      }
    }
  } catch (error) {
    throw Error(error.message);
  }
});

//! profile route. It will be a protected route
app.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    return res.status(200).send({
      message: "Authorization successful",
      user: {
        id: req.user._id,
        username: req.user.username,
      },
    });
  }
);

//! home route
app.get("/", (_req, res) => {
  res.status(200).json({
    message: "Welcome to the home route",
  });
});

//! resource not found
app.use((_req, res, _next) => {
  res.status(404).json({
    message: "Resource not found",
  });
});

//! server error
app.use((_err, _req, res, _next) => {
  res.status(500).json({
    message: "Server error",
  });
});

module.exports = app;
