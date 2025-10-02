exports.seed = async function (knex) {

  await knex.raw("TRUNCATE TABLE users RESTART IDENTITY CASCADE");

  await knex("users").insert([
    {
      id: "user-demo-1",
      name: "Cliente Demo",
      email: "cliente@demo.com",
      phone: "(11) 99999-9999",
      address: "Rua Italicita, 123 - São Paulo, SP",
      password_hash: "$2a$10$demoHashForTestingPurposesOnly",
    },
  ]);
};
