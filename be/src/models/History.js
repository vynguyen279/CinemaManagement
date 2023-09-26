const DB = require("../utils/connection");

class History {
  constructor(idST, idRoom, dateHis, timeHis, idStatus) {
    this.idST = idST;
    this.idRoom = idRoom;
    this.dateHis = dateHis;
    this.timeHis = timeHis;
    this.idStatus = idStatus;
  }

  static insert(idST, idRoom, idStatus) {
    return DB.query(
      `INSERT INTO HISTORY(idST, idRoom, idStatus) VALUES ('${idST}', '${idRoom}', '${idStatus}')`
    );
  }
  static chart(params) {
    return DB.excute(`SP_CHART_ROOM`, params);
  }

  // static update(idST, idRoom) {
  //   return DB.query(
  //     `UPDATE HISTORY SET idStatus = 0 WHERE idST = '${idST}' AND idRoom = '${idRoom}'`
  //   );
  // }
}

module.exports = History;
