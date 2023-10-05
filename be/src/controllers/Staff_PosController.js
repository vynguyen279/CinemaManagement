const json = require("../components/json");
const dotenv = require("dotenv");
dotenv.config();
const Staff_Pos = require("../models/Staff_Pos");

class StaffPos {
  getList = async (req, res) => {
    // try {
    const { idStaff } = req.body;
    let rs = await Staff_Pos.getHis(idStaff);
    if (rs.length > 0) {
      return res.send(json(rs, true, "Lấy lịch sử cấp quyền thành công!"));
    } else {
      return res.send(json(rs, true, "Lịch sử trống!"));
    }
    //   } catch (error) {
    //     return res.send(json(error, false, "Có lỗi!"));
    //   }
  };
}
module.exports = new StaffPos();
