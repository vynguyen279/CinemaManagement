const DB = require("../utils/connection");

class Fac {
  constructor(idFac, nameFac, idStatus, idRoom) {
    this.idFac = idFac;
    this.nameFac = nameFac;
    this.idStatus = idStatus;
    this.idRoom = idRoom;
  }

  static getList(idRoom) {
    return DB.query(`SELECT * FROM FACILITIES WHERE idRoom = '${idRoom}'`);
  }

  static insert(idRoom, nameFac, idStatus, img) {
    return DB.query(
      `INSERT INTO FACILITIES(idRoom, nameFac, idStatus, img) VALUES ('${idRoom}', N'${nameFac}', '${idStatus}', '${img}')`
    );
  }
  static update(idFac, nameFac, idStatus, img) {
    return DB.query(
      `UPDATE FACILITIES SET nameFac = N'${nameFac}', idStatus = '${idStatus}', img = '${img}' WHERE idFac = '${idFac}'`
    );
  }
  static delete(idFac) {
    return DB.query(`DELETE FROM FACILITIES WHERE idFac = '${idFac}'`);
  }
}

module.exports = Fac;
