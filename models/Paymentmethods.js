const { DataTypes } = require("sequelize");
const db = require("../config/db");
const Commandes = require("./Commandes");

const Paymentmethods = db.define("Paymentmethods", {
  idpaymethod: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Paymentmethods.hasMany(Commandes, { as: "Commandes" });

module.exports = Paymentmethods;
