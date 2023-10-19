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
  static getListStatus(idRoom) {
    return DB.query(`select * from FACILITIES,  (select distinct t.*
      from HIS_FAC t
      where t.dateHis = (select max(t1.dateHis) from HIS_FAC t1 where t1.idFac = t.idFac)) T 
      where idRoom='${idRoom}' and FACILITIES.idFac = T.idFac`);
  }

  static insert(idRoom, nameFac, img) {
    return DB.query(
      `INSERT INTO FACILITIES(idRoom, nameFac, img) VALUES ('${idRoom}', N'${nameFac}', '${img}')`
    );
  }
  static update(idFac, nameFac, img) {
    return DB.query(
      `UPDATE FACILITIES SET nameFac = N'${nameFac}', img = '${img}' WHERE idFac = '${idFac}'`
    );
  }
  static updateStatus(idFac, idStatus) {
    return DB.query(
      `INSERT INTO HIS_FAC(idFac, idStatus) VALUES ('${idFac}', '${idStatus}')`
    );
  }
  static delete(idFac) {
    return DB.query(`DELETE FROM FACILITIES WHERE idFac = '${idFac}'`);
  }
}

module.exports = Fac;
