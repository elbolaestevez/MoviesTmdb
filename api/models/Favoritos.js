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
    idpelicula: {
      type: S.INTEGER,
    },
    release_date: {
      type: S.STRING,
    },
  },
  { sequelize: db, modelName: "favoritos" }
);

module.exports = Favoritos;
