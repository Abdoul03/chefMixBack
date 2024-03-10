const express = require("express");
const {
  addPayment,
  getPayment,
  getPaymentById,
  updatePayment,
  deletePayment,
} = require("../controllers/payment_controller");
const router = express.Router();

//CRUD
//Ajouter des Monyens de payment(CREATE)
router.post("/ajouteMoyenPayment", addPayment);
// Afficher tous les moyens de payement(READ)
router.get("/", getPayment);
//Afficher les monyens de payements par ID(READ)
router.get("/:id", getPaymentById);
//Mettre a jour les information(Update)
router.put("/:id", updatePayment);
//Supprimer les donnee (Delete)
router.delete("/:id", deletePayment);

module.exports = router;
