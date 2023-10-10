const DB = require("../utils/connection");

class Branch {
  constructor(idBra, nameBra) {
    this.idBra = idBra;
    this.nameBra = nameBra;
  }

  static list(params) {
    return DB.excute(`SP_GET_LIST_BRANCH`, params);
  }

  static insert(params) {
    return DB.excute(`SP_INSERT_BRANCH`, params);
  }

}
module.exports = Branch;
