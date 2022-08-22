//npx sequelize-auto -o "./models" -d dev_74 -h localhost -u root -p 3306 -x 1234 -e mysql -l esm

import mariadb from "mariadb";

import Sequelize from "sequelize";
import { sequelizeConfig } from "../config/sequelizeConfig.js";

export const sequelize = new Sequelize(sequelizeConfig);

export const pool = mariadb.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "1234",
  connectionLimit: 5,
});
