const express = require("express");
const {
  addNourriture,
  getNourriture,
  getNourritureById,
  updateNourriture,
  deleteNourriture,
} = require("../controllers/nourriture_controller");
const router = express.Router();

//CRUD
//Ajouter des nouritures(CREATE)
router.post("/ajoutNouriture", addNourriture);
// Afficher tous les Nourritures(READ)
router.get("/", getNourriture);
//Afficher Nourritures par ID(READ)
router.get("/:id", getNourritureById);
//Mettre a jour les information(Update)
router.put("/:id", updateNourriture);
//Supprimer les donnee (Delete)
router.delete("/:id", deleteNourriture);

module.exports = router;
