const express = require("express");
const router = express.Router();
const db = require("../config/database");

// GET /api/products - Listar todos os produtos
router.get("/", async (req, res) => {
  try {
    const products = await db("products")
      .where("is_available", true)
      .select("*")
      .orderBy("name");

    res.json({
      success: true,
      data: products,
      count: products.length,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch products",
    });
  }
});

// GET /api/products/:id - Buscar produto por ID
router.get("/:id", async (req, res) => {
  try {
    const product = await db("products").where({ id: req.params.id }).first();

    if (!product) {
      return res.status(404).json({
        success: false,
        error: "Product not found",
      });
    }

    res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch product",
    });
  }
});

module.exports = router;
