const json = require("../components/json");
const dotenv = require("dotenv");
dotenv.config();
const Branch = require("../models/Branch");
const error = require("../utils/error");

class BranchController {
  getList = async (req, res) => {
    try {
      const { keyword } = req.body;
      const params = [
        { name: "keyword", type: "Nvarchar(100)", value: keyword },
      ];
      let rs = await Branch.list(params);
      if (rs.recordset.length == 0) {
        return res.send(json([], true, ""));
      } else {
        return res.send(json(rs.recordset, true, ""));
      }
    } catch (e) {
      return res.send(json(e, false, error.ERROR));
    }
  };

  insert = async (req, res) => {
    try {
      const { nameBra } = req.body;
      if (!nameBra) {
        return res.send(json("", false, error.BRANCH_NAME_EMPTY));
      }
      if (nameBra.length > 50) {
        return res, send(json("", false, error.BRANCH_NAME_LONG));
      }
      const params = [
        { name: "nameBra", type: "Nvarchar(50)", value: nameBra },
      ];
      let rs = await Branch.insert(params);
      if (rs.returnValue == 0) {
        return res.send(json(rs, false, error.BRANCH_NAME_EXISTS));
      } else {
        return res.send(json(rs, true, error.BRANCH_ADD_SUCCESS));
      }
    } catch (e) {
      return res.send(json(e, false, error.BRANCH_ADD_FAIL));
    }
  };

  update = async (req, res) => {
    try {
      const { idBra, nameBra } = req.body;
      if (!nameBra) {
        return res.send(json("", false, error.BRANCH_NAME_EMPTY));
      }
      if (nameBra.length > 50) {
        return res, send(json("", false, error.BRANCH_NAME_LONG));
      }
      const params = [
        { name: "idBra", type: "Nchar(10)", value: idBra },
        { name: "nameBra", type: "Nvarchar(50)", value: nameBra },
      ];
      let rs = await Branch.update(params);
      if (rs.returnValue == 0) {
        return res.send(json(rs, false, error.BRANCH_NAME_EXISTS));
      } else {
        return res.send(json(rs, true, error.BRANCH_UPDATE_SUCCESS));
      }
    } catch (e) {
      return res.send(json(e, false, error.BRANCH_UPDATE_FAIL));
    }
  };
  delete = async (req, res) => {
    try {
      const { idBra } = req.body;
      const params = [{ name: "idBra", type: "Nchar(10)", value: idBra }];
      let rs = await Branch.delete(params);
      if (rs.returnValue == 0) {
        return res.send(json(rs, false));
      } else {
        return res.send(json(rs, true, error.BRANCH_DELETE_SUCCESS));
      }
    } catch (e) {
      return res.send(json(e, false, error.BRANCH_DELETE_FAIL));
    }
  };
}
module.exports = new BranchController();
