const { DataTypes } = require("sequelize");
const db = require("../config/db");

const Composer = db.define("Composer", {
  idcompose: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
});

module.exports = Composer;
