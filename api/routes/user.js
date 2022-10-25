const express = require("express");
const { generateToken } = require("../config/tokens");
const router = express.Router();
const { User, Favoritos } = require("../models");
const { validateAuth } = require("../middlewares/auth");

router.get("/", (req, res) => {
  User.findAll()
    .then((users) => res.status(200).send(users))
    .catch((err) => res.status(400).send(err));
});

router.post("/register", (req, res) => {
  console.log("hola");
  const user = req.body;

  User.create(user)

    .then((userCreated) => res.status(201).send(userCreated))
    .catch((err) => console.log(err));
});
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  console.log("llego pablito");

  User.findOne({ where: { email } }).then((user) => {
    if (!user) return res.sendStatus(401);
    user
      .validatePassword(password)
      .then((isValid) => {
        if (!isValid) return res.sendStatus(401);

        const payload = {
          email: user.email,
        };

        const token = generateToken(payload);
        console.log("token", token);
        console.log("payload", payload);
        res.cookie("token", token);

        res.send(payload);
      })
      .catch((err) => console.log(err));
  });
});
router.get("/secret", validateAuth, (req, res) => {
  res.send(req.user);
});

router.get("/me", validateAuth, (req, res) => {
  res.send(req.user);
});

router.post("/logout", (req, res) => {
  res.clearCookie("token");

  res.sendStatus(204);
});

module.exports = router;
