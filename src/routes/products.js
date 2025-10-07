const express = require("express");
const router = express.Router();
const db = require("../config/database");

// Função para parse seguro de JSON
const safeJsonParse = (str, fallback = []) => {
  try {
    if (Array.isArray(str) || typeof str === "object") return str;
    if (!str || str === "null" || str === "undefined") return fallback;

    const parsed = JSON.parse(str);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch (error) {
    console.warn("JSON parse error for:", str, "Using fallback");
    return fallback;
  }
};

// GET /api/products - Listar todos os produtos
router.get("/", async (req, res) => {
  try {
    const products = await db("products")
      .where("is_available", true)
      .select("*")
      .orderBy("name");

    // ✅ CONVERTER campos do banco para formato frontend
    const formattedProducts = products.map((product) => ({
      // Campos básicos
      id: product.id,
      name: product.name,
      description: product.description,
      category: product.category,

      // ✅ Campos numéricos com fallback
      basePrice: parseFloat(product.base_price) || 0,
      preparationTime: product.preparation_time || 15,

      // ✅ Campos booleanos
      isAvailable: product.is_available !== false,

      // ✅ Campos JSON parseados
      images: safeJsonParse(product.images, []),
      tags: safeJsonParse(product.tags, []),
      allowedSizes: safeJsonParse(product.allowed_sizes, []),
      allowedPasta: safeJsonParse(product.allowed_pasta),
      allowedSauces: safeJsonParse(product.allowed_sauces),
      allowedAddOns: safeJsonParse(product.allowed_add_ons),
      allowedExtras: safeJsonParse(product.allowed_extras),
    }));

    res.json({
      success: true,
      data: formattedProducts,
      count: formattedProducts.length,
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

    // ✅ APLICAR MESMA CONVERSÃO para produto individual
    const formattedProduct = {
      id: product.id,
      name: product.name,
      description: product.description,
      category: product.category,
      basePrice: parseFloat(product.base_price) || 0,
      preparationTime: product.preparation_time || 15,
      isAvailable: product.is_available !== false,
      images: safeJsonParse(product.images, []),
      tags: safeJsonParse(product.tags, []),
      allowedSizes: safeJsonParse(product.allowed_sizes, []),
      allowedPasta: safeJsonParse(product.allowed_pasta),
      allowedSauces: safeJsonParse(product.allowed_sauces),
      allowedAddOns: safeJsonParse(product.allowed_add_ons),
      allowedExtras: safeJsonParse(product.allowed_extras),
    };

    res.json({
      success: true,
      data: formattedProduct,
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
