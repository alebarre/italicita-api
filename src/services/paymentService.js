const paymentConfig = require("../config/paymentConfig");

class PaymentService {
  // Gerar dados do PIX (por enquanto mock, depois integra com gateway real)
  async generatePixPayment(orderId, amount, customerData = {}) {
    try {
      // Em produção, aqui integraria com:
      // - Mercado Pago
      // - PagSeguro
      // - GerenciaNet
      // - Etc.

      const payload = this.generateMockPixPayload(orderId, amount);

      return {
        success: true,
        data: {
          payload: payload.payload,
          qrCode: payload.qrCode,
          copyPaste: payload.copyPaste,
          expiration: new Date(
            Date.now() + paymentConfig.expirationTime * 1000
          ),
          orderId,
          amount,
          createdAt: new Date(),
        },
      };
    } catch (error) {
      console.error("Erro ao gerar PIX:", error);
      return {
        success: false,
        error: "Erro ao gerar código PIX",
      };
    }
  }

  // Mock temporário - depois substituir por integração real
  generateMockPixPayload(orderId, amount) {
    // Usando a mesma lógica do frontend por enquanto
    const pixData = {
      key: "12345678900", // CPF/CNPJ do restaurante
      recipient: paymentConfig.pix.merchantName,
      city: paymentConfig.pix.merchantCity,
      amount,
      orderId,
      description: `Pedido ${orderId} - Italicita Delivery`,
    };

    // Gerar payload mock (mesma lógica do frontend)
    const payload = `00020126580014br.gov.bcb.pix0136${
      pixData.key
    }5204000053039865802BR5909${pixData.recipient}6008${
      pixData.city
    }62140505${orderId}5406${amount.toFixed(2)}6304`;
    const crc = this.calculateCRC16(payload);

    return {
      payload: payload + crc,
      qrCode: payload + crc,
      copyPaste: this.formatCopyPasteCode(payload + crc),
    };
  }

  calculateCRC16(payload) {
    let crc = 0xffff;
    for (let i = 0; i < payload.length; i++) {
      crc ^= payload.charCodeAt(i) << 8;
      for (let j = 0; j < 8; j++) {
        crc = crc & 0x8000 ? (crc << 1) ^ 0x1021 : crc << 1;
      }
    }
    return (crc & 0xffff).toString(16).toUpperCase().padStart(4, "0");
  }

  formatCopyPasteCode(payload) {
    return payload.match(/.{1,50}/g).join("\n");
  }

  // Buscar configurações de pagamento
  getPaymentConfig() {
    return paymentConfig;
  }

  // Buscar informações de suporte
  getSupportInfo() {
    return {
      support: paymentConfig.support,
      operatingHours: paymentConfig.support.operatingHours,
    };
  }
}

module.exports = new PaymentService();
