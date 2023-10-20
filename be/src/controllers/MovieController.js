const json = require("../components/json");
const dotenv = require("dotenv");
dotenv.config();
const Movie = require("../models/Movie");

class MovieController {
  list = async (req, res) => {
    try {
      const { keyword } = req.body;
      let params = [{ name: "keyword", type: "Nvarchar(100)", value: keyword }];
      let rs = await Movie.list(params);
      if (rs.recordset.length == 0) {
        return res.send(json([], true, ""));
      } else {
        return res.send(json(rs.recordset, true, ""));
      }
    } catch (error) {
      return res.send(json(error, false, "Có lỗi!"));
    }
  };

  listActive = async (req, res) => {
    try {
      let rs = await Movie.listActive();
      if (rs.length > 0) {
        return res.send(json(rs, true, "Lấy danh sách thành công!"));
      } else {
        return res.send(json(rs, true, "Danh sách trống!"));
      }
    } catch (error) {
      return res.send(json(error, false, "Lấy danh sách phim thất bại!"));
    }
  };
  insert = async (req, res) => {
    try {
      const {
        nameMovie,
        proCountry,
        preDate,
        duration,
        director,
        actor,
        genre,
        img,
        describe,
      } = req.body;
      let rs = await Movie.insert(
        nameMovie,
        proCountry,
        preDate,
        duration,
        director,
        actor,
        genre,
        img,
        describe
      );
      return res.send(json(rs, true, "Thêm phim thành công!"));
    } catch (error) {
      return res.send(json(error, false, "Thêm phim thất bại!"));
    }
  };

  update = async (req, res) => {
    try {
      const {
        idMovie,
        nameMovie,
        proCountry,
        preDate,
        duration,
        director,
        actor,
        genre,
        idStatus,
        img,
        describe,
      } = req.body;
      let rs = await Movie.updateMov(
        idMovie,
        nameMovie,
        proCountry,
        preDate,
        duration,
        director,
        actor,
        genre,
        idStatus,
        img,
        describe
      );
      return res.send(json(rs, true, "Cập nhật phim thành công!"));
    } catch (error) {
      return res.send(json(error, false, "Cập nhật thất bại do có lỗi!"));
    }
  };

  delete = async (req, res) => {
    try {
      const { idMovie } = req.body;
      let rs = await Movie.select(idMovie);
      if (rs.length > 0) {
        return res.send(
          json(rs, false, "Không được xóa phim đã có lịch chiếu!")
        );
      } else {
        let row = await Movie.delete(idMovie);
        return res.send(json(rs, true, "Xoá phim thành công!"));
      }
    } catch (error) {
      return res.send(json(error, false, "Xóa thất bại do có lỗi!"));
    }
  };
}
module.exports = new MovieController();
