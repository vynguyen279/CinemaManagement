const json = require("../components/json");
const dotenv = require("dotenv");
dotenv.config();
const Position = require("../models/Position");

class PositionController {
  getList = async (req, res) => {
    try {
      let rs = await Position.list();
      return res.send(json(rs, true, ""));
    } catch (error) {
      return res.send(json(error, false, "Có lỗi!"));
    }
  };
}
module.exports = new PositionController();
