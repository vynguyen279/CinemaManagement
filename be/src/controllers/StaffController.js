const json = require("../components/json");
const dotenv = require("dotenv");
dotenv.config();
const mailer = require("nodemailer");
const Staff = require("../models/Staff");
const Staff_Pos = require("../models/Staff_Pos");

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
      return res.status(200).send(json("", true, "Đã gửi mail!"));
    } else {
      let info = await transporter.sendMail({
        from: "lethithuytrang20070805@gmail.com",
        to: email,
        subject: "Đã cấp quyền",
        text: "Bạn đã được cấp quyền!",
      });
    }
    return res.status(200).send(json("", true, "Đã gửi mail cấp quyền!"));
  };

  checkEmail = async (req, res) => {
    const { email } = req.body;
    try {
      let rs = await Staff.select(email);
      // const token = getToken(email, false, "PS00000003");
      // res.setHeader("Authorization", token);
      // res.setHeader("Access-Control-Expose-Headers", "*");
      if (rs.length > 0) {
        return res.send(json("", false, "Email đã tồn tại!"));
      } else {
        return res.send(json("", true, ""));
      }
    } catch (error) {
      return res.send(json(error, false, "Fail check!"));
    }
  };

  list = async (req, res) => {
    try {
      const { keyword, idBra } = req.body;
      let params = [
        { name: "keyword", type: "Nvarchar(100)", value: keyword },
        { name: "idBra", type: "Nchar(10)", value: idBra },
      ];

      let rs = await Staff.list(params);
      if (rs.recordset.length == 0) {
        return res.send(json([], true, ""));
      } else {
        return res.send(json(rs.recordset, true, ""));
      }
    } catch (error) {
      return res.send(json("", false, "Lấy danh sách thất bại!"));
    }
  };

  selectInf = async (req, res) => {
    try {
      const { idStaff } = req.body;
      let rs = await Staff.selectInf(idStaff);
      if (rs.length == 0) {
        return res.send(json(rs, false, "Nhân viên không tồn tại!"));
      } else {
        return res.send(json(rs, true, ""));
      }
    } catch (error) {
      return res.send(json(error, false, "Lấy thông tin thất bại do có lỗi!"));
    }
  };

  login = async (req, res) => {
    try {
      const { email, pass } = req.body;
      let rs = await Staff.select(email);
      if (rs.length == 0) {
        return res.send(json("", false, "Tài khoản không tồn tại"));
      }

      if (!compare(pass.trim(), rs[0].pass.trim())) {
        return res.send(json("", false, "Sai mật khẩu"));
      }

      if (!rs[0].idStatus) {
        return res.send(json("", false, "Tài khoản này đã bị khóa!"));
      }

      if (rs[0].idStatus == 2) {
        return res.send(json("", false, "Tài khoản này chưa được cấp quyền!"));
      }

      const {
        idStaff,
        name,
        dateBirth,
        citiIden,
        phone,
        address,
        sex,
        idStatus,
      } = rs[0];
      // get role
      let rows = await Staff_Pos.select(idStaff);
      const idPos = rows[0].idPos;
      const token = getToken(email, false, rows[0].idPos);
      const refreshToken = getRefeshToken(email, idPos);
      res.setHeader("Authorization", token);
      res.setHeader("Access-Control-Expose-Headers", "*");
      return res.send(
        json(
          {
            idPos,
            idStaff,
            name,
            dateBirth,
            citiIden,
            phone,
            address,
            sex,
            email,
            pass,
            idStatus,
          },
          true,
          "Đăng nhập thành công"
        )
      );
    } catch (error) {
      console.log(error);
      return res.send(error, false, "Đăng nhập thất bại do có lỗi");
    }
  };

  signUp = async (req, res) => {
    try {
      const { name, dateBirth, email, citiIden, phone, address, sex, pass } =
        req.body;

      let rs = await Staff.select(email);
      if (rs.length > 0) {
        return res.send(json(rs, false, "Email đã tồn tại!"));
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
      ];

      rs = await Staff.insert(params);
      let rs3 = await Staff.select(email);
      if (rs3.length > 0) {
        return res.send(
          json(
            rs,
            true,
            "Đăng ký thành công - Hệ thống sẽ gửi email cho bạn khi được Admin cấp quyền thành công!"
          )
        );
      } else {
        return res.send(json("", false, "Đăng ký thất bại!"));
      }
    } catch (error) {
      console.log(error);
      return res.send(json(error, false, "Đăng kí thất bại do có lỗi!"));
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
        return res.send(json(rs, true, "Cập nhật thành công!"));
      } else {
        return res.send(json(rs, false, "Cập nhật thất bại!"));
      }
    } catch (error) {
      return res.send(json("", false, "Cập nhật thất bại do có lỗi!"));
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
      let rs = await Staff.select(email);
      if (
        rs.length > 0 &&
        String(rs[0].idStaff).trim() !== String(idStaff).trim()
      ) {
        console.log(rs[0].idStaff);
        return res.send(json(rs, false, "Email đã tồn tại!"));
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
      return res.send(json(row, true, "Cập nhật thành công!"));
    } catch (error) {
      return res.send(json("", false, "Cập nhật thất bại do có lỗi1"));
    }
  };

  changePass = async (req, res) => {
    try {
      const { idStaff, pass, newPass } = req.body;
      let rs = await Staff.selectInf(idStaff);
      if (rs.length == 0) {
        return res.send(json(rs, false, "Không có tài khoản này"));
      }
      if (!compare(pass.trim(), rs[0].pass.trim())) {
        return res.send(json("", false, "Mật khẩu cũ sai!"));
      }
      const encodePass = encode(newPass);
      let row = await Staff.reset(rs[0].email, encodePass);
      return res.send(json(rs, true, "Đổi mật khẩu thành công!"));
    } catch (error) {
      return res.send(json(error, false, "Đổi mật khẩu thất bại do có lỗi!"));
    }
  };

  resetPass = async (req, res) => {
    const { email } = req.body;

    let rs = await Staff.select(email);

    if (rs.length == 0) {
      res.send(json("", false, "Email này chưa đăng ký tài khoản!"));
      return;
    }

    //random và mã hóa mật khẩu
    let mk = Date.now().toString(36);
    let pass = encode(mk);
    let rs2 = await Staff.reset(email, pass);
    console.log(
      "Cấp lại mật khẩu thành công, mật khẩu mới: " + mk + " " + pass
    );
    res.send(json(mk, true, "Vào mail để lấy mật khẩu mới!"));
  };
}

module.exports = new StaffController();
