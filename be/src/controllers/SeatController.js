const json = require("../components/json");
const dotenv = require("dotenv");
dotenv.config();
const Seat = require("../models/Seat");

class SeatController {
  getList = async (req, res) => {
    try {
      const idRoom = req.params.id;
      let rs = await Seat.list(idRoom);
      if (rs.length > 0) {
        return res.send(json(rs, true, "Lấy sơ đồ chỗ ngồi thành công!"));
      } else {
        return res.send(json(rs, true, "Sơ đồ trống!"));
      }
    } catch (error) {
      return res.send(json(error, false, "Có lỗi!"));
    }
  };
  getListRedSeat = async (req, res) => {
    try {
      const idRoom = req.params.id;
      let rs = await Seat.listRedSeat(idRoom);
      // console.log(rs)
      if (rs.length > 0) {
        return res.send(json(rs, true, "Lấy ghế hư thành công!"));
      } else {
        return res.send(json(rs, false, "Có lỗi!"));
      }
    } catch (error) {
      console.log(error)
      return res.send(json(error, false, "Có lỗi!"));
    }
  };

  update = async (req, res) => {
    try {
      const idRoom = req.params.id;
      const { idSeat, idRow, idStatus } = req.body;
      let rs = await Seat.update(idRoom, idSeat, idRow, idStatus);
      return res.send(json(rs, true, "Cập nhật thành công!"));
    } catch (error) {
      return res.send(json(error, false, "Cập nhật thất bại do có lỗi!"));
    }
  };
}
module.exports = new SeatController();
