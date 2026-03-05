const express = require("express");
const cors = require("cors");

const flashcardRoutes = require("./routes/flashcards");
const quizRoutes = require("./routes/quiz");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/flashcards", flashcardRoutes);
app.use("/api/quiz", quizRoutes);

module.exports = app;
