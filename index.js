const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());

const dataFolderPath = path.join(__dirname, "data");

app.get("/api/data/:folder/:filename", (req, res) => {
  const { folder, filename } = req.params;
  const filePath = path.join(dataFolderPath, folder, `${filename}.json`);

  // Check if the file exists before reading it
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).json({ error: "Data not found" });
    }

    // Read and send the JSON data
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        return res.status(500).json({ error: "Internal server error" });
      }

      const jsonData = JSON.parse(data);
      res.json(jsonData);
    });
  });
});

app.listen(port, () => {
  console.log(`API server is running on port ${port}`);
});
