const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());

const dataFolderPath = path.join(__dirname, "data");

app.get("/api/data/", (req, res) => {
  res.send("hello");
  // const { path: filePath } = req.params;
  // const requestedFilePath = path.join(dataFolderPath, filePath);
  // // Check if the requested path points to a directory
  // if (
  //   fs.existsSync(requestedFilePath) &&
  //   fs.statSync(requestedFilePath).isDirectory()
  // ) {
  //   // If it's a directory, try serving an "index.json" file from within the directory
  //   const indexPath = path.join(requestedFilePath, "index.json");
  //   if (fs.existsSync(indexPath)) {
  //     return fs.readFile(indexPath, "utf8", (err, data) => {
  //       if (err) {
  //         return res.status(500).json({ error: "Internal server error" });
  //       }
  //       const jsonData = JSON.parse(data);
  //       res.json(jsonData);
  //     });
  //   }
  // }
  // // If it's not a directory or no "index.json" is found, try serving the path with ".json" extension
  // const jsonFilePath = requestedFilePath + ".json";
  // fs.access(jsonFilePath, fs.constants.F_OK, (err) => {
  //   if (err) {
  //     return res.status(404).json({ error: "Data not found" });
  //   }
  //   fs.readFile(jsonFilePath, "utf8", (err, data) => {
  //     if (err) {
  //       return res.status(500).json({ error: "Internal server error" });
  //     }
  //     const jsonData = JSON.parse(data);
  //     res.json(jsonData);
  //   });
  // });
});

app.listen(port, () => {
  console.log(`API server is running on port ${port}`);
});
