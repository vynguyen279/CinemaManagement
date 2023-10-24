const json = require("../components/json");
const dotenv = require("dotenv");
dotenv.config();
const Fac = require("../models/Facilities");
const error = require("../utils/error");
class FacController {
  getList = async (req, res) => {
    try {
      const idRoom = req.params.id;
      let rs = await Fac.getList(idRoom);
      if (rs.length > 0) {
        return res.send(json(rs, true, error.GET_LIST_SUCCESS));
      } else {
        return res.send(json(rs, true, error.GET_LIST_EMPTY));
      }
    } catch (e) {
      return res.send(json(e, false, error.GET_LIST_FAIL));
    }
  };
  getListStatus = async (req, res) => {
    try {
      const idRoom = req.params.id;
      let rs = await Fac.getListStatus(idRoom);
      console.log(rs);
      if (rs.length > 0) {
        return res.send(json(rs, true, error.GET_LIST_SUCCESS));
      } else {
        return res.send(json(rs, true, error.GET_LIST_EMPTY));
      }
    } catch (e) {
      return res.send(json(e, false, error.GET_LIST_FAIL));
    }
  };

  update = async (req, res) => {
    try {
      const idFac = req.params.id;
      const { nameFac, img } = req.body;
      // let rs = await Fac.getList(idRoom);
      if (!img) return res.send(json([], false, error.ROOM_IMG_EMPTY_ERROR));
      if (!nameFac) return res.send(json("", false, error.FAC_NAME_EMPTY));
      if (nameFac.length > 30)
        return res.send(json("", false, error.FAC_NAME_LONG));
      let rs = await Fac.update(idFac, nameFac, img);
      return res.send(json(rs, true, error.FAC_UPDATE_SUCCESS));
    } catch (e) {
      return res.send(json(e, false, error.FAC_UPDATE_FAIL));
    }
  };
  updateStatus = async (req, res) => {
    try {
      const idFac = req.params.id;
      const { idStatus } = req.body;
      let rs = await Fac.updateStatus(idFac, idStatus);
      return res.send(json(rs, true, error.FAC_UPDATE_STATUS_SUCCESS));
    } catch (e) {
      return res.send(json(e, false, error.FAC_UPDATE_STATUS_FAIL));
    }
  };

  insert = async (req, res) => {
    try {
      const { nameFac, idRoom, img } = req.body;
      const params = [
        { name: "nameFac", type: "Nvarchar(30)", value: nameFac },
        { name: "idRoom", type: "nchar(10)", value: idRoom },
        { name: "img", type: "text", value: img },
      ];
      if (!img) return res.send(json([], false, error.ROOM_IMG_EMPTY_ERROR));
      if (!nameFac) return res.send(json("", false, error.FAC_NAME_EMPTY));
      if (nameFac.length > 30)
        return res.send(json("", false, error.FAC_NAME_LONG));
      let rs = await Fac.insert(params);
      if (rs.returnValue == 1) {
        let rs2 = await Fac.updateStatus(rs.recordset[0].idFac, 1);
        // console.log(rs2)
        // if(rs2.status){
        return res.send(json(rs, true, error.FAC_ADD_SUCCESS));
        // }
      } else return res.send(json([], false, error.FAC_EXISTS));
    } catch (e) {
      return res.send(json(e, false, error.FAC_ADD_FAIL));
    }
  };

  delete = async (req, res) => {
    try {
      const idFac = req.params.id;
      let r = await Fac.deleteFacHis(idFac);
      let rs = await Fac.delete(idFac);

      return res.send(json(rs, true, error.FAC_DELETE_SUCCESS));
    } catch (e) {
      return res.send(json(e, false, error.FAC_DELETET_FAIL));
    }
  };
}
module.exports = new FacController();
