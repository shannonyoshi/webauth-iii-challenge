const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = require("../data/secrets");

const Users = require("./users-model");
const router = express.Router();

router.get("/users", authenticate, async (req, res) => {
  try {
    const users = await Users.find();
    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
});

router.post("/register", async (req, res) => {
  const user = req.body;
  const hash = bcrypt.hashSync(user.password, 8);
  user.password = hash;
  try {
    const registered = await Users.add(user);
    res.status(201).json(registered);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await Users.findBy({username})
    user.first()
    if(user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user)
        res.status(200).json({ message: `Welcome ${user.username}!`, token})
    } else {
        res.status(400).json({message: "Invalid credentials"})
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    dept: user.department
  };
  const options = {
    expiresIn: "8h"
  };
  return jwt.sign(payload, secret.jwtSecret, options);
}

module.exports = router;
