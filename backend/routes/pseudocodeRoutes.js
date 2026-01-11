const express = require("express");
const router = express.Router();
const {
  getQuestions,
  getQuestionById,
  checkPseudocode,
} = require("../controllers/pseudocodeController");

router.get("/questions", getQuestions);
router.get("/questions/:id", getQuestionById);

router.post("/check-pseudocode", checkPseudocode);

module.exports = router;
