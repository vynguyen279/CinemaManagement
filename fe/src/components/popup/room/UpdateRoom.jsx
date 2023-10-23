import React, { useState } from "react";
import { Modal, ModalHeader } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareXmark } from "@fortawesome/free-solid-svg-icons";
import { updateRoom } from "../../../utils/services";

import "../../../styles/share.css";
import "../style.css";
import uploadImg from "../../../utils/mail";

const UpdateRoom = (props) => {
  const [oldName, setOldName] = useState("");
  const [data, setData] = useState({
    idRoom: props.item.idRoom,
    nameRoom: props.item.nameRoom,
    idStatus: props.item.idStatus,
    capacity: props.item.capacity,
    row: props.item.row,
    img: props.item.img,
    note: null,
    col: props.item.col,
    idBra: props.item.idBra,
  });
  // console.log(data)

  const handleDataChange = (e) => {
    setData((pre) => ({ ...pre, [e.target.name]: e.target.value }));
    // setOldName((pre) => ({ ...pre, [e.target.name]: e.target.value }))
    // console.log(data)
  };

  const handleUploadImage = (e) => {
    uploadImg(e.target.files[0]).then((rs) => setData({ ...data, img: rs }));
  };

  // const updateStatus = (e) => {
  //   e.preventDefault()
  //   props.update(e, data, props.item);
  //   props.sendData(false);
  // };

  const update = async (e, data) => {
    e.preventDefault();
    // console.log(data)
    const rs = await updateRoom(data);
    if (rs.status) {
      setTimeout(() => window.location.reload(), 1500);
    } else return;
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
        <div
          className="status"
          style={{
            marginBottom: "0px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div className="frame-status" style={{ alignSelf: "flex-start" }}>
            <div className="font-text">Tên phòng</div>
            <input
              name="nameRoom"
              className="font-text frame-chevron"
              placeholder={data.nameRoom}
              value={data.nameRoom}
              onChange={handleDataChange}
              disabled={
                localStorage.getItem("role") == "PS00000002" ? false : true
              }
            />
            <div className="font-text">Số ghế tối đa</div>
            <input
              name="capacity"
              className="font-text frame-chevron"
              placeholder={data.capacity}
              value={data.capacity}
              onChange={handleDataChange}
              disabled={
                localStorage.getItem("role") == "PS00000002" ? false : true
              }
            />
            <div className="font-text">Số hàng</div>
            <input
              name="row"
              className="font-text frame-chevron"
              placeholder={data.row}
              value={data.row}
              onChange={handleDataChange}
              disabled={
                localStorage.getItem("role") == "PS00000002" ? false : true
              }
            />
          </div>
          <div className="frame-status">
            <div className="font-text">Số cột</div>
            <input
              name="col"
              className="font-text frame-chevron"
              placeholder={data.col}
              value={data.col}
              onChange={handleDataChange}
              disabled={
                localStorage.getItem("role") == "PS00000002" ? false : true
              }
            />
            <div className="font-text">Trạng thái</div>

            <select
              name="idStatus"
              className="font-text frame-chevron"
              placeholder={data.idStatus}
              onChange={handleDataChange}
            >
              <option value={0}>Hỏng</option>
              <option value={1}>Họat động</option>
            </select>
            <div className="frame-status" style={{ marginTop: "5px" }}>
              {/* <div className="font-text">Hình ảnh</div> */}
              <label htmlFor="staffImg">
                <img
                  src={data.img}
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
        </div>
        <div className="out-input" style={{ marginTop: "0px" }}>
          <button
            type="submit"
            className="btn-confirm"
            style={{ backgroundColor: "#fff", color: "#000" }}
            onClick={(e) => update(e, data)}
          >
            Cập nhật
          </button>
        </div>
      </div>
    </Modal>
  );
};
export default UpdateRoom;
