const express = require("express");
const Favoritos = require("../models/Favoritos");
const Users = require("../models/User");
const { validateAuth } = require("../middlewares/auth");
const router = express.Router();
router.get("/", validateAuth, (req, res) => {
  Favoritos.findAll({ include: { model: Users, as: "author" } })
    .then((users) => res.status(200).send(users))
    .catch((err) => res.status(400).send(err));
});

router.get("/:email", validateAuth, (req, res) => {
  const email = req.params.email;
  Users.findOne({
    where: { email },
  })
    .then((users) =>
      Favoritos.findAll({ where: { authorId: users.id } }).then(
        (usuariofavoritos) => {
          res.send(usuariofavoritos);
        }
      )
    )
    .catch((err) => console.log(err));
});

router.post("/", validateAuth, (req, res) => {
  const { email, title, idpelicula, poster_path, release_date } = req.body;

  console.log("que llega por req", req.body);
  Users.findOne({
    where: { email },
  })
    .then((data) => {
      const user = data;

      Favoritos.create({ title, idpelicula, poster_path, release_date })
        .then((favorito) => favorito.setAuthor(user))
        .then((favorito) => res.send(favorito));
    })
    .catch((err) => console.log(err));
});

module.exports = router;
