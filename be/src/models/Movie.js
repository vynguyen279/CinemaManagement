const DB = require("../utils/connection");

class Movie {
  constructor(
    idMovie,
    nameMovie,
    proCountry,
    preDate,
    duration,
    director,
    actor,
    genre,
    idStatus
  ) {
    this.idMovie = idMovie;
    this.nameMovie = nameMovie;
    this.proCountry = proCountry;
    this.preDate = preDate;
    this.duration = duration;
    this.director = director;
    this.actor = actor;
    this.genre = genre;
    this.idStatus = idStatus;
  }
  static select(idMovie) {
    return DB.query(`SELECT * FROM SHOWTIME WHERE idMovie = '${idMovie}'`);
  }
  static insert(
    nameMovie,
    proCountry,
    preDate,
    duration,
    director,
    actor,
    genre,
    img,
    describe
  ) {
    return DB.query(
      `INSERT INTO MOVIE(nameMovie, proCountry, preDate, duration, director, actor, genre, idStatus, img, describe)
      VALUES (N'${nameMovie}', N'${proCountry}', '${preDate}', '${duration}', N'${director}', N'${actor}', N'${genre}', 1, '${img}', N'${describe}')`
    );
  }
  static updateMov(
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
  ) {
    return DB.query(
      `UPDATE MOVIE 
      SET nameMovie = N'${nameMovie}',
      proCountry=N'${proCountry}',
      preDate='${preDate}',
      duration='${duration}',
      director= N'${director}',
      actor= N'${actor}',
      genre=N'${genre}',
      idStatus = '${idStatus}',
      img = '${img}',
      describe = N'${describe}'
      WHERE idMovie = '${idMovie}' `
    );
  }

  static delete(idMovie) {
    return DB.query(`DELETE FROM MOVIE WHERE idMovie = '${idMovie}'`);
  }
  static list(params) {
    return DB.excute(`SP_SEARCH_MOVIE`, params);
  }

  static listActive() {
    return DB.query(`SELECT * FROM MOVIE WHERE idStatus = 1`);
  }
}

module.exports = Movie;
