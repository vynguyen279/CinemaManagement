const json = require("../components/json");
const dotenv = require("dotenv");
dotenv.config();
const Fac = require("../models/Facilities");

class FacController {
  getList = async (req, res) => {
    try {
      const idRoom = req.params.id;
      let rs = await Fac.getList(idRoom);
      if (rs.length > 0) {
        return res.send(json(rs, true, "Lấy danh sách thành công!"));
      } else {
        return res.send(json(rs, true, "Danh sách trống!"));
      }
    } catch (error) {
      return res.send(json(error, false, "Có lỗi!"));
    }
  };
  getListStatus = async (req, res) => {
    try {
      const idRoom = req.params.id;
      let rs = await Fac.getListStatus(idRoom);
      console.log(rs)
      if (rs.length > 0) {
        return res.send(json(rs, true, "Lấy danh sách thành công!"));
      } else {
        return res.send(json(rs, true, "Danh sách trống!"));
      }
    } catch (error) {
      return res.send(json(error, false, "Có lỗi!"));
    }
  };

  update = async (req, res) => {
    try {
      const idFac = req.params.id;
      const { nameFac, img } = req.body;
      let rs = await Fac.update(idFac, nameFac, img);
      return res.send(json(rs, true, "Cập nhật thành công!"));
    } catch (error) {
      return res.send(json(error, false, "Cập nhật thất bại do có lỗi!"));
    }
  };
  updateStatus = async (req, res) => {
    try {
      const idFac = req.params.id;
      const { idStatus} = req.body;
      let rs = await Fac.updateStatus(idFac, idStatus);
      return res.send(json(rs, true, "Cập nhật trạng thái thành công!"));
    } catch (error) {
      return res.send(json(error, false, "Cập nhật thất bại do có lỗi!"));
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
      let rs = await Fac.insert(params);
      if(rs.returnValue == 1){
        let rs2 = await Fac.updateStatus(rs.recordset[0].idFac, 1)
        // console.log(rs2)
        // if(rs2.status){
          return res.send(json(rs, true, "Thêm thành công!"));
        // }
      }
      else
      return res.send(json([], false, "CSVC này đã tồn tại trong phòng!"));
    } catch (error) {
      console.log(error)
      return res.send(json(error, false, "Thêm thất bại do có lỗi!"));
    }
  };

  delete = async (req, res) => {
    try {
      const idFac = req.params.id;
      let rs = await Fac.delete(idFac);
      
      return res.send(json(rs, true, "Xóa thành công!"));
    } catch (error) {
      console.log(error)
      return res.send(json(error, false, "Xóa thất bại do có lỗi!"));
    }
  };
}
module.exports = new FacController();
