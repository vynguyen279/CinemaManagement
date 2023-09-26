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
      `select Top 1 idPos from STAFF_POS where idStaff = '${idStaff}' order by dayPro DESC`
    );
  }

  static getHis(idStaff) {
    return DB.query(`SELECT s.dayPro, s.timePro, p.namePos, s.idStatus 
    FROM STAFF_POS as s INNER JOIN  POSITION as p 
    ON idStaff = '${idStaff}' AND s.idPos = p.idPos
    ORDER BY dayPro ASC`);
  }
}

module.exports = Staff_Pos;
