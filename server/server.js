const sequelize = require("./models");
const app = require("./app");

const PORT = 5000;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("Database connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Startup failed:", err);
  }
}

startServer();
