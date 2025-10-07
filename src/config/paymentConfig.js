// Configurações do pagamento PIX
module.exports = {
  // Tempo de expiração do PIX em segundos (30 minutos)
  expirationTime: 30 * 60,

  // Instruções dinâmicas para o usuário
  instructions: [
    "Abra o app do seu banco",
    "Acesse a área PIX",
    "Escaneie o QR Code ou cole o código",
    "Confirme o pagamento",
    "Aguarde a confirmação automática",
  ],

  // Informações de suporte
  support: {
    phone: "(11) 99999-9999",
    whatsapp: "5511999999999",
    email: "suporte@italicita.com",
    operatingHours: "11:00 às 22:00",
  },

  // Configurações do PIX (em produção viriam de variáveis de ambiente)
  pix: {
    merchantName: "ITALICITA DELIVERY",
    merchantCity: "NITERÓI",
    currency: "986", // BRL
    countryCode: "BR",
  },
};
