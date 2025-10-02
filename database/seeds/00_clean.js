exports.seed = async function (knex) {
  // Desabilitar verificação de FKs temporariamente
  await knex.raw("SET session_replication_role = replica;");

  // Limpar tabelas
  await knex("orders").del();
  await knex("users").del();
  await knex("products").del();

  // Re-habilitar FKs
  await knex.raw("SET session_replication_role = DEFAULT;");
};
