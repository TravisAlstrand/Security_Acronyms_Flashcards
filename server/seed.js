const sequelize = require("./models");
const Flashcard = require("./models/flashcard");
const acronymsData = require("./data/acronyms.json");

async function seedDatabase() {
  try {
    console.log("Connecting to database...");
    await sequelize.authenticate();
    console.log("Database connected");

    // Sync the database schema (create tables if they don't exist)
    await sequelize.sync();
    console.log("Database schema synced");

    // Clear all existing flashcards
    console.log("Clearing existing flashcards...");
    await Flashcard.destroy({ where: {}, truncate: true });
    console.log("Database cleared");

    // Prepare data for insertion (map 'definitions' to 'definition')
    const flashcardsToInsert = acronymsData.map((item) => ({
      acronym: item.acronym,
      definition: item.definitions, // Map 'definitions' to 'definition'
      hint: item.hint || null,
    }));

    // Bulk insert all flashcards
    console.log(`Inserting ${flashcardsToInsert.length} flashcards...`);
    await Flashcard.bulkCreate(flashcardsToInsert);
    console.log(`Successfully seeded ${flashcardsToInsert.length} flashcards`);

    // Close the database connection
    await sequelize.close();
    console.log("Database connection closed");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
}

seedDatabase();
