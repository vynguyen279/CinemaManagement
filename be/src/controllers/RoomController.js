const json = require("../components/json");
const dotenv = require("dotenv");
const error = require("../utils/error");
dotenv.config();
const Room = require("../models/Room");
const Seat = require("../models/Seat");
const Fac = require("../models/Facilities");
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
        return res.send(json([], true, error.ROOM_EMPTY));
      }
    } catch (e) {
      return res.send(json(e, false, error.ERROR));
    }
  };

  listActive = async (req, res) => {
    try {
      let rs = await Room.listActive();
      if (rs.length > 0) {
        return res.send(json(rs, true, error.GET_LIST_SUCCESS));
      } else {
        return res.send(json(rs, true, error.GET_LIST_EMPTY));
      }
    } catch (e) {
      return res.send(json(e, false, error.GET_LIST_FAIL));
    }
  };

  getHis = async (req, res) => {
    try {
      const idRoom = req.params.id;
      let rs = await Room.getHis(idRoom);
      if (rs.length > 0) {
        return res.send(json(rs, true, error.ROOM_GET_HIS));
      } else {
        return res.send(json([], true, error.GET_LIST_EMPTY));
      }
    } catch (e) {
      return res.send(json(e, false, error.ERROR));
    }
  };

  getHisDate = async (req, res) => {
    try {
      const idRoom = req.params.id;
      const { start, end } = req.body;
      let rs = await Room.getHisDate(idRoom, start, end);
      if (rs.length > 0) {
        return res.send(json(rs, true, error.ROOM_GET_HIS));
      } else {
        return res.send(json([], true, error.GET_LIST_EMPTY));
      }
    } catch (e) {
      return res.send(json(e, false, error.ERROR));
    }
  };

  update = async (req, res) => {
    try {
      const { idRoom, nameRoom, idStatus, img, capacity, row, col, note } =
        req.body;
      const { idBra } = req.body;
      let searchParams = [
        { name: "keyword", type: "Nvarchar(100)", value: nameRoom },
        { name: "idBranch", type: "Nchar(10)", value: idBra },
      ];
      let Params = [
        { name: "keyword", type: "Nvarchar(100)", value: idRoom },
        { name: "idBranch", type: "Nchar(10)", value: idBra },
      ];
      let paramsSeat = [
        { name: "idRoom", type: "Nchar(10)", value: idRoom },
        { name: "row", type: "int", value: row },
        { name: "col", type: "int", value: col },
      ];
      if (!nameRoom) {
        return res.send(json("", false, error.ROOM_NAME_EMPTY_ERROR));
      }

      let searchRoomByName = await Room.getList(searchParams);
      // console.log(searchRoomByName)

      if (searchRoomByName.recordset.length > 0) {
        if (
          searchRoomByName.recordset[0].nameRoom.toLowerCase() ==
            nameRoom.toLowerCase() &&
          searchRoomByName.recordset[0].idRoom != idRoom
        )
          return res.send(json([], false, error.ROOM_SAME_NAME_ERROR));
      }
      if (!capacity) {
        return res.send(json("", false, error.ROOM_CAPACITY_EMPTY_ERROR));
      }
      if (capacity < 0) {
        return res.send(json("", false, error.ROOM_CAPACITY_NEGATIVE_ERROR));
      }
      if (capacity > 676) {
        return res.send(json("", false, error.ROOM_CAPACITY_LIMIT_ERROR));
      }
      if (!row) {
        return res.send(json("", false, error.ROOM_ROW_EMPTY_ERROR));
      }
      if (row < 0) {
        return res.send(json("", false, error.ROOM_ROW_NEGATIVE_ERROR));
      }

      if (parseInt(row) > parseInt(capacity))
        return res.send(
          json([], false, error.ROOM_ROW_CAPACITY_ERROR + capacity + " !")
        );
      if (!col) {
        return res.send(json("", false, error.ROOM_COL_EMPTY_ERROR));
      }

      if (col < 0) {
        return res.send(json("", false, error.ROOM_COL_NEGATIVE_ERROR));
      }

      if (parseInt(col) > 1 && parseInt(capacity) / parseInt(row) == 1)
        return res.send(
          json([], false, error.ROOM_COL_ROW_ERROR + capacity / row + " !")
        );

      if (parseInt(col) > parseInt(capacity) / parseInt(row))
        return res.send(
          json(
            [],
            false,
            error.ROOM_COL_ROW_ERROR2 +
              Math.floor(parseInt(capacity) / parseInt(row)) +
              " !"
          )
        );
      if (!img) return res.send(json([], false, error.ROOM_IMG_EMPTY_ERROR));

      let searchRoomById = await Room.getList(Params);
      // console.log(searchRoomById.recordset[0].row)
      if(row != searchRoomById.recordset[0].row||col != searchRoomById.recordset[0].col){
        let deleteSeat = await Seat.delete(idRoom);
        let insertSeat = await Seat.insert(paramsSeat);
      }
      let rs = await Room.update(
        idRoom,
        nameRoom,
        idStatus,
        img,
        capacity,
        row,
        col,
        note
      );
      return res.send(json(rs, true, error.ROOM_UPDATE_SUCCESS));
    } catch (e) {
      return res.send(json(e, false, error.ROOM_UPDATE_FAIL));
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

      if (!nameRoom) {
        return res.send(json("", false, error.ROOM_NAME_EMPTY_ERROR));
      }

      let searchRoomByName = await Room.getList(searchParams);
      console.log(searchRoomByName);

      if (searchRoomByName.recordset.length > 0) {
        if (
          searchRoomByName.recordset[0].nameRoom.toLowerCase() ==
          nameRoom.toLowerCase()
        )
          return res.send(json([], false, error.ROOM_SAME_NAME_ERROR));
      }
      if (!capacity) {
        return res.send(json("", false, error.ROOM_CAPACITY_EMPTY_ERROR));
      }
      if (capacity > 676) {
        return res.send(json("", false, error.ROOM_CAPACITY_LIMIT_ERROR));
      }
      if (capacity < 0) {
        return res.send(json("", false, error.ROOM_CAPACITY_NEGATIVE_ERROR));
      }
      if (!row) {
        return res.send(json("", false, error.ROOM_ROW_EMPTY_ERROR));
      }
      if (row < 0) {
        return res.send(json("", false, error.ROOM_ROW_NEGATIVE_ERROR));
      }

      if (parseInt(row) > parseInt(capacity))
        return res.send(
          json([], false, error.ROOM_ROW_CAPACITY_ERROR + capacity + " !")
        );
      if (!col) {
        return res.send(json("", false, error.ROOM_COL_EMPTY_ERROR));
      }

      if (col < 0) {
        return res.send(json("", false, error.ROOM_COL_NEGATIVE_ERROR));
      }

      if (parseInt(col) > 1 && parseInt(capacity) / parseInt(row) == 1)
        return res.send(
          json([], false, error.ROOM_COL_ROW_ERROR + capacity / row + " !")
        );

      if (parseInt(col) > parseInt(capacity) / parseInt(row))
        return res.send(
          json(
            [],
            false,
            error.ROOM_COL_ROW_ERROR2 +
              Math.floor(parseInt(capacity) / parseInt(row)) +
              " !"
          )
        );
      if (!img) return res.send(json([], false, error.ROOM_IMG_EMPTY_ERROR));

      let rs = await Room.insert(
        nameRoom,
        idStatus,
        img,
        idBra,
        capacity,
        row,
        col
      );
      let params = [
        { name: "idRoom", type: "Nchar(10)", value: rs[0].idRoom },
        { name: "row", type: "int", value: row },
        { name: "col", type: "int", value: col },
      ];
      let data = await Seat.insert(params);
      return res.send(json(data, true, error.ROOM_SUCCESSS));
    } catch (err) {
      // console.log(error)
      return res.send(json(err, false, error.ERROR));
    }
  };

  delete = async (req, res) => {
    try {
      const { idRoom } = req.body;
      let rs = await Room.check(idRoom);
      if (rs.length > 0) {
        return res.send(json(rs, false, error.ROOM_DELETE_ERROR));
      } else {
        let seat = await Seat.delete(idRoom);
        let row = await Room.delete(idRoom);
        let fact = await Fac.delete(idRoom);
        return res.send(json(row, true, error.ROOM_DELETE_SUCCESS));
      }
    } catch (e) {
      return res.send(json(e, false, error.ROOM_DELETE_FAIL));
    }
  };

  chart = async (req, res) => {
    try {
      const { Year, Month, Key, Fac } = req.body;
      let params = [
        { name: "Year", type: "Int", value: Year },
        { name: "Month", type: "Int", value: Month },
        { name: "Key", type: "Int", value: Key },
        { name: "Fac", type: "Nchar(10)", value: Fac },
      ];
      const rs = await History.chart(params);
      if (rs.recordset == []) {
        return res.send(json(rs.recordset, false, error.CHART_FAIL));
      }
      return res.send(json(rs.recordset, true, ""));
    } catch (e) {
      return res.send(json(e, false, error.ERROR));
    }
  };
}
module.exports = new RoomController();
