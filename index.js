const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());

const data = {
  message: "hello, API",
  timestamp: new Date(),
};

app.get("/api/data", (req, res) => {
  res.json(data);
});

app.listen(port, () => {
  console.log(`API server is running on port ${port}`);
});
