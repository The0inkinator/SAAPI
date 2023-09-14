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

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(404).json({ error: "data not found" });
    }

    const jsonData = JSON.parse(data);
    res.json(jsonData);
  });
});

app.listen(port, () => {
  console.log(`API server is running on port ${port}`);
});
