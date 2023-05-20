const express = require("express");
const router = express.Router();

const run_query = require("../components/db_query");

router.get("/", async (req, res) => {
  let query = `
    SELECT *
    FROM category
    ORDER BY name DESC
  `;

  try {
    const data = await run_query(query);
    res.status(200).json(data.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  const { name } = req.body;

  if (typeof name !== "string") {
    res.status(400).json({ error: "Invalid request body format." });
    return;
  }

  const query = `INSERT INTO category(name) VALUES('${name}')`;

  try {
    await run_query(query);
    res.status(201).json({ message: "Category created successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id/", async (req, res) => {
  const categoryId = req.params.id;

  let query = `SELECT * FROM category WHERE id = ${categoryId} LIMIT 1`;
  try {
    const data = await run_query(query);
    if (data.rows.length === 0) {
      res.status(404).json({ error: "Category not found." });
    } else {
      const category = data.rows[0];
      res.status(200).json(category);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.patch("/:id/", async (req, res) => {
  const categoryId = req.params.id;
  const { name } = req.body;

  if (name !== undefined && typeof name !== "string") {
    return res.status(400).json({ error: "Invalid request body format." });
  }

  let query = `UPDATE category SET name='${name}' WHERE id='${categoryId}'`;

  try {
    await run_query(query);
    res.status(200).json({ message: "Category updated successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id/", async (req, res) => {
  const categoryId = req.params.id;

  const query = `DELETE FROM category WHERE id = ${categoryId}`;

  try {
    await run_query(query);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
