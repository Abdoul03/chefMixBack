const express = require("express");
const {
  addcuisinier,
  getCuisinier,
  getCuisinierById,
  updateCuisinier,
  deleteCuisinier,
  connectCuisinier,
  getConnectedCuisinierInfo,
  authMiddleware,
} = require("../controllers/cuisinier_constroller");
const router = express.Router();

//CRUD
//create des Cuisiniers(CREATE)
router.post("/inscriptionChef", addcuisinier);
//S'authentifier
router.post("/login", connectCuisinier);
// Afficher tous les Cuisiniers(READ)
router.get("/", getCuisinier);
//Afficher les Cuisibier par ID(READ)
router.get("/:id", getCuisinierById);
//Mettre a jour les information(Update)
router.put("/:id", updateCuisinier);
//Supprimer les donnee (Delete)
router.delete("/:id", deleteCuisinier);

module.exports = router;
