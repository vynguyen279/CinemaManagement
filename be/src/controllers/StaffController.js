const json = require("../components/json");
const dotenv = require("dotenv");
dotenv.config();
const mailer = require("nodemailer");
const Staff = require("../models/Staff");
const Staff_Pos = require("../models/Staff_Pos");
const error = require("../utils/error");

const { getToken, getRefeshToken } = require("../utils/token");
const { encode, compare } = require("../components/my-bcrypt");

class StaffController {
  sendEmail = async (req, res) => {
    const { email, mess } = req.body;

    var transporter = mailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "lethithuytrang20070805@gmail.com",
        pass: "vccowutfxsfinpsx",
      },
    });
    if (mess !== "") {
      let info = await transporter.sendMail({
        from: "lethithuytrang20070805@gmail.com",
        to: email,
        subject: "Thay đổi mật khẩu",
        text: "Mật khẩu mới: " + mess,
      });
      return res.status(200).send(json("", true, error.SEND_EMAIL_PASS));
    } else {
      let info = await transporter.sendMail({
        from: "lethithuytrang20070805@gmail.com",
        to: email,
        subject: "Đã cấp quyền",
        text: "Bạn đã được cấp quyền!",
      });
      return res.status(200).send(json("", true, error.SEND_EMAIL_UNLOCK));
    }
  };

  checkEmail = async (req, res) => {
    const { email } = req.body;
    try {
      let rs = await Staff.select(email);
      // const token = getToken(email, false, "PS00000003");
      // res.setHeader("Authorization", token);
      // res.setHeader("Access-Control-Expose-Headers", "*");
      if (rs.length > 0) {
        return res.send(json("", false, error.INF_EXISTED_EMAIL_ERROR));
      } else {
        return res.send(json("", true, ""));
      }
    } catch (e) {
      return res.send(json(e, false, error.ERROR));
    }
  };

  list = async (req, res) => {
    try {
      const { keyword, idBra, key } = req.body;
      let params = [
        { name: "keyword", type: "Nvarchar(100)", value: keyword },
        { name: "idBra", type: "Nchar(10)", value: idBra },
        { name: "key", type: "Int", value: key },
      ];

      let rs = await Staff.list(params);
      if (rs.recordset.length == 0) {
        return res.send(json([], true, ""));
      } else {
        return res.send(json(rs.recordset, true, ""));
      }
    } catch (e) {
      return res.send(json("", false, error.ERROR));
    }
  };

  selectInf = async (req, res) => {
    try {
      const { idStaff } = req.body;
      let rs = await Staff.selectInf(idStaff);
      if (rs.length == 0) {
        return res.send(json(rs, false, error.STAFF_NOT_EXISTS));
      } else {
        return res.send(json(rs, true, ""));
      }
    } catch (e) {
      return res.send(json(e, false, error.ERROR));
    }
  };

  login = async (req, res) => {
    try {
      const { email, pass } = req.body;
      let rs = await Staff.select(email);
      if (!email) {
        return res.send(json("", false, error.INF_EMAIL_EMPTY_ERROR));
      }
      if (!pass) {
        return res.send(json("", false, error.INF_PASSWORD_EMPTY_ERROR));
      }
      if (!/\S+@\S+\.\S+/.test(email)) {
        return res.send(json("", false, error.INF_EMAIL_FORMAT_ERROR));
      }
      if (rs.length == 0) {
        return res.send(json("", false, error.LOGIN_EMAIL_WRONG));
      }

      if (!compare(pass.trim(), rs[0].pass.trim())) {
        return res.send(json("", false, error.LOGIN_PASS_WRONG));
      }

      if (!rs[0].idStatus) {
        return res.send(json("", false, error.LOGIN_EMAIL_LOCK));
      }

      if (rs[0].idStatus == 2) {
        return res.send(json("", false, error.LOGIN_EMAIL_ERROR));
      }

      const token = getToken(email, false, rs[0].idPos);
      res.setHeader("Authorization", token);
      res.setHeader("Access-Control-Expose-Headers", "*");
      return res.send(json(rs[0], true, error.LOGIN_SUCCESS));
    } catch (e) {
      return res.send(e, false, error.LOGIN_FAIL);
    }
  };

  signUp = async (req, res) => {
    try {
      const {
        name,
        dateBirth,
        email,
        citiIden,
        phone,
        address,
        sex,
        pass,
        repass,
      } = req.body;

      if (!name) {
        return res.send(json("", false, error.INF_NAME_EMPTY_ERROR));
      }
      if (name.length > 50) {
        return res.send(json("", false, error.INF_LONG_NAME_ERROR));
      }
      if (!email) {
        return res.send(json("", false, error.INF_EMAIL_EMPTY_ERROR));
      }
      if (email.length > 50) {
        return res.send(json("", false, error.INF_LONG_EMAIL_ERROR));
      }
      if (!/\S+@\S+\.\S+/.test(email)) {
        return res.send(json("", false, error.INF_EMAIL_FORMAT_ERROR));
      }

      let rs = await Staff.select(email);
      if (rs.length > 0) {
        return res.send(json(rs, false, error.INF_EXISTED_EMAIL_ERROR));
      }

      if (!phone) {
        return res.send(json("", false, error.INF_PHONE_EMPTY_ERROR));
      }
      if (!/([\+84]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/.test(phone)) {
        return res.send(json("", false, error.INF_PHONE_FORMAT_ERROR));
      }
      if (!citiIden) {
        return res.send(json("", false, error.INF_ID_EMPTY_ERROR));
      }
      if (isNaN(citiIden) || citiIden.length !== 12) {
        return res.send(json("", false, error.INF_ID_FORMAT_ERROR));
      }
      if (!address) {
        return res.send(json("", false, error.INF_ADDRESS_EMPTY_ERROR));
      }

      if (address.length > 50) {
        return res.send(json("", false, error.INF_LONG_ADDRESS_ERROR));
      }
      if (!dateBirth) {
        return res.send(json("", false, error.INF_BIRTHDAY_EMPTY_ERROR));
      }
      let date = new Date().toLocaleString()
      // let year = new Date().toLocaleString("default", { year: "numeric" });
      if (new Date(dateBirth).toLocaleString()>=date) {
        return res.send(json("", false, error.INF_BIRTHDAY_FUTURE_ERROR));;
      }

      if (pass !== null && repass !== null) {
        if (!pass) {
          return res.send(json("", false, error.INF_PASSWORD_EMPTY_ERROR));
        }
        if (pass.length < 8 || pass.length > 12) {
          return res.send(json("", false, error.INF_PASSWORD_FORMAT_ERROR));
        }
        // console.log(rePass)
        if (!repass) {
          return res.send(json("", false, error.INF_REPASS_EMPTY_ERROR));
        }
        if (repass != pass) {
          return res.send(json("", false, error.INF_REPASS_ERROR));
        }
        let encodePass = encode(pass);
        let params = [
          { name: "name", type: "Nvarchar(50)", value: name },
          { name: "dateBirth", type: "Date", value: dateBirth },
          { name: "email", type: "Varchar(50)", value: email },
          { name: "citiIden", type: "Char(12)", value: citiIden },
          { name: "phone", type: "Char(12)", value: phone },
          { name: "address", type: "Nvarchar(50)", value: address },
          { name: "sex", type: "Bit", value: sex },
          { name: "pass", type: "Varchar(200)", value: encodePass },
          { name: "repass", type: "Varchar(200)", value: repass },
        ];
        let rs = await Staff.insert(params);
        let rs3 = await Staff.select(email);
        if (rs3.length > 0) {
          return res.send(json(rs, true, error.INF_SUCCESS));
        } else {
          return res.send(json("", false, error.INF_FAIL));
        }
      } else {
        // console.log("nopass")
        return res.send(json("", true, ""));
      }
    } catch (err) {
      console.log(err);
      return res.send(json(err, false, error.ERROR));
    }
  };
  updateStaPos = async (req, res) => {
    try {
      const { idStaff, idPos, idStatus, idBra } = req.body;
      let params = [
        { name: "idStaff", type: "Nchar(10)", value: idStaff },
        { name: "idPos", type: "Nchar(10)", value: idPos },
        { name: "idStatus", type: "Int", value: idStatus },
        { name: "idBra", type: "Nchar(10)", value: idBra },
      ];

      const rs = await Staff.updateStaPos(params);
      if (rs.rowsAffected.length > 0) {
        return res.send(json(rs, true, error.STAFF_UPDATE_SUCCESS));
      } else {
        return res.send(json(rs, false, error.STAFF_UPDATE_FAIL));
      }
    } catch (e) {
      return res.send(json(e, false, error.STAFF_UPDATE_FAIL));
    }
  };
  // updateStatus = async (req, res) => {
  //   try {
  //     const { idStaff, idStatus } = req.body;

  //     const rs = await Staff.updateStatus(idStaff, idStatus);
  //     return res.send(json(rs, true, "Cập nhật thành công!"));
  //   } catch (error) {
  //     return res.send(json(error, false, "Cập nhật thất bại do có lỗi!"));
  //   }
  // };

  updateInf = async (req, res) => {
    try {
      const { idStaff, name, email, citiIden, address, phone, dateBirth, sex } =
        req.body;
      if (!name) {
        return res.send(json("", false, error.INF_NAME_EMPTY_ERROR));
      }
      if (name.length > 50) {
        return res.send(json("", false, error.INF_LONG_NAME_ERROR));
      }
      if (!email) {
        return res.send(json("", false, error.INF_EMAIL_EMPTY_ERROR));
      }
      if (email.length > 50) {
        return res.send(json("", false, error.INF_LONG_EMAIL_ERROR));
      }
      if (!/\S+@\S+\.\S+/.test(email)) {
        return res.send(json("", false, error.INF_EMAIL_FORMAT_ERROR));
      }

      let rs = await Staff.select(email);
      if (
        rs.length > 0 &&
        String(rs[0].idStaff).trim() !== String(idStaff).trim()
      ) {
        return res.send(json(rs, false, error.INF_EXISTED_EMAIL_ERROR));
      }

      if (!phone) {
        return res.send(json("", false, error.INF_PHONE_EMPTY_ERROR));
      }
      if (!/([\+84]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/.test(phone)) {
        return res.send(json("", false, error.INF_PHONE_FORMAT_ERROR));
      }
      if (!citiIden) {
        return res.send(json("", false, error.INF_ID_EMPTY_ERROR));
      }
      if (isNaN(citiIden) || citiIden.length !== 12) {
        return res.send(json("", false, error.INF_ID_FORMAT_ERROR));
      }
      if (!address) {
        return res.send(json("", false, error.INF_ADDRESS_EMPTY_ERROR));
      }

      if (address.length > 50) {
        return res.send(json("", false, error.INF_LONG_ADDRESS_ERROR));
      }
      if (!dateBirth) {
        return res.send(json("", false, error.INF_BIRTHDAY_EMPTY_ERROR));
      }
      let date = new Date().toLocaleString()
      // let year = new Date().toLocaleString("default", { year: "numeric" });
      if (new Date(dateBirth).toLocaleString()>=date) {
        return res.send(json("", false, error.INF_BIRTHDAY_FUTURE_ERROR));;
      }

      let row = await Staff.updateInf(
        idStaff,
        name,
        email,
        dateBirth,
        citiIden,
        phone,
        address,
        sex
      );
      return res.send(json(row, true, error.INF_UPDATE_SUCCESS));
    } catch (e) {
      return res.send(json("", false, error.INF_UPDATE_FAIL));
    }
  };

  changePass = async (req, res) => {
    try {
      const { idStaff, pass, newPass, rePass } = req.body;
      let rs = await Staff.selectInf(idStaff);
      if (rs.length == 0) {
        return res.send(json(rs, false, error.LOGIN_EMAIL_WRONG));
      }
      if (!pass) {
        return res.send(json("", false, error.PASS_OLD_EMPTY));
      }
      if (!newPass || !rePass) {
        return res.send(json("", false, error.PASS_NEW_EMPTY));
      }
      if (newPass !== rePass) {
        return res.send(json("", false, error.PASS_REPASS_WRONG));
      }
      if (!compare(pass.trim(), rs[0].pass.trim())) {
        return res.send(json("", false, error.PASS_OLD_WRONG));
      }
      if (newPass.length < 8 || newPass.length > 12) {
        return res.send(json("", false, error.INF_PASSWORD_FORMAT_ERROR));
      }
      const encodePass = encode(newPass);
      let row = await Staff.reset(rs[0].email, encodePass);
      return res.send(json(rs, true, error.PASS_CHANGE_SUCCESS));
    } catch (e) {
      return res.send(json(e, false, error.PASS_CHANGE_FAIL));
    }
  };

  resetPass = async (req, res) => {
    const { email } = req.body;

    let rs = await Staff.select(email);
    if (!email) {
      return res.send(json("", false, error.INF_EMAIL_EMPTY_ERROR));
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return res.send(json("", false, error.INF_EMAIL_FORMAT_ERROR));
    }
    if (rs.length == 0) {
      res.send(json("", false, error.LOGIN_EMAIL_WRONG));
      return;
    }
    //random và mã hóa mật khẩu
    let mk = Date.now().toString(36);
    let pass = encode(mk);
    let rs2 = await Staff.reset(email, pass);
    res.send(json(mk, true, ""));
  };
}

module.exports = new StaffController();
