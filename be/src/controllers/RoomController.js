const json = require("../components/json");
const dotenv = require("dotenv");
dotenv.config();
const Room = require("../models/Room");
const Seat = require("../models/Seat");
const History = require("../models/History");

class RoomController {
  getList = async (req, res) => {
    try {
      const { keyword, idBranch } = req.body;
      let params = [
        { name: "keyword", type: "Nvarchar(100)", value: keyword },
        { name: "idBranch", type: "Nchar(10)", value: idBranch },
      ];
      let rs = await Room.getList(params);
      // console.log(rs)
      if (rs.recordset.length == 0) {
        return res.send(json([], true, ""));
      } else {
        return res.send(json(rs.recordset, true, ""));
      }
    } catch (error) {
      console.log(error);
      return res.send(json(error, false, "Có lỗi"));
    }
  };

  getListEmpty = async (req, res) => {
    try {
      const { start, duration, idST, idBra } = req.body;
      let params = [
        { name: "start", type: "Datetime", value: start },
        { name: "duration", type: "Int", value: duration },
        { name: "idST", type: "Nchar(10)", value: idST },
        { name: "idBra", type: "Nchar(10)", value: idBra },
      ];
      let rs = await Room.getListEmpty(params);

      if (rs.recordset != []) {
        return res.send(json(rs.recordset, true, ""));
      } else {
        return res.send(json([], true, "Không có phòng trống!"));
      }
    } catch (error) {
      return res.send(json(error, false, "Có lỗi!"));
    }
  };

  listActive = async (req, res) => {
    try {
      let rs = await Room.listActive();
      if (rs.length > 0) {
        return res.send(json(rs, true, "Lấy danh sách thành công!"));
      } else {
        return res.send(json(rs, true, "Danh sách trống!"));
      }
    } catch (error) {
      return res.send(json(error, false, "Có lỗi!"));
    }
  };

  getHis = async (req, res) => {
    try {
      const idRoom = req.params.id;
      let rs = await Room.getHis(idRoom);
      if (rs.length > 0) {
        return res.send(
          json(rs, true, "Lấy danh sách lịch sử sử dụng thành công!")
        );
      } else {
        return res.send(json([], true, "Lịch sử trống!"));
      }
    } catch (error) {
      return res.send(json(error, false, "Có lỗi!"));
    }
  };

  getHisDate = async (req, res) => {
    try {
      const idRoom = req.params.id;
      const { start, end } = req.body;
      let rs = await Room.getHisDate(idRoom, start, end);
      if (rs.length > 0) {
        return res.send(
          json(rs, true, "Lấy danh sách lịch sử sử dụng thành công!")
        );
      } else {
        return res.send(json([], true, "Lịch sử trống!"));
      }
    } catch (error) {
      return res.send(json(error, false, "Có lỗi!"));
    }
  };

  update = async (req, res) => {
    try {
      const { idRoom, nameRoom, idStatus, img } = req.body;
      let rs = await Room.update(idRoom, nameRoom, idStatus, img);
      return res.send(json(rs, true, "Cập nhật thành công!"));
    } catch (error) {
      return res.send(json(error, false, "Cập nhật thất bại do có lỗi!"));
    }
  };

  insert = async (req, res) => {
    try {
      const { nameRoom, idStatus, img, idBra, capacity, row, col } = req.body;
      // const { nameRoom, idStatus, img, idBra, capacity, row, col } = req.body;
      let searchParams = [
        { name: "keyword", type: "Nvarchar(100)", value: nameRoom },
        { name: "idBranch", type: "Nchar(10)", value: idBra },
      ];

      let searchRoomByName = await Room.getList(searchParams);

      if (searchRoomByName.recordset.length > 0) {
        if (
          searchRoomByName.recordset[0].nameRoom.toLowerCase() ==
          nameRoom.toLowerCase()
        )
          return res.send(
            json(
              [],
              false,
              "Chi nhánh này đã có phòng tên ' " +
                nameRoom +
                " '. Vui lòng chọn tên khác!"
            )
          );
      }
      if (row > capacity)
        return res.send(
          json([], false, "Số hàng phải nhỏ hơn hoặc bằng " + capacity + " !")
        );

      if (col > capacity / row && capacity / row == 1)
        return res.send(
          json([], false, "Số cột phải bằng " + capacity / row + " !")
        );

      if (col > capacity / row)
        return res.send(
          json(
            [],
            false,
            "Số cột phải nhỏ hơn hoặc bằng " + Math.floor(capacity / row) + " !"
          )
        );

      let rs = await Room.insert(
        nameRoom,
        idStatus,
        img,
        idBra,
        capacity,
        row,
        col
      );
      let params = [{ name: "idRoom", type: "Nchar(10)", value: rs[0].idRoom }];
      let data = await Seat.insert(params);
      return res.send(json(data, true, "Thêm thành công!"));
    } catch (error) {
      // console.log(error)
      return res.send(json(error, false, "Thêm thất bại do có lỗi!"));
    }
  };

  delete = async (req, res) => {
    try {
      const { idRoom } = req.body;
      let rs = await Room.check(idRoom);
      if (rs.length > 0) {
        return res.send(
          json(rs, false, "Không được xóa!Phòng này có trong lịch chiếu")
        );
      } else {
        let row = await Room.delete(idRoom);
        return res.send(json(row, true, "Xóa thành công!"));
      }
    } catch (error) {
      return res.send(json(error, false, "Xóa thất bại do có lỗi!"));
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
      const rs = await History.chart(params);
      if (rs.recordset == []) {
        return res.send(json(rs.recordset, false, "Lấy biểu đồ thất bại!"));
      }
      return res.send(json(rs.recordset, true, ""));
    } catch (error) {
      return res.send(json(error, false, "Cập nhật thất bại do có lỗi!"));
    }
  };
}
module.exports = new RoomController();
