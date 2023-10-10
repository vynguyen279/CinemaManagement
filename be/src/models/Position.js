const DB = require("../utils/connection");

class Position {
  constructor(idPos, namePos) {
    this.idPos = idPos;
    this.namePos = namePos;
  }

  static list() {
    return DB.query(`SELECT * FROM POSITION WHERE idPos != 'PS00000001'`);
  }
}
module.exports = Position;
