const express = require("express");
const {
  addUsers,
  getUsers,
  getUsersById,
  updateUser,
  deleteUsers,
  connectUsers,
} = require("../controllers/user_controller");
const router = express.Router();

//CRUD
//create des utilisateurs(CREATE)
router.post("/inscriptionUser", addUsers);
//login
router.post("login", connectUsers);
// Afficher tous les utilisateurs(READ)
router.get("/", getUsers);
//Afficher les utilisateur par ID(READ)
router.get("/:id", getUsersById);
//Mettre a jour les information(Update)
router.put("/:id", updateUser);
//Supprimer les donnee (Delete)
router.delete("/:id", deleteUsers);

module.exports = router;
