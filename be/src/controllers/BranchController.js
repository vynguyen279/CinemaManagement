const json = require("../components/json");
const dotenv = require("dotenv");
dotenv.config();
const Branch = require("../models/Branch");

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
    } catch (error) {
      return res.send(json(error, false, "Có lỗi!"));
    }
  };

  insert = async (req, res) => {
    try {
      const { nameBra } = req.body;
      const params = [
        { name: "nameBra", type: "Nvarchar(50)", value: nameBra },
      ];
      let rs = await Branch.insert(params);
      if (rs.returnValue == 0) {
        return res.send(json(rs, false, "Tên chi nhánh này đã tồn tại!"));
      } else {
        return res.send(json(rs, true, "Thêm chi nhánh thành công!"));
      }
    } catch (error) {
      return res.send(json(error, false, "Có lỗi!"));
    }
  };

  update = async (req, res) => {
    try {
      const { idBra, nameBra } = req.body;
      const params = [
        { name: "idBra", type: "Nchar(10)", value: idBra },
        { name: "nameBra", type: "Nvarchar(50)", value: nameBra },
      ];
      let rs = await Branch.update(params);
      if (rs.returnValue == 0) {
        return res.send(json(rs, false, "Tên chi nhánh này đã tồn tại!"));
      } else {
        return res.send(json(rs, true, "Cập nhật chi nhánh thành công!"));
      }
    } catch (error) {
      return res.send(json(error, false, "Cập nhật thất bại do có lỗi!"));
    }
  };
  delete = async (req, res) => {
    try {
      const { idBra } = req.body;
      const params = [{ name: "idBra", type: "Nchar(10)", value: idBra }];
      let rs = await Branch.delete(params);
      if (rs.returnValue == 0) {
        return res.send(json(rs, false, "Không được xóa chi nhánh!"));
      } else {
        return res.send(json(rs, true, "Xóa chi nhánh thành công!"));
      }
    } catch (error) {
      return res.send(json(error, false, "Xóa thất bại do có lỗi!"));
    }
  };
}
module.exports = new BranchController();
