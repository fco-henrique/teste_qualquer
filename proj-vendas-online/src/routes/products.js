const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", async (req, res) => {
  try {
    const { name, price } = req.body;

    const result = await db.query(
      "INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *",
      [name, price]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar o produto" });
  }
});

router.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM products ORDER BY id");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao listar produtos" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM products WHERE id = $1", [
      req.params.id,
    ]);

    if (result.rows.length === 0)
      return res.status(404).json({ error: "Produto não encontrado" });

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar produto" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { name, price } = req.body;

    const result = await db.query(
      "UPDATE products SET name = $1, price = $2 WHERE id = $3 RETURNING *",
      [name, price, req.params.id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ error: "Produto não encontrado" });

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar produto" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await db.query(
      "DELETE FROM products WHERE id = $1 RETURNING *",
      [req.params.id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({ error: "Produto não encontrado" });

    res.json({ message: "Produto deletado", product: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar produto" });
  }
});

module.exports = router;
