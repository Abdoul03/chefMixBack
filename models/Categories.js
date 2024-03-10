const { DataTypes } = require("sequelize");
const db = require("../config/db");
const Nourritures = require("./Nourritures");

const Categories = db.define("Categories", {
  idcatego: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
// Définir l'association "One-to-Many" avec le modèle Food
Categories.hasMany(Nourritures, { as: "Nourritures" });

module.exports = Categories;
