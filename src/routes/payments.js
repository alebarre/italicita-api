const express = require("express");
const paymentController = require("../controllers/paymentController"); // ✅ Verificar este caminho

const router = express.Router();

// POST /api/payments/pix/generate - Gerar código PIX
router.post("/pix/generate", paymentController.generatePix); // ✅ paymentController deve existir

// GET /api/payments/config - Buscar configurações
router.get("/config", paymentController.getConfig); // ✅ paymentController deve existir

// GET /api/payments/support - Informações de suporte
router.get("/support", paymentController.getSupportInfo); // ✅ paymentController deve existir

// GET /api/payments/status/:orderId - Status do pagamento
router.get("/status/:orderId", paymentController.getPaymentStatus); // ✅ paymentController deve existir

module.exports = router;
