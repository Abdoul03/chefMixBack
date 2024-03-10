const express = require("express");
const {
  addCategorie,
  getCategorie,
  getCategorieById,
  updateCategorie,
  deleteCategorie,
} = require("../controllers/categorie_controller");
const router = express.Router();

//CRUD
//Ajouter des nouritures(CREATE)
router.post("/creecatego", addCategorie);
// Afficher tous les Categories(READ)
router.get("/", getCategorie);
//Afficher Categories par ID(READ)
router.get("/:id", getCategorieById);
//Mettre a jour les information(Update)
router.put("/:id", updateCategorie);
//Supprimer les donnee (Delete)
router.delete("/:id", deleteCategorie);

module.exports = router;
