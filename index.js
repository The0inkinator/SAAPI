const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());

const dataFolderPath = path.join(__dirname, "data");

// app.get("/api/data/:folder/:filename", (req, res) => {
//   const { folder, filename } = req.params;
//   const filePath = path.join(dataFolderPath, folder, `${filename}.json`);

//   fs.readFile(filePath, "utf8", (err, data) => {
//     if (err) {
//       return res.status(404).json({ error: "Data not found" }); // Corrected status code
//     }

//     const jsonData = JSON.parse(data);
//     res.json(jsonData);
//   });
// });

const data = [
  {
    title: "Lands",
    link: "/lands",
    displayArt: { cardName: "flooded strand", cardSet: "bfz" },
    bgCards: [{ cardName: "field of ruin" }, { cardName: "Rishadan Port" }],
  },
  {
    title: "Creatures",
    link: "/creatures",
    displayArt: { cardName: "Morophon the boundless" },
    bgCards: [
      { cardName: "Goblin Guide" },
      { cardName: "Llanowar Elves" },
      { cardName: "Mulldrifter" },
    ],
  },
  {
    title: "Spells",
    link: "/binders",
    displayArt: { cardName: "Supreme Verdict", cardSet: "2x2" },
    bgCards: [
      { cardName: "Vindicate" },
      { cardName: "Counterspell" },
      { cardName: "Giant Growth" },
    ],
  },
  {
    title: "Archtypes",
    link: "/archetypes",
    displayArt: { cardName: "Mayhem Devil" },
    bgCards: [
      { cardName: "Emry Lurker of the loch" },
      { cardName: "Expressive iteration" },
      { cardName: "Bloodghast" },
    ],
  },
  {
    title: "Colors",
    link: "/colors",
    displayArt: { cardName: "Mana confluence", cardSet: "sld" },
    bgCards: [
      { cardName: "Swords to plowshares" },
      { cardName: "counterspell" },
      { cardName: "thoughtseize" },
    ],
  },
];

app.get("/api/data", (req, res) => {
  res.json(data);
});

app.listen(port, () => {
  console.log(`API server is running on port ${port}`);
});
