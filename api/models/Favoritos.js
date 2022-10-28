const S = require("sequelize");
const db = require("../db");

class Favoritos extends S.Model {}

Favoritos.init(
  {
    title: {
      type: S.STRING,
    },

    poster_path: {
      type: S.STRING,
    },
    idpeliculaoserie: {
      type: S.INTEGER,
      unique: true,
    },
    release_date: {
      type: S.STRING,
    },
    tipo: {
      type: S.INTEGER,
    },
  },
  { sequelize: db, modelName: "favoritos" }
);

module.exports = Favoritos;
