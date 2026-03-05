const express = require("express");
const router = express.Router();
const Flashcard = require("../models/flashcard");
const { asyncHandler } = require("../middleware/asyncHandler");

// Get a single random flashcard
router.get(
  "/random",
  asyncHandler(async (req, res) => {
    // Get the amount of flashcards in the DB
    const amount = await Flashcard.count();
    console.log(`Total Count: ${amount}`);
    // Return a random integer between 1 and amount in DB
    const randomId = Math.floor(Math.random() * amount) + 1;
    // Query the flashcard with the random ID
    const randomFlashcard = await Flashcard.findByPk(randomId);
    // Set status and parse flashcard to json
    res.status(200).json(randomFlashcard);
  }),
);

module.exports = router;
