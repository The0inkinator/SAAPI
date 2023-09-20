const express = require("express");
const cors = require("cors");
const app = express();
const { Client } = require("pg");
const port = process.env.PORT || 3001;

app.use(cors());

// Use the Heroku-provided DATABASE_URL
const databaseUrl = process.env.DATABASE_URL; // This will be automatically set by Heroku

// Create a PostgreSQL client
const client = new Client({
  connectionString: databaseUrl,
  ssl: { rejectUnauthorized: false }, // Add this line for Heroku PostgreSQL
});

// Attempt to connect to the database
client
  .connect()
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });

app.get("/api/data/", (req, res) => {
  // Check if the client is connected to the database
  if (client && client.isConnected) {
    res.send(true); // Send 'true' if connected
  } else {
    res.send(false, databaseUrl); // Send 'false' if not connected
  }
});

app.listen(port, () => {
  console.log(`API server is running on port ${port}`);
});
