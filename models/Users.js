const { DataTypes } = require("sequelize");
const db = require("../config/db");
const Commandes = require("./Commandes");
const Paymentmethods = require("./Paymentmethods");

const Users = db.define("Users", {
  iduser: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  prenom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  adresse: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telephone: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  profil: {
    type: DataTypes.BLOB,
    allowNull: true,
  },
});

Users.hasMany(Commandes, { as: "Commandes" });
Users.hasMany(Paymentmethods, { as: "Paymentmethods" });

module.exports = Users;
