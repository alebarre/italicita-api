// src/config/database.js
const knex = require("knex");
const knexConfig = require("../../knexfile");

const db = knex(knexConfig.development);

// Testar conexão
db.raw("SELECT 1")
  .then(() => {
    console.log("✅ PostgreSQL conectado com sucesso!");
  })
  .catch((err) => {
    console.error("❌ Erro ao conectar com PostgreSQL:", err.message);
  });

module.exports = db;
