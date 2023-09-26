const sql = require("mssql/msnodesqlv8");
const dotenv = require("dotenv").config();
const env = process.env;

const config = {
  user: env.DB_UNAME,
  password: env.DB_UPASS, //123
  server: env.DB_URI, //localhost
  database: env.DB_NAME,
  driver: "msnodesqlv8",
  connectionTimeout: 30000,
  // user: "sa",
  // password: "123", //123
  // server: "localhost", //localhost
  // database: "CinemaManagement",
  // driver: "msnodesqlv8",
  // connectionTimeout: 30000,
};

class SqlDB {
  query = async (queryStr) => {
    let pool = await sql.connect(config);
    return (await pool.request().query(queryStr)).recordset;
  };
  excute = async (proc, sqlParams) => {
    try {
      let pool = await sql.connect(config);
      let request = pool.request();
      sqlParams.forEach((param) => {
        request.input(param.name, param.type, param.value);
      });
      return await request
        .execute(proc)
        .then((record) => {
          return record;
        })
        .catch((err) => {
          return err.message;
        });
      // return (await request.execute(proc)).recordset;
    } catch (err) {
      return err.message;
    }
  };
}
const DB = new SqlDB();

module.exports = DB;
