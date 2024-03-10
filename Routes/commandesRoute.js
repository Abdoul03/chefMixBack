const express = require("express");
const {
  addCommande,
  getCommande,
  getCommandeById,
  updateCommande,
  deleteCommande,
} = require("../controllers/commande_controller");
const router = express.Router();

//CRUD
//Ajouter des Commandes(CREATE)
router.post("/passeCommande", addCommande);
// Afficher tous les Commandes(READ)
router.get("/", getCommande);
//Afficher Categories par ID(READ)
router.get("/:id", getCommandeById);
//Mettre a jour les information(Update)
router.put("/:id", updateCommande);
//Supprimer les donnee (Delete)
router.delete("/:id", deleteCommande);

module.exports = router;
