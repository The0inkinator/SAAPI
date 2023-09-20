const express = require("express");
const cors = require("cors");
const { Client } = require("pg");
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());

// Use the Heroku-provided DATABASE_URL
const databaseUrl = process.env.DATABASE_URL; // This will be automatically set by Heroku

// Create a PostgreSQL client
const client = new Client({
  connectionString: databaseUrl,
  ssl: { rejectUnauthorized: false }, // Add this line for Heroku PostgreSQL
});

client.connect(); // Connect to the database

app.get("/api/data/", async (req, res) => {
  res.send("hello");
  // try {
  //   // Define your SQL query based on your database schema
  //   const query = "SELECT * FROM satesttable"; // Customize the query as needed

  //   // Execute the SQL query
  //   const result = await client.query(query);

  //   if (result.rows.length === 0) {
  //     return res.status(404).json({ error: "Data not found" });
  //   }

  //   // Send the retrieved data as a JSON response
  //   res.json(result.rows);
  // } catch (error) {
  //   console.error("Error querying the database:", error);
  //   res.status(500).json({ error: "Internal server error" });
  // }
});

app.listen(port, () => {
  console.log(`API server is running on port ${port}`);
});
