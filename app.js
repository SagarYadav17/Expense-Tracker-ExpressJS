const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const Pool = require("pg").Pool;

const pool = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOSTNAME,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const server = express();

server.get("/expense/", (req, res) => {
  pool.query(
    "SELECT * from app1_expense LEFT join app1_category on app1_expense.category_id = app1_category.id ORDER BY timestamp DESC",
    (error, results) => {
      if (error) {
        throw error;
      }

      res.status(200).json(results.rows);
    }
  );
});

server.post("/expense/", (req, res) => {
  const query =
    "INSERT INTO app1_expense(timestamp,amount,description,category_id) VALUES('2023-05-20 01:55:40','2000','dometing',1)";
  res.status(201).json();
});

server.get("/expense/:id/", (req, res) => {
  const query =
    "SELECT * from app1_expense LEFT join app1_category on app1_expense.category_id = app1_category.id WHERE app1_expense = ";
  res.status(200).json();
});

server.delete("/expense/:id", (req, res) => {
  "SELECT * from app1_expense WHERE app1_expense = ";
  res.status(204).end();
});

server.patch("/expense/:id", (req, res) => {
  const query = "UPDATE app1_expense SET amount='203' WHERE 'id'=1";
  res.status(200).json();
});

server.all("*", (req, res) => {
  res.status(404).json({ detail: "Response not found" });
});

server.listen(5000, () => {
  console.log("PORT: 5000");
});
