const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const cors = require("cors");

const port = 5000;
//la base de donnee
const db = require("./config/db");
//les tables de la base de donnee
const Categories = require("./models/Categories");
const Commandes = require("./models/Commandes");
const composer = require("./models/Composer");
const Cuisiniers = require("./models/Cuisiniers");
const Nourritures = require("./models/Nourritures");
const Paymentmethods = require("./models/Paymentmethods");
const Users = require("./models/Users");

//les relations de plusieurs a plusieur
Nourritures.belongsToMany(Users, { through: "Aimer" });
Users.belongsToMany(Nourritures, { through: "Aimer" });
Cuisiniers.belongsToMany(Nourritures, { through: "Preparer" });
Nourritures.belongsToMany(Cuisiniers, { through: "Preparer" });
Commandes.belongsToMany(Nourritures, { through: "Composer" });
Nourritures.belongsToMany(Commandes, { through: "Composer" });
Users.belongsToMany(Cuisiniers, { through: "Suivre_cuisiniers" });
Cuisiniers.belongsToMany(Users, { through: "Suivre_cuisiniers" });
//le Middleware pertet de traiter les donnees dans une request
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//Middleware Cors
app.use(cors());

//les routes
app.use("/utilisateur", require("./Routes/usersRoute"));
app.use("/chef", require("./Routes/cuisiniersRoute"));
app.use("/nourriture", require("./Routes/nourritureRoute"));
app.use("/categorie", require("./Routes/categoriesRoute"));
app.use("/commande", require("./Routes/commandesRoute"));
app.use("/methoDePayement", require("./Routes/paymentRoute"));
app.use("/liking", require("./Routes/like_dislike_Route"));

//syncronise les models avec la base de donnee
db.sync(/*{ throw: true }*/)
  .then(() => {
    console.log("Base de données synchronisée");
  })
  .catch((error) => {
    console.error(
      "Erreur lors de la synchronisation de la base de données:",
      error
    );
  });

app.listen(port, () => {
  console.log(`server is on line in localhost:${port}`);
});
