const express = require("express");
const router = express.Router();
const db = require("../config/database");

// POST /api/orders - Criar novo pedido
router.post("/", async (req, res) => {
  try {
    const { userId, items, total, paymentMethod, deliveryData } = req.body;

    // Validação básica
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        error: "Items are required",
      });
    }

    const [order] = await db("orders")
      .insert({
        user_id: userId,
        items: JSON.stringify(items),
        total,
        payment_method: paymentMethod,
        delivery_data: JSON.stringify(deliveryData),
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
    res.status(500).json({
      success: false,
      error: "Failed to create order",
    });
  }
});

// GET /api/orders/:id - Buscar pedido por ID
router.get("/:id", async (req, res) => {
  try {
    const order = await db("orders").where({ id: req.params.id }).first();

    if (!order) {
      return res.status(404).json({
        success: false,
        error: "Order not found",
      });
    }

    res.json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch order",
    });
  }
});

module.exports = router;
