const json = require("../components/json");
const dotenv = require("dotenv");
dotenv.config();
const Movie = require("../models/Movie");
const error = require("../utils/error");

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
        return res.send(json(rs, true, error.GET_LIST_SUCCESS));
      } else {
        return res.send(json(rs, true, error.GET_LIST_EMPTY));
      }
    } catch (e) {
      return res.send(json(e, false, error.GET_LIST_FAIL));
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
      if (!nameMovie) return res.send(json("", false, error.MOVIE_NAME_EMPTY));
      if (!proCountry)
        return res.send(json("", false, error.MOVIE_PROCOUNTRY_EMPTY));
      if (!preDate) return res.send(json("", false, error.MOVIE_PREDATE_EMPTY));
      if (!duration)
        return res.send(json("", false, error.MOVIE_DURATION_EMPTY));
      if (!director)
        return res.send(json("", false, error.MOVIE_DIRECTOR_EMPTY));
      if (!actor) return res.send(json("", false, error.MOVIE_ACTOR_EMPTY));
      if (!genre) return res.send(json("", false, error.MOVIE_GENRE_EMPTY));
      if (!img) return res.send(json("", false, error.ROOM_IMG_EMPTY_ERROR));
      if (!describe)
        return res.send(json("", false, error.MOVIE_DESCRIBE_EMPTY));
      if (new Date(String(preDate).split(":00Z")[0]) < new Date()) {
        return res.send(json("", false));
      }
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
      return res.send(json(rs, true, error.MOVIE_ADD_SUCCESS));
    } catch (e) {
      return res.send(json(e, false, error.MOVIE_ADD_FAIL));
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
      if (!nameMovie) return res.send(json("", false, error.MOVIE_NAME_EMPTY));
      if (!proCountry)
        return res.send(json("", false, error.MOVIE_PROCOUNTRY_EMPTY));
      if (!preDate) return res.send(json("", false, error.MOVIE_PREDATE_EMPTY));
      if (!duration)
        return res.send(json("", false, error.MOVIE_DURATION_EMPTY));
      if (!director)
        return res.send(json("", false, error.MOVIE_DIRECTOR_EMPTY));
      if (!actor) return res.send(json("", false, error.MOVIE_ACTOR_EMPTY));
      if (!genre) return res.send(json("", false, error.MOVIE_GENRE_EMPTY));
      if (!img) return res.send(json("", false, error.ROOM_IMG_EMPTY_ERROR));
      if (!describe)
        return res.send(json("", false, error.MOVIE_DESCRIBE_EMPTY));
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
      return res.send(json(rs, true, error.MOVIE_UPDATE_SUCCESS));
    } catch (e) {
      return res.send(json(e, false, error.MOVIE_UPDATE_FAIL));
    }
  };

  delete = async (req, res) => {
    try {
      const { idMovie } = req.body;
      let rs = await Movie.select(idMovie);
      if (rs.length > 0) {
        return res.send(json(rs, false, error.MOVIE_DELETE_ERROR));
      } else {
        let row = await Movie.delete(idMovie);
        return res.send(json(rs, true, error.MOVIE_DELETE_SUCCESS));
      }
    } catch (e) {
      return res.send(json(e, false, error.MOVIE_DELETE_FAIL));
    }
  };
}
module.exports = new MovieController();
