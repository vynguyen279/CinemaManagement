const DB = require("../utils/connection");

class Seat {
  constructor(idSeat, idRow, idRoom, idStatus) {
    this.idSeat = idSeat;
    this.idRow = idRow;
    this.idRoom = idRoom;
    this.idStatus = idStatus;
  }

  static list(idRoom) {
    return DB.query(`SELECT * FROM SEAT WHERE idRoom = '${idRoom}'`);
  }

  static insert(params) {
    return DB.excute(`SP_THEM_PHONG_GHE`, params);
  }

  static update(idRoom, idSeat, idRow, idStatus) {
    return DB.query(`UPDATE SEAT SET idStatus = '${idStatus}' 
    WHERE idRoom = '${idRoom}' AND idSeat = '${idSeat}' AND idRow = '${idRow}' `);
  }
}

module.exports = Seat;
