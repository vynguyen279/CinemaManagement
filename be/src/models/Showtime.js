const DB = require("../utils/connection");

class Showtime {
  constructor(idST, idMovie, idTic, idStatus, showDateTime) {
    this.idST = idST;
    this.idMovie = idMovie;
    this.idTic = idTic;
    this.idStatus = idStatus;
    this.showDateTime = showDateTime;
  }

  static getList(params) {
    return DB.excute(`SP_GET_LIST_SHOWTIME`, params);
  }

  static insert(idMovie, idTic, showDateTime) {
    return DB.query(`
      INSERT INTO SHOWTIME(idMovie, idTic, showDateTime ,idStatus) VALUES ('${idMovie}', '${idTic}', '${showDateTime}', 2)
      SELECT idST FROM SHOWTIME ORDER BY idST DESC
  `);
  }

  static updateStatus(params) {
    return DB.excute(`SP_UPDATE_SHOWTIME_STATUS`, params);
  }

  static cancel(idST) {
    return DB.query(`UPDATE SHOWTIME SET idStatus = 0 WHERE idST = '${idST}'`);
  }

  static chart(params) {
    return DB.excute(`SP_CHART_SHOWTIME`, params);
  }
  static updateInf(idST, idMovie, idTic, showDateTime) {
    return DB.query(
      `UPDATE SHOWTIME 
    SET idMovie = '${idMovie}',
    idTic = '${idTic}',
    showDateTime = '${showDateTime}'
    WHERE idST = '${idST}'`
    );
  }
}
module.exports = Showtime;
