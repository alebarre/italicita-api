// app.js CORRETO:
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();

const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(morgan("combined"));
app.use(express.json({ limit: "10mb" }));

// ✅ ROTAS (USANDO ARQUIVOS EXISTENTES)
app.use("/api/payments", require("./routes/payments"));
app.use("/api/products", require("./routes/products"));
app.use("/api/orders", require("./routes/orders"));
app.use("/api/auth", require("./routes/auth"));

// Health check
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Backend running!",
    timestamp: new Date().toISOString(),
  });
});

// Error handlers (manter)
app.use("*", (req, res) => {
  res.status(404).json({ success: false, error: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error("🚨 Error:", err.stack);
  res.status(500).json({
    success: false,
    error:
      process.env.NODE_ENV === "production" ? "Internal error" : err.message,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🍝 Backend running on port ${PORT}`);
});
