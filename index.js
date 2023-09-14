const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());

const dataFolderPath = path.join(__dirname, "data");

app.get("/api/data/*", (req, res) => {
  const urlSegments = req.url.split("/").filter(Boolean);
  const folderPath = path.join(dataFolderPath, ...urlSegments);
  const indexPath = path.join(folderPath, "index.json");

  // Check if the requested folder exists
  fs.access(folderPath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).json({ error: "Folder not found" });
    }

    // Check if the index.json file exists in the folder
    fs.access(indexPath, fs.constants.F_OK, (err) => {
      if (err) {
        return res.status(404).json({ error: "Data not found" });
      }

      // Read and send the JSON data from the index.json file
      fs.readFile(indexPath, "utf8", (err, data) => {
        if (err) {
          return res.status(500).json({ error: "Internal server error" });
        }

        const jsonData = JSON.parse(data);
        res.json(jsonData);
      });
    });
  });
});

app.listen(port, () => {
  console.log(`API server is running on port ${port}`);
});
