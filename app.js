const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

dotenv.config({ path: "./.env" });

const server = express();

server.use(bodyParser.json());

const Pool = require("pg").Pool;

const pool = new Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOSTNAME,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

function run_query(query) {
  return new Promise((resolve, reject) => {
    pool.query(query, (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
  });
}

// Function to validate datetime string format
function isValidDateTimeString(datetimeString) {
  const regex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
  return regex.test(datetimeString);
}

server.get("/expense/", async (req, res) => {
  const { start_date, end_date } = req.query;

  let query = `
    SELECT expense.id::int, expense.timestamp, expense.amount, category.name AS category_name
    FROM expense
    LEFT JOIN category ON expense.category_id = category.id
  `;

  // Add filters if start_date and/or end_date are provided
  if (start_date && end_date) {
    query += ` WHERE timestamp::date >= '${start_date}' AND timestamp::date <= '${end_date}'`;
  } else if (start_date) {
    query += ` WHERE timestamp::date >= '${start_date}'`;
  } else if (end_date) {
    query += ` WHERE timestamp::date <= '${end_date}'`;
  }

  query += " ORDER BY timestamp DESC";

  try {
    const data = await run_query(query);
    res.status(200).json(data.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

server.post("/expense/", async (req, res) => {
  const { timestamp, amount, description, category_id } = req.body;

  if (
    typeof timestamp !== "string" ||
    !isValidDateTimeString(timestamp) ||
    typeof amount !== "number" ||
    typeof description !== "string" ||
    typeof category_id !== "number"
  ) {
    res.status(400).json({ error: "Invalid request body format." });
    return;
  }

  const query = `INSERT INTO expense(timestamp, amount, description, category_id) VALUES('${timestamp}', '${amount}', '${description}', '${category_id}')`;

  try {
    await run_query(query);
    res.status(201).json({ message: "Expense created successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

server.get("/expense/:id/", async (req, res) => {
  const expenseId = req.params.id;

  let query = `
    SELECT expense.id::int, expense.timestamp, expense.amount, expense.description, category.name AS category_name
    FROM expense
    LEFT JOIN category ON expense.category_id = category.id
    WHERE expense.id = ${expenseId} LIMIT 1
  `;
  try {
    const data = await run_query(query);
    if (data.rows.length === 0) {
      res.status(404).json({ error: "Expense not found." });
    } else {
      const expense = data.rows[0];
      res.status(200).json(expense);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

server.patch("/expense/:id/", async (req, res) => {
  const expenseId = req.params.id;
  const { amount, timestamp, description, category_id } = req.body;

  if (
    (amount !== undefined && typeof amount !== "number") ||
    (timestamp !== undefined && typeof timestamp !== "string") ||
    (description !== undefined && typeof description !== "string") ||
    (category_id !== undefined && typeof category_id !== "number")
  ) {
    return res.status(400).json({ error: "Invalid request body format." });
  }

  let query = "UPDATE expense SET";
  const updateFields = [];

  if (amount !== undefined) {
    updateFields.push(`amount='${amount}'`);
  }

  if (description !== undefined) {
    updateFields.push(`description='${description}'`);
  }

  if (timestamp !== undefined) {
    updateFields.push(`timestamp='${timestamp}'`);
  }
  if (category_id !== undefined) {
    updateFields.push(`timestamp='${category_id}'`);
  }
  query += updateFields.join(", ");
  query += ` WHERE id='${expenseId}'`;

  try {
    await run_query(query);
    res.status(200).json({ message: "Expense updated successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

server.delete("/expense/:id/", async (req, res) => {
  const expenseId = req.params.id;

  const query = `DELETE FROM expense WHERE id = ${expenseId}`;

  try {
    await run_query(query);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

server.all("*", (req, res) => {
  res.status(404).json({ error: "Response not found" });
});

server.listen(process.env.SERVER_PORT, () => {
  console.log(`PORT: ${process.env.SERVER_PORT}`);
});
