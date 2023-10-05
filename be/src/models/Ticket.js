const DB = require("../utils/connection");

class Ticket {
  constructor(idTic, nameTic, price) {
    this.idTic = idTic;
    this.nameTic = nameTic;
    this.price = price;
  }

  static check(idTic) {
    return DB.query(`SELECT * FROM SHOWTIME WHERE idTic = '${idTic}'`);
  }

  // static list() {
  //   return DB.query(`SELECT * FROM TICKET`);
  // }

  static list(params) {
    return DB.excute(`SP_SEARCH_TICKET`, params);
  }

  static updateTic(idTic, nameTic) {
    return DB.query(
      `UPDATE TICKET SET nameTic = N'${nameTic}' WHERE idTic = '${idTic}'`
    );
  }

  static insert(nameTic, price) {
    return DB.query(
      `INSERT INTO TICKET(nameTic, price) VALUES (N'${nameTic}', '${price}')`
    );
  }

  static delete(idTic) {
    return DB.query(`DELETE FROM TICKET WHERE idTic = '${idTic}'`);
  }
}

module.exports = Ticket;
