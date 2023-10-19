const DB = require("../utils/connection");

class Staff {
  constructor(
    idStaff,
    name,
    dateBirth,
    email,
    citiIden,
    phone,
    address,
    sex,
    pass
  ) {
    this.idStaff = idStaff;
    this.name = name;
    this.dateBirth = dateBirth;
    this.email = email;
    this.citiIden = citiIden;
    this.phone = phone;
    this.address = address;
    this.sex = sex;
    this.pass = pass;
  }

  static select(email) {
    return DB.query(`SELECT s.*, h.idStatus, h.idBra, h.idPos
    FROM STAFF as s
    LEFT JOIN STAFF_POS h ON s.idStaff  = h.idStaff 
      WHERE s.email = '${email}'
         AND h.dayPro = (
        SELECT MAX(dayPro)
        FROM STAFF_POS
        WHERE idStaff = s.idStaff
        )
      ORDER BY s.idStaff ASC`);
  }

  static selectInf(idStaff) {
    return DB.query(`SELECT * FROM STAFF WHERE idStaff = '${idStaff}'`);
  }
  // static list() {
  //   return DB.query(
  //     `SELECT s.idStaff,s.name, s.phone, s.email, s.address, s.citiIden, s.dateBirth,s.sex, s.idStatus, p.namePos, p.idPos
  //   FROM STAFF as s
  //   LEFT JOIN STAFF_POS h ON s.idStaff  = h.idStaff
  //   INNER JOIN POSITION p ON p.idPos = h.idPos
  //   WHERE s.idStaff != 'SF00000001' and h.dayPro = (
  //       SELECT MAX(dayPro)
  //       FROM STAFF_POS
  //       WHERE idStaff = s.idStaff
  //   )
  //   ORDER BY s.idStaff ASC`
  //   );
  // }

  static list(params) {
    return DB.excute(`SP_SEARCH_STAFF`, params);
  }

  static updateStaPos(params) {
    return DB.excute("SP_UPDATE_STATUS_STAFF", params);
  }

  // static updateStatus(idStaff, idStatus) {
  //   return DB.query(
  //     `UPDATE STAFF SET idStatus = '${idStatus}' WHERE idStaff ='${idStaff}'`
  //   );
  // }

  static updateInf(
    idStaff,
    name,
    email,
    dateBirth,
    citiIden,
    phone,
    address,
    sex
  ) {
    return DB.query(
      `UPDATE STAFF 
      SET name = N'${name}',
      email='${email}',
      dateBirth='${dateBirth}',
      citiIden='${citiIden}',
      phone='${phone}',
      address= N'${address}',
      sex='${sex}'
      WHERE idStaff = '${idStaff}' `
    );
  }

  static insert(params) {
    return DB.excute("SP_THEM_NHAN_VIEN", params);
  }

  static reset(email, pass) {
    return DB.query(
      `UPDATE STAFF SET pass = '${pass}' WHERE email ='${email}'`
    );
  }
}
module.exports = Staff;
