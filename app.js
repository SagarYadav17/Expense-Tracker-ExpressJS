const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

// Routes
const expense = require("./routes/expense");
const category = require("./routes/category");

dotenv.config({ path: "./.env" });

const server = express();

server.use(bodyParser.json());
server.use("/api/expense", expense);
server.use("/api/category", category);

server.all("*", (req, res) => {
  res.status(404).json({ error: "Response not found" });
});

server.listen(process.env.SERVER_PORT, () => {
  console.log(`PORT: ${process.env.SERVER_PORT}`);
});
