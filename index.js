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
  connectionString:
    "postgres://wenzitrhfbdowm:71f569a7498666093ed5fded6345fc7f3af47c761726d98c888f0e9558817433@ec2-34-236-103-63.compute-1.amazonaws.com:5432/d2acbcolfb7qh7",
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
    res.send(false); // Send 'false' if not connected
  }
});

app.listen(port, () => {
  console.log(`API server is running on port ${port}`);
});
