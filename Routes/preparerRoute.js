const express = require("express");
const { prepareNourriture } = require("../controllers/preparer_controller");
const router = express.Router();

router.post("/ajouteNourri", prepareNourriture);

module.exports = router;
