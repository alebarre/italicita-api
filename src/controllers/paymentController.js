const paymentService = require("../services/paymentService");

class PaymentController {
  // Gerar código PIX
  async generatePix(req, res) {
    try {
      const { orderId, amount, customerData } = req.body;

      // Validações
      if (!orderId || !amount) {
        return res.status(400).json({
          success: false,
          error: "orderId e amount são obrigatórios",
        });
      }

      if (amount <= 0) {
        return res.status(400).json({
          success: false,
          error: "Amount deve ser maior que zero",
        });
      }

      const result = await paymentService.generatePixPayment(
        orderId,
        amount,
        customerData
      );

      if (!result.success) {
        return res.status(500).json(result);
      }

      res.json(result);
    } catch (error) {
      console.error("Erro no controller generatePix:", error);
      res.status(500).json({
        success: false,
        error: "Erro interno do servidor",
      });
    }
  }

  // Buscar configurações de pagamento
  async getConfig(req, res) {
    try {
      const config = paymentService.getPaymentConfig();
      res.json({
        success: true,
        data: config,
      });
    } catch (error) {
      console.error("Erro no controller getConfig:", error);
      res.status(500).json({
        success: false,
        error: "Erro interno do servidor",
      });
    }
  }

  // Buscar informações de suporte
  async getSupportInfo(req, res) {
    try {
      const supportInfo = paymentService.getSupportInfo();
      res.json({
        success: true,
        data: supportInfo,
      });
    } catch (error) {
      console.error("Erro no controller getSupportInfo:", error);
      res.status(500).json({
        success: false,
        error: "Erro interno do servidor",
      });
    }
  }

  // Verificar status do pagamento (para depois)
  async getPaymentStatus(req, res) {
    try {
      const { orderId } = req.params;

      // Em produção, buscar do gateway de pagamento
      const status = "pending"; // pending, paid, expired, failed

      res.json({
        success: true,
        data: {
          orderId,
          status,
          lastChecked: new Date(),
        },
      });
    } catch (error) {
      console.error("Erro no controller getPaymentStatus:", error);
      res.status(500).json({
        success: false,
        error: "Erro interno do servidor",
      });
    }
  }
}

module.exports = new PaymentController();
