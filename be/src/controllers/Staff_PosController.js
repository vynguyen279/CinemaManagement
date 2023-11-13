const json = require("../components/json");
const dotenv = require("dotenv");
dotenv.config();
const Staff_Pos = require("../models/Staff_Pos");
const err = require("../utils/error");

class StaffPos {
  getList = async (req, res) => {
    // try {
    const { idStaff } = req.body;
    let rs = await Staff_Pos.getHis(idStaff);
    if (rs.length > 0) {
      return res.send(json(rs, true, err.GETLIST_STAFFPOS_SUCCESS));
    } else {
      return res.send(json(rs, true, err.EMPTY_STAFFPOS));
    }
    //   } catch (error) {
    //     return res.send(json(error, false, "Có lỗi!"));
    //   }
  };
}
module.exports = new StaffPos();
