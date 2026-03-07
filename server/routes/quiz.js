const express = require("express");
const router = express.Router();
const sequelize = require("../models/index");
const Flashcard = require("../models/flashcard");
const { asyncHandler } = require("../middleware/asyncHandler");

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const { count } = req.query;

    // Handle 'all' or parse the number
    const limit = count === "all" ? undefined : parseInt(count) || 10;

    const flashcards = await Flashcard.findAll({
      order: sequelize.random(),
      limit: limit,
    });

    if (flashcards.length === 0) {
      return res.status(404).json({ error: "No flashcards available" });
    }

    res.status(200).json(flashcards);
  }),
);

module.exports = router;
