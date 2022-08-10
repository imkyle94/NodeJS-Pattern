import mariadb from "mariadb";
import Sequelize from "sequelize";

export const pool = mariadb.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "1234",
  connectionLimit: 5,
});

console.log(pool);

export async function asyncFunction() {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query("SELECT 1 as val");
    console.log(rows); //[ {val: 1}, meta: ... ]
    const res = await conn.query("INSERT INTO myTable value (?, ?)", [
      1,
      "mariadb",
    ]);
    console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
  } catch (err) {
    throw err;
  } finally {
    if (conn) return conn.end();
  }
}

export const sequelize = new Sequelize({
  dialect: "mariadb",
  username: "root",
  password: "1234",
  port: "3306",
  host: "127.0.0.1",
  //   storage: "path/to/database.sqlite",
});

//connect
async function A() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

// A();
