const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
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

client.connect(); // Connect to the database

app.get("/api/data/", (req, res) => {
  res.send("hello");
});

app.listen(port, () => {
  console.log(`API server is running on port ${port}`);
});
