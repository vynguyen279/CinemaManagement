const DB = require("./connection");

async function getId(email) {
  try {
    let [rows, field] = await DB.query(
      `SELECT * FROM STAFF WHERE idStaff = '${idStaff}'`
    );
    //idCustomer = rows[0].idCustomer;
    idStaff = rows[0].idStaff;
    return { idStaff };
  } catch (error) {
    return undefined;
  }
}

module.exports = getId;
