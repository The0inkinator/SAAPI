const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());

const dataFolderPath = path.join(__dirname, "data");

app.get("/api/data/:path(*)", (req, res) => {
  const { path: filePath } = req.params;
  const requestedFilePath = path.join(dataFolderPath, filePath + ".json");

  fs.access(requestedFilePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).json({ error: "Data not found" });
    }

    fs.readFile(requestedFilePath, "utf8", (err, data) => {
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
