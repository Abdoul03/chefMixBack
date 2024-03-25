const express = require("express");
const {
  likeNourriture,
  dislikeNourriture,
} = require("../controllers/liking_controller");
const router = express.Router();

router.post("/like", likeNourriture);

module.exports = router;
