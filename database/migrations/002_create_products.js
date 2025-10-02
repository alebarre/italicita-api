exports.up = function (knex) {
  return knex.schema.createTable("products", function (table) {
    table.string("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table.string("name").notNullable();
    table.text("description");
    table.string("category").notNullable();
    table.decimal("base_price", 10, 2).notNullable();
    table.json("images").defaultTo("[]");
    table.boolean("is_available").defaultTo(true);
    table.integer("preparation_time").defaultTo(15);
    table.json("tags").defaultTo("[]");
    table.json("allowed_sizes").notNullable();
    table.timestamps(true, true);

    table.index("category");
    table.index("is_available");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("products");
};
