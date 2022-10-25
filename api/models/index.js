const User = require("./User");
const Favoritos = require("./Favoritos");
User.hasMany(Favoritos);
Favoritos.belongsTo(User, { as: "author" });

module.exports = { User, Favoritos };
