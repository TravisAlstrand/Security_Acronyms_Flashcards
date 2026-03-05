const express = require("express");
const cors = require("cors");

const flashcardRoutes = require("./routes/flashcards");
const quizRoutes = require("./routes/quiz");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/flashcards", flashcardRoutes);
app.use("/api/quiz", quizRoutes);

// 404 HANDLER
app.use((req, res, next) => {
  res.status(404).json({
    error: "Route not found",
  });
});

// GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    error: err.message || "Internal server error",
  });
});

module.exports = app;
