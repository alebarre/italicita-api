const express = require("express");
const router = express.Router();

// POST /api/auth/login - Login mock para desenvolvimento
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Mock user - em produção, validar com banco de dados
    const mockUser = {
      id: "user-mock-id-123",
      name: "Usuário Demo",
      email: email,
      phone: "(11) 99999-9999",
      address: "Rua Italicita, 123 - São Paulo, SP",
    };

    res.json({
      success: true,
      data: {
        user: mockUser,
        token: "mock-jwt-token-for-development",
      },
      message: "Login successful (mock)",
    });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({
      success: false,
      error: "Login failed",
    });
  }
});

// POST /api/auth/register - Registro mock
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    const mockUser = {
      id: "user-mock-id-" + Date.now(),
      name,
      email,
      phone,
      address: "",
    };

    res.status(201).json({
      success: true,
      data: {
        user: mockUser,
        token: "mock-jwt-token-for-development",
      },
      message: "Registration successful (mock)",
    });
  } catch (error) {
    console.error("Error in registration:", error);
    res.status(500).json({
      success: false,
      error: "Registration failed",
    });
  }
});

module.exports = router;
