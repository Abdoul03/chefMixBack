const { DataTypes } = require("sequelize");
const db = require("../config/db");

const Commandes = db.define("Commandes", {
  numcomm: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  statut: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date_comm: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  iduser: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantite: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Commandes;
