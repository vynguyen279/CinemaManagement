const json = require("../components/json");
const dotenv = require("dotenv");
dotenv.config();
const Position = require("../models/Position");
const error = require("../utils/error");

class PositionController {
  getList = async (req, res) => {
    try {
      let rs = await Position.list();
      return res.send(json(rs, true, ""));
    } catch (e) {
      return res.send(json(e, false, error.ERROR));
    }
  };
}
module.exports = new PositionController();
