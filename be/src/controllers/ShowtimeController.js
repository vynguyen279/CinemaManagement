const json = require("../components/json");
const dotenv = require("dotenv");
dotenv.config();
const Showtime = require("../models/Showtime");
const History = require("../models/History");

class ShowtimeController {
  getList = async (req, res) => {
    try {
      const { key, start, end, keyword } = req.body;
      let params = [
        { name: "key", type: "Bit", value: key },
        { name: "start", type: "Datetime", value: start },
        { name: "end", type: "Datetime", value: end },
        { name: "keyword", type: "Nvarchar(100)", value: keyword },
      ];
      let rs = await Showtime.getList(params);

      if (rs.recordset.length == 0) {
        return res.send(json([], true, ""));
      } else {
        return res.send(json(rs.recordset, true, ""));
      }
    } catch (error) {
      return res.send(json(error, false, "Có lỗi!"));
    }
  };

  getListDate = async (req, res) => {
    try {
      const { start, end } = req.body;
      let rs = await Showtime.getListDate(start, end);
      if (rs.length > 0) {
        return res.send(json(rs, true, "Lấy danh sách thành công!"));
      } else {
        return res.send(json([], true, "Lịch sử trống!"));
      }
    } catch (error) {
      return res.send(json(error, false, "Có lỗi!"));
    }
  };

  updateStatus = async (req, res) => {
    try {
      const { idST, duration } = req.body;
      let params = [
        { name: "idST", type: "Nchar(10)", value: idST },
        { name: "duration", type: "Int", value: duration },
      ];
      const rs = await Showtime.updateStatus(params);
      return res.send(json(rs.returnValue, true, ""));
    } catch (error) {
      return res.send(json(error, false, "Cập nhật thất bại do có lỗi!"));
    }
  };

  chart = async (req, res) => {
    try {
      const { Year, Month, Key } = req.body;
      let params = [
        { name: "Year", type: "Int", value: Year },
        { name: "Month", type: "Int", value: Month },
        { name: "Key", type: "Int", value: Key },
      ];
      const rs = await Showtime.chart(params);
      if (rs.recordset == []) {
        return res.send(json(rs.recordset, false, "Lấy biểu đồ thất bại!"));
      }
      return res.send(json(rs.recordset, true, ""));
    } catch (error) {
      return res.send(json(error, false, "Cập nhật thất bại do có lỗi!"));
    }
  };

  insert = async (req, res) => {
    try {
      const { idMovie, idTic, showDateTime, idRoom } = req.body;
      const rs = await Showtime.insert(idMovie, idTic, showDateTime);
      const row = await History.insert(rs[0].idST, idRoom, 1);
      return res.send(json(row, true, "Thêm thành công!"));
    } catch (error) {
      return res.send(json(error, false, "Thêm thất bại do có lỗi!"));
    }
  };

  updateInf = async (req, res) => {
    // try {
    const { idST, idMovie, showDateTime, newRoom, oldRoom, idTic } = req.body;
    if (newRoom != oldRoom) {
      const row = await History.insert(idST, oldRoom, 0);
      setTimeout(async () => await History.insert(idST, newRoom, 1), 1000);
    }
    const rs = await Showtime.updateInf(idST, idMovie, idTic, showDateTime);
    return res.send(json(rs, true, "Cập nhật thành công!"));
    // } catch (error) {
    //   return res.send(json(error, false, "Cập nhật thất bại do có lỗi!"));
    // }
  };

  cancel = async (req, res) => {
    try {
      const { idST, idRoom } = req.body;
      const rs = await Showtime.cancel(idST);
      const row = await History.insert(idST, idRoom, 0);
      return res.send(json(row, true, "Hủy thành công!"));
    } catch (error) {
      return res.send(json(error, false, "Cập nhật thất bại do có lỗi!"));
    }
  };
}
module.exports = new ShowtimeController();
