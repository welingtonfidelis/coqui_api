import { Sequelize } from "sequelize";

const config = require("./config.js");

const NODE_ENV = process.env.NODE_ENV || "development";

export const sequelize = new Sequelize(config[NODE_ENV]);

sequelize.authenticate().then(() => {
  console.log("💾 Postgres Database connected");
});
