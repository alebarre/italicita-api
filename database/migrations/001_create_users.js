exports.up = function (knex) {
  return knex.schema.createTable("users", function (table) {
    table.string("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table.string("name").notNullable();
    table.string("email").unique().notNullable();
    table.string("phone");
    table.text("address");
    table.string("password_hash").notNullable();
    table.timestamps(true, true);

    table.index("email");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
