const json = require("../components/json");
const dotenv = require("dotenv");
dotenv.config();
const Seat = require("../models/Seat");
const err = require("../utils/error");

class SeatController {
  getList = async (req, res) => {
    try {
      const idRoom = req.params.id;
      let rs = await Seat.list(idRoom);
      if (rs.length > 0) {
        return res.send(json(rs, true, err.GETLIST_SEATMAP_SUCCESS));
      } else {
        return res.send(json(rs, true, err.EMPTY_SEATMAP));
      }
    } catch (error) {
      return res.send(json(error, false, err.ERROR));
    }
  };
  getListRedSeat = async (req, res) => {
    try {
      const idRoom = req.params.id;
      let rs = await Seat.listRedSeat(idRoom);
      // console.log(rs)
      if (rs.length > 0) {
        return res.send(json(rs, true, err.BROKEN_SEAT_SUCCESS));
      } else {
        return res.send(json([], true, err.BROKEN_SEAT_SUCCESS));
      }
    } catch (error) {
      console.log(error)
      return res.send(json(error, false, err.ERROR));
    }
  };

  update = async (req, res) => {
    try {
      const idRoom = req.params.id;
      const { idSeat, idRow, idStatus } = req.body;
      let rs = await Seat.update(idRoom, idSeat, idRow, idStatus);
      if(rs[0]['']==1)
      return res.send(json(rs[0][''], true, err.SEAT_UPDATE_SUCCESS));
    } catch (error) {
      // console.log(error)
      return res.send(json(error, false, err.ERROR));
    }
  };
}
module.exports = new SeatController();
