const express = require("express");
const router = express.Router();
const Flashcard = require("../models/flashcard");
const { asyncHandler } = require("../middleware/asyncHandler");

// Retrieves a random flashcard from the database.
// Counts total flashcards, generates a random ID within that range,
// and returns the flashcard with that primary key.
router.get(
  "/random",
  asyncHandler(async (req, res) => {
    const amount = await Flashcard.count();

    // Handle empty database
    if (amount === 0) {
      return res.status(404).json({ error: "No flashcards available" });
    }

    const randomId = Math.floor(Math.random() * amount) + 1;
    const randomFlashcard = await Flashcard.findByPk(randomId);

    if (randomFlashcard) {
      res.status(200).json(randomFlashcard);
    } else {
      res.status(404).json({ error: "No flashcards found" });
    }
  }),
);

// Get a specific flashcard by ID
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const flashcard = await Flashcard.findByPk(req.params.id);

    if (flashcard) {
      res.status(200).json(flashcard);
    } else {
      res
        .status(404)
        .json({ error: `Flashcard with id of ${req.params.id} was not found` });
    }
  }),
);

// Get all flashcards
router.get(
  "/all",
  asyncHandler(async (req, res) => {
    const allFlashcards = await Flashcard.findAll();
    res.status(200).json(allFlashcards);
  }),
);

// Creates a new flashcard
router.post(
  "/new",
  asyncHandler(async (req, res) => {
    try {
      await Flashcard.create(req.body);
      res.status(201).end();
    } catch (error) {
      if (
        error.name === "SequelizeValidationError" ||
        error.name === "SequelizeUniqueConstraintError"
      ) {
        // map over errors and get each error message
        const errors = error.errors.map((err) => err.message);
        res.status(400).json({ errors });
      } else {
        throw error;
      }
    }
  }),
);

// Edit an already existing flashcard
router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    try {
      const flashcard = await Flashcard.findByPk(req.params.id);

      if (flashcard) {
        await flashcard.update(req.body);
        res.status(204).end();
      } else {
        // if flashcard was not found send 404 and message
        res.status(404).json({
          message: `Flashcard with id of ${req.params.id} was not found`,
        });
      }
    } catch (error) {
      if (
        error.name === "SequelizeValidationError" ||
        error.name === "SequelizeUniqueConstraintError"
      ) {
        const errors = error.errors.map((err) => err.message);
        res.status(400).json({ errors });
      } else {
        throw error;
      }
    }
  }),
);

// Delete an existing flashcard
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const flashcard = await Flashcard.findByPk(req.params.id);

    if (flashcard) {
      await flashcard.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({
        message: `Flashcard with id of ${req.params.id} was not found`,
      });
    }
  }),
);

module.exports = router;
