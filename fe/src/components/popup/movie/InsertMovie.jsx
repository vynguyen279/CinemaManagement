import React, { useState } from "react";
import { Modal, ModalHeader, Input } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareXmark } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

import { insertMovie } from "../../../utils/services";
import "../../../styles/share.css";
import "../style.css";
import uploadImg from "../../../utils/mail";

const Test = (props) => {
  const [data, setData] = useState({
    nameMovie: "",
    proCountry: "",
    preDate: "",
    duration: "",
    director: "",
    actor: "",
    genre: "",
    img: "",
    describe: "",
  });

  const insert = async () => {
    const rs = await insertMovie(data);
    if (!rs.status) {
      return;
    } else {
      setTimeout(() => window.location.reload(), 1500);
    }
  };

  const insertStatus = (e) => {
    e.preventDefault();
    if (data.img == "") {
      toast.error("Chưa thêm ảnh!");
      return;
    }
    if (
      data.nameMovie == "" ||
      data.proCountry == "" ||
      data.preDate == "" ||
      data.duration == "" ||
      data.director == "" ||
      data.actor == "" ||
      data.genre == "" ||
      data.describe == ""
    ) {
      toast.error("Không được để trống thông tin!");
      console.log(data.img);
      return;
    }
    if (new Date(String(data.preDate).split(":00Z")[0]) < new Date()) {
      toast.error("Thời gian khởi chiếu không hợp lệ!");
      return;
    }
    insert();
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
          <div className="modal-title">Thêm mới</div>
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
            <label htmlFor="staffImg" style={{ marginTop: "30px" }}>
              <img
                src={
                  data.img ||
                  "https://climate.onep.go.th/wp-content/uploads/2020/01/default-image.jpg"
                }
                alt=""
                name="img"
                onChange={handleDataChange}
                value={data.img}
                // className='form-avt'
                width="300"
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
                  />
                </div>
              </div>
              <div className="fill-row">
                <div className="frame-status margin-content">
                  <div className="font-text">Ngày khởi chiếu</div>
                  <input
                    type="date"
                    className="font-text frame-chevron"
                    name="preDate"
                    id="preDate"
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
            onClick={(e) => insertStatus(e)}
          >
            Thêm
          </button>
        </div>
      </div>
    </Modal>
  );
};
export default Test;
