import React, { useState } from "react";
import { Modal, ModalHeader, Input } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareXmark } from "@fortawesome/free-solid-svg-icons";

import "../../../styles/share.css";
import "../style.css";
import uploadImg from "../../../utils/mail";

const UpdateMovie = (props) => {
  const [data, setData] = useState({
    idMovie: "",
    nameMovie: "",
    proCountry: "",
    preDate: "",
    duration: "",
    director: "",
    actor: "",
    genre: "",
    idStatus: "",
    img: "",
    describe: "",
  });

  const updateStatus = (e) => {
    props.update(e, data, props.item);
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
                  src={data.img || props.item.img}
                  alt=""
                  name="img"
                  onChange={handleDataChange}
                  value={data.img}
                  // className='form-avt'
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
                  value={
                    data.idStatus === "" ? props.item.idStatus : data.idStatus
                  }
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
                    placeholder={props.item.nameMovie}
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
                    placeholder={props.item.proCountry}
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
                    placeholder={String(props.item.preDate).split("T")[0]}
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
                    placeholder={props.item.duration}
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
                    placeholder={props.item.director}
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
                    placeholder={props.item.actor}
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
                    value={props.item.genre}
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
                    placeholder={props.item.describe}
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
