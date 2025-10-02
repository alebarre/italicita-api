exports.up = function (knex) {
  return knex.schema.createTable("orders", function (table) {
    table.string("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table.string("user_id").references("id").inTable("users");
    table.json("items").notNullable(); // Array de CartItems
    table.decimal("total", 10, 2).notNullable();
    table.string("status").defaultTo("pending");
    table.string("payment_status").defaultTo("pending");
    table.string("payment_method").notNullable();
    table.json("delivery_data").notNullable();
    table.timestamps(true, true);

    table.index("user_id");
    table.index("status");
    table.index("created_at");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("orders");
};
