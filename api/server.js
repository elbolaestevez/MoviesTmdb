const express = require("express");
const app = express();
const routes = require("./routes/index");
const db = require("./db/index");
const models = require("./models");
app.use(express.json());
app.use("/api", routes);

db.sync({ force: false }).then(() => {
  app.listen(3001, () => {
    console.log("server levantado en puerto 3001");
  });
});
