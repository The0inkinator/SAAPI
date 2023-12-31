const express = require("express");
const cors = require("cors");
const { Client } = require("pg");
const app = express();
const port = process.env.PORT || 3001;
//update connection 5

app.use(cors());

// Use the Heroku-provided DATABASE_URL
const databaseUrl = process.env.DATABASE_URL; // This will be automatically set by Heroku

// Create a PostgreSQL client
const client = new Client({
  connectionString: databaseUrl,
  ssl: { rejectUnauthorized: false }, // Add this line for Heroku PostgreSQL
});

// Use an async function to connect to the database
async function connectToDatabase() {
  try {
    await client.connect(); // Wait for the connection to complete
    console.log("Connected to the database");
  } catch (err) {
    console.error("Error connecting to the database:", err);
  }
}

// Call the connectToDatabase function to establish the connection
connectToDatabase();

app.get("/tables/:table_name/:column_name?", async (req, res) => {
  const tableName = req.params.table_name;
  const columnName = req.params.column_name;
  // Check if the client is connected to the database
  if (client && client._ending === false) {
    if (columnName) {
      try {
        const queryResult = await client.query(
          `SELECT ${columnName} FROM ${tableName}`
        );
        res.json(queryResult.rows);
      } catch (err) {
        console.error("Error querying the database:", err);
        res.status(500).json({ error: "Error querying the database" });
      }
    } else {
      try {
        const queryResult = await client.query(`SELECT * FROM ${tableName}`);
        res.json(queryResult.rows);
      } catch (err) {
        console.error("Error querying the database:", err);
        res.status(500).json({ error: "Error querying the database" });
      }
    }
  } else {
    res.status(500).json({ error: "Client not connected to the database" });
  }
});

app.get(
  "/query/:table_name/:column_name/:where_name?/:where_value?",
  async (req, res) => {
    const tableName = req.params.table_name;
    const columnName = req.params.column_name;
    const whereName = req.params.where_name;
    const whereValue = req.params.where_value;
    if (client && client._ending === false) {
      if (whereName && whereValue) {
        try {
          const queryResult = await client.query(
            `SELECT ${decodeURI(columnName)} FROM ${decodeURI(
              tableName
            )} WHERE ${decodeURI(whereName)} = ${decodeURI(whereValue)}`
          );
          res.json(queryResult.rows);
        } catch (err) {
          console.error("Error querying the database:", err);
          res.status(500).json({ error: "Error querying the database" });
        }
      } else {
        try {
          const queryResult = await client.query(
            `SELECT ${columnName} FROM ${tableName}`
          );
          res.json(queryResult.rows);
        } catch (err) {
          console.error("Error querying the database:", err);
          res.status(500).json({ error: "Error querying the database" });
        }
      }
    } else {
      res.status(500).json({ error: "Client not connected to the database" });
    }
  }
);

app.listen(port, () => {
  console.log(`API server is running on port ${port}`);
});
