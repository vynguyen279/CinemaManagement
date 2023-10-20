import React, { useState } from "react";
import { Modal, ModalHeader } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareXmark } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

import "../../../styles/share.css";
import "../style.css";
import { insertRoom } from "../../../utils/services";
import uploadImg from "../../../utils/mail";

const InsertRoom = (props) => {
  const [data, setData] = useState({
    nameRoom: "",
    idStatus: 0,
    img: "",
    idBra: props.idBra,
    row: "",
    col: "",
    capacity: ""
  });

  const insert = async () => {
    console.log(data)
    const rs = await insertRoom(data);
    if (!rs.status) {
      return;
    } else {
      setTimeout(() => window.location.reload(), 1500);
    }
  };

  // const insertStatus = (e) => {
  //   e.preventDefault();
  //   if (!data.nameRoom) {
  //     toast.error("Tên phòng không được để trống!")
  //     return
  //   }
  //   if (!data.capacity) {
  //     toast.error("Số ghế tối đa không được để trống!")
  //     return
  //   }
  //   if (!data.row) {
  //     toast.error("Số hàng không được để trống!")
  //     return
  //   }
  //   if (!data.col) {
  //     toast.error("Số cột không được để trống!")
  //     return
  //   }
  //   if (data.img == "") {
  //     toast.error("Chưa thêm ảnh!");
  //     return;
  //   }
  //   insert();
  // };

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
      <div className="modal-box-update">
        <ModalHeader closeButton className="header-modal">
          <div className="modal-title">Thêm mới</div>
          <FontAwesomeIcon
            icon={faSquareXmark}
            onClick={() => props.sendData(false)}
            className="icon"
          />
        </ModalHeader>
        <div className="status" style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <div style={{ alignSelf: "flex-start" }}>
            <div className="frame-status" style={{ marginTop: "0px" }}>
              <div className="font-text">Tên phòng</div>
              <input
                name="nameRoom"
                className="font-text frame-chevron"
                onChange={(e) => setData({ ...data, nameRoom: String(e.target.value).trim() })}
              />
            </div>
            <div className="frame-status" style={{ marginTop: "5px" }}>
              <div className="font-text">Số ghế tối đa</div>
              <input
                name="capacity"
                className="font-text frame-chevron"
                type="number"
                min="0"
                onChange={(e) => setData({ ...data, capacity: e.target.value })}
              />
            </div>
            {/* {
              data.capacity?():null
            } */}
            <div className="frame-status" style={{ marginTop: "5px" }}>
              <div className="font-text">Số hàng</div>
              <input
                name="row"
                className="font-text frame-chevron"
                type="number"
                min="0"
                onChange={(e) => setData({ ...data, row: e.target.value })}
              />
            </div>
          </div>
          <div>
            <div className="frame-status" style={{ marginTop: "5px" }}>
              <div className="font-text">Số cột</div>
              <input
                name="col"
                className="font-text frame-chevron"
                type="number"
                min="0"
                onChange={(e) => setData({ ...data, col: e.target.value })}
              />
            </div>

            <div className="frame-status">
              <div className="font-text">Trạng thái</div>

              <select
                className="font-text frame-chevron"
                // value={data.idStatus == "" ? 1 : data.idStatus}
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
                  height="250"
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
            </div>
          </div>
        </div>
        <div className="out-input" style={{ marginTop: "5px" }}>
          <button
            type="submit"
            className="btn-confirm"
            style={{ backgroundColor: "#fff", color: "#000", cursor: "pointer" }}
            onClick={(e) => insert(e)}
          >
            Thêm mới
          </button>
        </div>
      </div>
    </Modal>
  );
};
export default InsertRoom;
