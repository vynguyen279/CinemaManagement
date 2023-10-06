const json = require("../components/json");
const dotenv = require("dotenv");
dotenv.config();
const Ticket = require("../models/Ticket");

class TicketController {
  getList = async (req, res) => {
    try {
      const { keyword } = req.body;
      const params = [
        { name: "Keyword", type: "Nvarchar(100)", value: keyword },
      ];
      let rs = await Ticket.list(params);
      if (rs.recordset.length == 0) {
        return res.send(json([], true, ""));
      } else {
        return res.send(json(rs.recordset, true, ""));
      }
    } catch (error) {
      return res.send(json(error, false, "Có lỗi!"));
    }
  };

  update = async (req, res) => {
    try {
      const { idTic, nameTic } = req.body;
      let rs = await Ticket.updateTic(idTic, nameTic);
      return res.send(json(rs, true, "Cập nhật thành công!"));
    } catch (error) {
      return res.send(json(error, false, "Cập nhật thất bại do có lỗi!"));
    }
  };

  insert = async (req, res) => {
    try {
      const { nameTic, price } = req.body;
      let rs = await Ticket.insert(nameTic, price);
      return res.send(json(rs, true, "Thêm thành công!"));
    } catch (error) {
      return res.send(json(error, false, "Giá vé là số!"));
    }
  };

  delete = async (req, res) => {
    try {
      const { idTic } = req.body;
      let rs = await Ticket.check(idTic);
      if (rs.length > 0) {
        return res.send(json(rs, false, "Không được xóa!"));
      } else {
        let row = await Ticket.delete(idTic);
        return res.send(json(row, true, "Xóa thành công!"));
      }
    } catch (error) {
      return res.send(json(error, false, "Xóa thất bại do có lỗi!"));
    }
  };
}
module.exports = new TicketController();