const DB = require("../utils/connection");

class Room {
  constructor(idRoom, nameRoom, idStatus, img) {
    this.idRoom = idRoom;
    this.nameRoom = nameRoom;
    this.idStatus = idStatus;
    this.img = img;
  }

  static check(idRoom) {
    return DB.query(`SELECT * FROM HISTORY WHERE idRoom = '${idRoom}'`);
  }

  static getList(params) {
    return DB.excute(`SP_SEARCH_ROOM`, params);
  }

  static getListEmpty(params) {
    return DB.excute(`SP_LAY_PHONG_TRONG`, params);
  }
  static checkActive() {
    return DB.query(`update ROOM set idStatus = 4 
    where idRoom in (select idRoom from V_SHOWTIME_MOVIE, HISTORY H WHERE H.idST = V_SHOWTIME_MOVIE.idST 
    AND GETDATE() BETWEEN showDateTime  AND (DATEADD(MINUTE, duration + 15, showDateTime)) AND V_SHOWTIME_MOVIE.idStatus!=0)
  
  `);
  }
  // if exists (select distinct ROOM.idRoom from V_SHOWTIME_MOVIE, HISTORY H, ROOM WHERE H.idST = V_SHOWTIME_MOVIE.idST
  //   AND ROOM.idRoom = H.idRoom
  //   AND GETDATE() > (DATEADD(MINUTE, duration + 15, showDateTime))
  //      and ROOM.idStatus=4)
  //   begin
  //     update ROOM set idStatus = 1 
  //     where idRoom in (select ROOM.idRoom from V_SHOWTIME_MOVIE, HISTORY H, ROOM WHERE H.idST = V_SHOWTIME_MOVIE.idST
  //   AND ROOM.idRoom = H.idRoom
  //   AND GETDATE() > (DATEADD(MINUTE, duration + 15, showDateTime))
  //     AND V_SHOWTIME_MOVIE.idStatus=3 and ROOM.idStatus=4)
  //   end

  static listActive() {
    return DB.query(`SELECT * FROM ROOM WHERE idStatus = 1`);
  }

  static getHis(idRoom) {
    return DB.query(
      `SELECT * FROM HISTORY WHERE idRoom = '${idRoom}'ORDER BY dateHis ASC`
    );
  }

  static getHisDate(idRoom, start, end) {
    return DB.query(
      `
      SELECT * FROM HISTORY 
      WHERE CAST(dateHis AS DATE) <= CAST('${end}' AS DATE) AND CAST(dateHis AS DATE) >= CAST('${start}' AS DATE) AND idRoom = '${idRoom}'
      ORDER BY dateHis ASC`
    );
  }

  static insert(nameRoom, idStatus, img, idBra, capacity, row, col) {
    return DB.query(
      `INSERT INTO ROOM(nameRoom, idStatus, img, idBra, capacity, row, col) VALUES (N'${nameRoom}', '${idStatus}' , '${img}', '${idBra}', '${capacity}', '${row}', '${col}')
      SELECT * FROM ROOM ORDER BY idRoom DESC`
    );
  }

  static update(idRoom, nameRoom, idStatus, img, capacity, row, col, note) {
    return DB.query(
      `UPDATE ROOM SET nameRoom = N'${nameRoom}', idStatus = '${idStatus}', img = '${img}',
      capacity = '${capacity}', row = '${row}', col = '${col}', note = N'${note}' WHERE idRoom = '${idRoom}'`
    );
  }
  static delete(idRoom) {
    return DB.query(
      `DELETE FROM SEAT WHERE idRoom = '${idRoom}'
      DELETE FROM FACILITIES WHERE idRoom = '${idRoom}'
    DELETE FROM ROOM WHERE idRoom = '${idRoom}'`
    );
  }
}

module.exports = Room;
