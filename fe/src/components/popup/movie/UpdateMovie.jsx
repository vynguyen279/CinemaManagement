import React, { useState } from "react";
import { Modal, ModalHeader, Input } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareXmark } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

import { updateMov } from "../../../utils/services";
import "../../../styles/share.css";
import "../style.css";
import uploadImg from "../../../utils/mail";

const UpdateMovie = (props) => {
  const [data, setData] = useState({
    idMovie: props.item.idMovie,
    nameMovie: props.item.nameMovie,
    proCountry: props.item.proCountry,
    preDate: props.item.preDate,
    duration: props.item.duration,
    director: props.item.director,
    actor: props.item.actor,
    genre: props.item.genre,
    idStatus: props.item.idStatus,
    img: props.item.img,
    describe: props.item.describe,
  });

  const updateStatus = async (e) => {
    e.preventDefault();
    // if (
    //   data.actor == "" ||
    //   data.describe == "" ||
    //   data.director == "" ||
    //   data.duration == "" ||
    //   data.genre == "" ||
    //   data.idMovie == "" ||
    //   data.idStatus == "" ||
    //   data.img == "" ||
    //   data.img == "" ||
    //   (data.nameMovie == "") | (data.preDate == "") ||
    //   data.proCountry == ""
    // ) {
    //   toast.error("Không được để trống thông tin phim!");
    // }
    const rs = await updateMov(data);
    if (!rs.status) {
      return;
    } else {
      setTimeout(() => window.location.reload(), 1500);
    }
    props.sendData(false);
  };

  const handleDataChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleUploadImage = (e) => {
    uploadImg(e.target.files[0]).then((rs) => setData({ ...data, img: rs }));
  };

  return (
    <Modal
      isOpen={props.show}
      backdrop="static"
      keyboard={false}
      className="modal"
    >
      <div className="modal-box-large">
        <ModalHeader closeButton className="header-modal">
          <div className="modal-title">Chỉnh sửa</div>
          <FontAwesomeIcon
            icon={faSquareXmark}
            onClick={() => {
              props.sendData(false);
            }}
            className="icon"
          />
        </ModalHeader>
        <div className="status" style={{ marginBottom: "0px" }}>
          <div className="frame-gener">
            <div className="frame-fill-row">
              <label htmlFor="staffImg" style={{ marginTop: "30px" }}>
                <img
                  src={data.img}
                  alt=""
                  name="img"
                  onChange={handleDataChange}
                  value={data.img}
                  width="250"
                />
                <input
                  type="file"
                  id="staffImg"
                  className="font-text frame-chevron"
                  style={{ display: "none" }}
                  onChange={handleUploadImage}
                  placeholder="Upload"
                />
              </label>
              <div className="frame-status" style={{ marginTop: "20px" }}>
                <div className="font-text">Trạng thái</div>
                <select
                  className="font-text frame-chevron"
                  value={data.idStatus}
                  onChange={(e) =>
                    setData({ ...data, idStatus: e.target.value })
                  }
                >
                  <option value={0}>Ngừng chiếu</option>
                  <option value={1}>Họat động</option>
                </select>
              </div>
            </div>

            <div className="frame-fill-row">
              <div className="fill-row">
                <div className="frame-status margin-content">
                  <div className="font-text">Tên phim</div>
                  <input
                    type="text"
                    className="font-text frame-chevron"
                    name="nameMovie"
                    id="nameMovie"
                    onChange={(e) => handleDataChange(e)}
                    value={data.nameMovie}
                  />
                </div>
                <div className="frame-status margin-content">
                  <div className="font-text">Nước sản xuất</div>
                  <input
                    type="text"
                    className="font-text frame-chevron"
                    name="proCountry"
                    id="proCountry"
                    onChange={(e) => handleDataChange(e)}
                    value={data.proCountry}
                  />
                </div>
              </div>
              <div className="fill-row">
                <div className="frame-status margin-content">
                  <div className="font-text">Ngày khởi chiếu</div>
                  <input
                    type="text"
                    className="font-text frame-chevron"
                    name="preDate"
                    id="preDate"
                    onFocus={(e) => (e.target.type = "date")}
                    value={String(data.preDate).split("T")[0]}
                    onChange={(e) => handleDataChange(e)}
                  />
                </div>
                <div className="frame-status margin-content">
                  <div className="font-text">Thời lượng</div>
                  <input
                    type="number"
                    className="font-text frame-chevron"
                    name="duration"
                    id="duration"
                    value={data.duration}
                    onChange={(e) => handleDataChange(e)}
                  />
                </div>
              </div>
              <div className="fill-row">
                <div className="frame-status margin-content">
                  <div className="font-text">Đạo diễn</div>
                  <input
                    type="text"
                    className="font-text frame-chevron"
                    name="director"
                    id="director"
                    value={data.director}
                    onChange={(e) => handleDataChange(e)}
                  />
                </div>
                <div className="frame-status margin-content">
                  <div className="font-text">Diễn viên</div>
                  <input
                    type="text"
                    className="font-text frame-chevron"
                    name="actor"
                    id="actor"
                    value={data.actor}
                    onChange={(e) => handleDataChange(e)}
                  />
                </div>
              </div>
              <div className="fill-row">
                <div className="frame-status margin-content">
                  <div className="font-text">Thể loại</div>
                  <input
                    type="text"
                    className="font-text frame-chevron"
                    name="genre"
                    id="genre"
                    value={data.genre}
                    onChange={(e) => handleDataChange(e)}
                  />
                </div>
                <div className="frame-status margin-content">
                  <div className="font-text">Mô tả</div>
                  <textarea
                    type="text"
                    className="font-text frame-chevron"
                    style={{ height: "100px", width: "350px" }}
                    name="describe"
                    rows={4}
                    onChange={(e) => handleDataChange(e)}
                    value={data.describe}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="out-input" style={{ marginTop: "0px" }}>
          <button
            type="submit"
            className="btn-confirm"
            style={{
              backgroundColor: "#fff",
              color: "#000",
              marginBottom: "50px",
            }}
            onClick={(e) => updateStatus(e)}
          >
            Cập nhật
          </button>
        </div>
      </div>
    </Modal>
  );
};
export default UpdateMovie;
