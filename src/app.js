// src/app.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./config/database");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Italicita Backend running!",
    timestamp: new Date().toISOString(),
  });
});

// GET /api/products - Agora com dados reais do banco
app.get("/api/products", async (req, res) => {
  try {
    const products = await db("products")
      .where("is_available", true)
      .select("*")
      .orderBy("name");

    const safeJsonParse = (str, fallback = []) => {
      try {
        // Se já for um array/objeto, retorna diretamente
        if (Array.isArray(str) || typeof str === "object") return str;

        // Se for string vazia ou null, retorna fallback
        if (!str || str === "null") return fallback;

        // Tenta fazer parse JSON
        const parsed = JSON.parse(str);
        return parsed;
      } catch (error) {
        // Se falhar o parse, verifica se é uma string simples
        if (typeof str === "string" && str.startsWith("http")) {
          // É uma URL de imagem - retorna como array
          return [str];
        }
        // Se não for URL, retorna fallback
        console.warn("JSON parse error for:", str, "Using fallback:", fallback);
        return fallback;
      }
    };

    // Converter campos JSON string para objetos
    const formattedProducts = products.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      category: product.category,
      basePrice: parseFloat(product.base_price),
      images: safeJsonParse(product.images, []),
      isAvailable: product.is_available,
      preparationTime: product.preparation_time,
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

// POST /api/orders - Criar pedido no banco
app.post("/api/orders", async (req, res) => {
  try {
    const { userId, items, total, paymentMethod, deliveryData } = req.body;

    // ✅ CORREÇÃO: Validar e tratar userId
    let finalUserId = userId;

    // Se userId não for fornecido ou não existir, criar usuário temporário
    if (!finalUserId) {
      // Buscar ou criar usuário demo
      const [demoUser] = await db("users")
        .where({ email: "cliente@demo.com" })
        .select("id");

      if (demoUser) {
        finalUserId = demoUser.id;
      } else {
        // Criar usuário demo se não existir
        const [newUser] = await db("users")
          .insert({
            id: "user-demo-" + Date.now(),
            name: deliveryData?.name || "Cliente Demo",
            email: "cliente@demo.com",
            phone: deliveryData?.phone || "(11) 99999-9999",
            address: deliveryData?.address || "Endereço não informado",
            password_hash: "$2a$10$demoHashForTesting", // hash mock
          })
          .returning("id");

        finalUserId = newUser.id;
      }
    }

    // Validar se o usuário existe
    const userExists = await db("users").where({ id: finalUserId }).first();

    if (!userExists) {
      return res.status(400).json({
        success: false,
        error: "User not found",
      });
    }

    // Validação básica dos itens
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        error: "Items are required",
      });
    }

    const [order] = await db("orders")
      .insert({
        user_id: finalUserId, // ✅ Usar o userId validado
        items: JSON.stringify(items),
        total,
        payment_method: paymentMethod,
        delivery_data: JSON.stringify(deliveryData || {}),
        status: "pending",
        payment_status: "pending",
      })
      .returning("*");

    res.status(201).json({
      success: true,
      data: order,
      message: "Order created successfully",
    });
  } catch (error) {
    console.error("Error creating order:", error);

    // ✅ Melhor tratamento de erro
    if (error.code === "23503") {
      // Foreign key violation
      return res.status(400).json({
        success: false,
        error: "Invalid user reference",
      });
    }

    res.status(500).json({
      success: false,
      error: "Failed to create order",
    });
  }
});

// GET /api/orders/:id - Buscar pedido
app.get("/api/orders/:id", async (req, res) => {
  try {
    const order = await db("orders").where({ id: req.params.id }).first();

    if (!order) {
      return res.status(404).json({
        success: false,
        error: "Order not found",
      });
    }

    res.json({ success: true, data: order });
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch order",
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🍝 Italicita Backend running on port ${PORT}`);
  console.log(`📍 Health: http://localhost:${PORT}/health`);
  console.log(`📦 Products: http://localhost:${PORT}/api/products`);
});