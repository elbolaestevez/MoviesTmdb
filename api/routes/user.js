const express = require("express");
const router = express.Router();
const User = require("../models/User");
router.get("/", (req, res) => {
  User.findAll()
    .then((users) => res.status(200).send(users))
    .catch((err) => res.status(400).send(err));
});

module.exports = router;
