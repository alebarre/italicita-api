require("dotenv").config();

module.exports = {
  development: {
    client: "pg",
    connection: {
      host: "localhost",
      port: 5432,
      user: "postgres",
      password: "password",
      database: "italicita_db",
    },
    migrations: {
      directory: "./database/migrations",
    },
    seeds: {
      directory: "./database/seeds",
      loadExtensions: [".js"],
    },
    pool: {
      min: 2,
      max: 10,
    },
  },
};
