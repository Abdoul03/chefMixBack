const { DataTypes } = require("sequelize");
const db = require("../config/db");

const Cuisiniers = db.define("Cuisiniers", {
  idcuisinier: {
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
    allowNull: true,
  },
  telephone: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  profil: {
    type: DataTypes.BLOB,
    allowNull: true,
  },
});

module.exports = Cuisiniers;
