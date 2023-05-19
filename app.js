const express = require("express");

const server = express();

server.get("/expense/", (req, res) => {
  res.status(200).json();
});

server.post("/expense/", (req, res) => {
  res.status(201).json();
});

server.get("/expense/:id/", (req, res) => {
  res.status(200).json();
});

server.delete("/expense/:id", (req, res) => {
  res.status(204).end();
});

server.patch("/expense/:id", (req, res) => {
  res.status(200).json();
});

server.all("*", (req, res) => {
  res.status(404).json({ detail: "Response not found" });
});

server.listen(5000, () => {
  console.log("PORT: 5000");
});
