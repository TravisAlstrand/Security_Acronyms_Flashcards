const fs = require("fs");
const path = require("path");
const sequelize = require("./models");
const Flashcard = require("./models/flashcard");

async function exportDatabase() {
  try {
    console.log("Connecting to database...");
    await sequelize.authenticate();
    console.log("Database connected");

    // Fetch all flashcards from the database
    console.log("Fetching flashcards from database...");
    const flashcards = await Flashcard.findAll({
      order: [["acronym", "ASC"]], // Sort alphabetically by acronym
    });

    // Transform data to match the JSON format (map 'definition' to 'definitions')
    const exportData = flashcards.map((card) => ({
      acronym: card.acronym,
      definitions: card.definition, // Map 'definition' to 'definitions'
      hint: card.hint || "",
      category: card.category || "",
    }));

    // Write to the JSON file
    const filePath = path.join(__dirname, "data", "acronyms.json");
    fs.writeFileSync(filePath, JSON.stringify(exportData, null, 2));

    console.log(
      `Successfully exported ${exportData.length} flashcards to ${filePath}`,
    );

    // Close the database connection
    await sequelize.close();
    console.log("Database connection closed");
    process.exit(0);
  } catch (error) {
    console.error("Export failed:", error);
    process.exit(1);
  }
}

exportDatabase();
