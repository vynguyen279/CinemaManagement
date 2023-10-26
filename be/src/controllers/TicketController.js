const json = require("../components/json");
const dotenv = require("dotenv");
dotenv.config();
const Ticket = require("../models/Ticket");
const error = require("../utils/error");

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
    } catch (e) {
      return res.send(json(e, false, error.ERROR));
    }
  };

  update = async (req, res) => {
    try {
      const { idTic, nameTic } = req.body;
      if (!nameTic) return res.send(json("", false, error.TICKET_NAME_EMPTY));
      if (nameTic.length > 20)
        return res.send(json("", false, error.TICKET_NAME_LONG));
      let rs = await Ticket.updateTic(idTic, nameTic);
      return res.send(json(rs, true, error.TICKET_UPDATE_SUCCESS));
    } catch (e) {
      return res.send(json(e, false, error.TICKET_UPDATE_FAIL));
    }
  };

  insert = async (req, res) => {
    try {
      const { nameTic, price } = req.body;
      if (!nameTic) return res.send(json("", false, error.TICKET_NAME_EMPTY));
      if (!price) return res.send(json("", false, error.TICKET_PRICE_EMPTY));
      if (nameTic.length > 20)
        return res.send(json("", false, error.TICKET_NAME_LONG));
      if (isNaN(price)) {
        return res.send(json("", false, error.TICKET_PRICE_FORMAT));
      }
      let rs = await Ticket.insert(nameTic, price);
      return res.send(json(rs, true, error.TICKET_ADD_SUCCESS));
    } catch (e) {
      return res.send(json(e, false, error.TICKET_ADD_FAIL));
    }
  };

  delete = async (req, res) => {
    try {
      const { idTic } = req.body;
      let rs = await Ticket.check(idTic);
      if (rs.length > 0) {
        return res.send(json(rs, false, error.TICKET_DELETE_ERROR));
      } else {
        let row = await Ticket.delete(idTic);
        return res.send(json(row, true, error.TICKET_DELETE_SUCCESS));
      }
    } catch (e) {
      return res.send(json(e, false, error.TICKET_DELETE_FAIL));
    }
  };
}
module.exports = new TicketController();
