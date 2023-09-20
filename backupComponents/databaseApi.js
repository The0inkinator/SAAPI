const express = require("express");
const cors = require("cors");
const { Client } = require("pg"); // Import the PostgreSQL Client class
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());

// PostgreSQL connection URL
const databaseUrl = "postgres://wenzitrhfbdowm:..."; // Replace with your database URL

// Create a PostgreSQL client
const client = new Client({
  connectionString: databaseUrl,
  ssl: { rejectUnauthorized: false }, // Add this line for Heroku PostgreSQL
});

client.connect(); // Connect to the database

app.get("/api/data/:path(*)", async (req, res) => {
  const { path: filePath } = req.params;

  try {
    // Define your SQL query based on the request URL
    const query = `SELECT * FROM your_table WHERE path = $1`; // Customize the query as needed

    // Execute the SQL query
    const result = await client.query(query, [filePath]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Data not found" });
    }

    // Send the retrieved data as JSON response
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error querying the database:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`API server is running on port ${port}`);
});
