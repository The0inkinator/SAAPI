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

let connectionResult = false;

// Attempt to connect to the database
client
  .connect()
  .then(() => {
    connectionResult = "connection is true";
  })
  .catch((err) => {
    connectionResult = err;
  });

app.get("/api/data/", async (req, res) => {
  // Check if the client is connected to the database
  if (client && client.isConnected) {
    // res.send(true);
    try {
      const query = "SELECT * FROM satesttable";

      const result = await client.query(query);

      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Data not found" });
      }

      res.json(result.rows);
    } catch (err) {
      res.send(err);
    }
  } else {
    res.send(connectionResult); // Send 'false' if not connected
  }
});

app.listen(port, () => {
  console.log(`API server is running on port ${port}`);
});
