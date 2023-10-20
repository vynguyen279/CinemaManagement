const json = require("../components/json");
const dotenv = require("dotenv");
const error = require("../utils/error");
dotenv.config();
const Showtime = require("../models/Showtime");
const History = require("../models/History");

class ShowtimeController {
  getList = async (req, res) => {
    try {
      const { key, start, end, keyword, idBra } = req.body;
      let params = [
        { name: "key", type: "Bit", value: key },
        { name: "start", type: "Datetime", value: start },
        { name: "end", type: "Datetime", value: end },
        { name: "keyword", type: "Nvarchar(100)", value: keyword },
        { name: "idBra", type: "Nchar(10)", value: idBra },
      ];
      let rs = await Showtime.getList(params);
      console.log(rs);

      if (rs.recordset.length == 0) {
        return res.send(json([], true, ""));
      } else {
        return res.send(json(rs.recordset, true, ""));
      }
    } catch (error) {
      return res.send(json(error, false, "Có lỗi"));
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
      if (!idMovie) {
        return res.send(json("", false, error.ADDSHOWCASE_MOVIE_EMPTY_ERROR));
      }
      if (!showDateTime) {
        return res.send(
          json("", false, error.ADDSHOWCASE_DATETIME_EMPTY_ERROR)
        );
      }
      if (!idRoom) {
        return res.send(json("", false, error.ADDSHOWCASE_ROOM_EMPTY_ERROR));
      }
      if (!idTic) {
        return res.send(json("", false, error.ADDSHOWCASE_PRICE_EMPTY_ERROR));
      }
      if (new Date(String(showDateTime).split(":00Z")[0]) < new Date()) {
        return res.send(json("", false, error.ADDSHOWCASE_DATETIME_LATE_ERROR));
      }
      const rs = await Showtime.insert(idMovie, idTic, showDateTime);
      const row = await History.insert(rs[0].idST, idRoom, 1);
      return res.send(json(row, true, error.ADDSHOWCASE_SUCCESS));
    } catch (err) {
      return res.send(json(err, false, error.ERROR));
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
      return res.send(json(row, true, "Hủy lịch chiếu thành công!"));
    } catch (error) {
      return res.send(json(error, false, "Cập nhật thất bại do có lỗi!"));
    }
  };
}
module.exports = new ShowtimeController();
