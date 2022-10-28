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
  console.log("email", email);
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
  const { email, title, idpeliculaoserie, poster_path, release_date, tipo } =
    req.body;

  Users.findOne({
    where: { email },
  })
    .then((data) => {
      const user = data;

      Favoritos.create({
        title,
        idpeliculaoserie,
        poster_path,
        release_date,
        tipo,
      })
        .then((favorito) => favorito.setAuthor(user))
        .then((favorito) => res.send(favorito))
        .catch((err) => res.status(401).send("pelicula o serie existe"));
    })
    .catch((err) => console.log(err));
});
router.delete("/:id", validateAuth, function (req, res, next) {
  let id = req.params.id;
  Favoritos.destroy({ where: { idpeliculaoserie: id } })
    .then((result) => res.send("result"))
    .catch((err) => console.log(err));
});

module.exports = router;