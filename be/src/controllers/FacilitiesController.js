const json = require("../components/json");
const dotenv = require("dotenv");
dotenv.config();
const Fac = require("../models/Facilities");

class FacController {
  getList = async (req, res) => {
    try {
      const idRoom = req.params.id;
      let rs = await Fac.getList(idRoom);
      if (rs.length > 0) {
        return res.send(json(rs, true, "Lấy danh sách thành công!"));
      } else {
        return res.send(json(rs, true, "Danh sách trống!"));
      }
    } catch (error) {
      return res.send(json(error, false, "Có lỗi!"));
    }
  };

  update = async (req, res) => {
    try {
      const idFac = req.params.id;
      const { nameFac, idStatus, img } = req.body;
      let rs = await Fac.update(idFac, nameFac, idStatus, img);
      return res.send(json(rs, true, "Cập nhật thành công!"));
    } catch (error) {
      return res.send(json(error, false, "Cập nhật thất bại do có lỗi!"));
    }
  };

  insert = async (req, res) => {
    try {
      const idRoom = req.params.id;
      const { nameFac, idStatus, img } = req.body;
      let rs = await Fac.insert(idRoom, nameFac, idStatus, img);
      return res.send(json(rs, true, "Thêm thành công!"));
    } catch (error) {
      return res.send(json(error, false, "Thêm thất bại do có lỗi!"));
    }
  };

  delete = async (req, res) => {
    try {
      const idFac = req.params.id;
      let rs = await Fac.delete(idFac);
      return res.send(json(rs, true, "Xóa thành công!"));
    } catch (error) {
      return res.send(json(error, false, "Xóa thất bại do có lỗi!"));
    }
  };
}
module.exports = new FacController();
