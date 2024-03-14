const { DataTypes } = require("sequelize");
const db = require("../config/db");

const Nourritures = db.define("Nourritures", {
  idnourr: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  prix: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  photo: {
    type: DataTypes.BLOB,
  },
});

module.exports = Nourritures;
