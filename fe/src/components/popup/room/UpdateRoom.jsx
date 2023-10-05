import React, { useState } from "react";
import { Modal, ModalHeader } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareXmark } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

import "../../../styles/share.css";
import "../style.css";
import uploadImg from "../../../utils/mail";

const UpdateRoom = (props) => {
  const [data, setData] = useState({
    idRoom: "",
    nameRoom: "",
    idStatus: "",
    img: "",
  });

  const handleDataChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleUploadImage = (e) => {
    uploadImg(e.target.files[0]).then((rs) => setData({ ...data, img: rs }));
  };

  const updateStatus = (e) => {
    props.update(e, data, props.item);
    props.sendData(false);
  };

  return (
    <Modal
      isOpen={props.show}
      backdrop="static"
      keyboard={false}
      className="modal"
    >
      <div className="modal-box-update">
        <ModalHeader closeButton className="header-modal">
          <div className="modal-title">Chỉnh sửa</div>
          <FontAwesomeIcon
            icon={faSquareXmark}
            onClick={() => props.sendData(false)}
            className="icon"
          />
        </ModalHeader>
        <div className="status" style={{ marginBottom: "0px" }}>
          <div className="frame-status">
            <div className="font-text">Tên phòng</div>
            <input
              name="nameRoom"
              className="font-text frame-chevron"
              placeholder={props.item.nameRoom}
              onChange={(e) => setData({ ...data, nameRoom: e.target.value })}
              disabled={
                localStorage.getItem("role") == "PS00000002" ? false : true
              }
            />
          </div>
          <div className="frame-status">
            <div className="font-text">Trạng thái</div>

            <select
              className="font-text frame-chevron"
              value={data.idStatus == "" ? props.item.idStatus : data.idStatus}
              onChange={(e) => setData({ ...data, idStatus: e.target.value })}
            >
              <option value={0}>Hỏng</option>
              <option value={1}>Họat động</option>
            </select>
          </div>
          <div className="frame-status" style={{ marginTop: "5px" }}>
            {/* <div className="font-text">Hình ảnh</div> */}
            <label htmlFor="staffImg">
              <img
                src={data.img || props.item.img}
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
                disabled={
                  localStorage.getItem("role") == "PS00000002" ? false : true
                }
              />
            </label>
          </div>
        </div>
        <div className="out-input" style={{ marginTop: "0px" }}>
          <button
            type="submit"
            className="btn-confirm"
            style={{ backgroundColor: "#fff", color: "#000" }}
            onClick={(e) => updateStatus(e)}
          >
            Cập nhật
          </button>
        </div>
      </div>
    </Modal>
  );
};
export default UpdateRoom;
