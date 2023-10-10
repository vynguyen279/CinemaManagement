const DB = require("../utils/connection");

class Staff_Pos {
  constructor(idPos, idStaff, dayPro, timePro, idStatus) {
    this.idPos = idPos;
    this.idStaff = idStaff;
    this.dayPro = dayPro;
    this.timePro = timePro;
    this.idStatus = idStatus;
  }

  static select(idStaff) {
    return DB.query(
      `select Top 1 idPos, idBra from STAFF_POS where idStaff = '${idStaff}' order by dayPro DESC`
    );
  }

  static getHis(idStaff) {
    return DB.query(`SELECT s.dayPro, s.timePro, p.namePos, s.idStatus, b.nameBra
    FROM STAFF_POS as s 
	INNER JOIN  POSITION as p  ON  s.idPos = p.idPos 
	INNER JOIN BRANCH AS b	ON s.idBra = b.idBra
    WHERE idStaff = '${idStaff}'
    ORDER BY dayPro ASC`);
  }
}

module.exports = Staff_Pos;
