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
  // User.findOne({ where: { email } }).then((user) => {})
  User.create(user)

    .then((userCreated) => {
      console.log("que paso pablito2", userCreated);

      res.status(201).send(userCreated);
    })
    .catch((err) => res.send("no encontre"));
});
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  console.log("llego pablito");

  User.findOne({ where: { email } }).then((user) => {
    if (!user) return res.sendStatus(401);
    user
      .validatePassword(password)
      .then((isValid) => {
        if (!isValid) return res.send("usuario no coincide");

        const payload = {
          email: user.email,
        };

        const token = generateToken(payload);

        res.cookie("token", token);

        res.send(payload);
      })
      .catch((err) => res.send("usuario no encontrado"));
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
