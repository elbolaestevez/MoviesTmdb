const express = require("express");
const Favoritos = require("../models/Favoritos");
const Users = require("../models/User");
const { validateAuth } = require("../middlewares/auth");
const scraper = require("../utils/scraper");
const router = express.Router();
router.get("/", validateAuth, (req, res) => {
  Favoritos.findAll({ include: { model: Users, as: "author" } })
    .then((users) => res.status(200).send(users))
    .catch((err) => res.status(400).send(err));
});
//web scrapping
router.post("/scraper/movie", async function (req, res) {
  try {
    let title = req.body.title;

    let moviecritics = await scraper.scraperByMovie(title);

    res.send(moviecritics);
  } catch (error) {
    res.status(404);
  }
});

router.get("/:email", validateAuth, async (req, res) => {
  try {
    console.log("llego2");
    const email = req.params.email;

    const user = await Users.findOne({
      where: { email },
    });
    if (user) {
      const favoritos = await Favoritos.findAll({
        where: { authorId: user.id },
      });
      res.send(favoritos);
    }
  } catch (err) {
    console.log(err);
  }
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
        unico: idpeliculaoserie + email,
      })
        .then((favorito) => favorito.setAuthor(user))
        .then((favorito) => res.send(favorito))
        .catch((err) => res.status(401).send("pelicula o serie existe"));
    })
    .catch((err) => console.log(err));
});
router.delete("/:id", validateAuth, function (req, res, next) {
  let id = req.params.id;
  Favoritos.destroy({ where: { unico: id } })
    .then((result) => res.send("result"))
    .catch((err) => console.log(err));
});

module.exports = router;
