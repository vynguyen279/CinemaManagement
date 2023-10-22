import React, { useState } from "react";
import { Modal, ModalHeader } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareXmark } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

import { insertFac } from "../../../../utils/services";
import "../../../../styles/share.css";
import "../../style.css";
import uploadImg from "../../../../utils/mail";

const InsertFac = (props) => {
  const [data, setData] = useState({
    nameFac: "",
    idRoom:props.id,
    img: "",
  });
  // console.log(data)
  const insert = async () => {
    // console.log(props.id)
    const rs = await insertFac(data);
    if (!rs.status) {
      return;
    } else {
      setTimeout(() => window.location.reload(), 1500);
    }
    return;
  };

  const insertStatus = (e) => {
    e.preventDefault();
    if (data.img == "") {
      toast.error("Chưa chọn ảnh!");
      return;
    }
    // if (data.idStatus == "") {
    //   data.idStatus = 1;
    // }
    if (data.nameFac == "") {
      toast.error("Không được để trống!");
      return;
    } else {
      insert();
    }
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
      <div className="modal-box-update">
        <ModalHeader closeButton className="header-modal">
          <div className="modal-title">Thêm mới</div>
          <FontAwesomeIcon
            icon={faSquareXmark}
            onClick={() => props.sendData(false)}
            className="icon"
          />
        </ModalHeader>
        <div className="status" style={{ marginBottom: "0px" }}>
          <div className="frame-status" style={{ marginTop: "0px" }}>
            <div className="font-text">Tên cơ sơ vật chất</div>
            <input
              name="nameRoom"
              className="font-text frame-chevron"
              onChange={(e) => setData({ ...data, nameFac: e.target.value })}
            />
          </div>
          {/* <div className="frame-status">
            <div className="font-text">Trạng thái</div>

            <select
              className="font-text frame-chevron"
              value={data.idStatus == "" ? 1 : data.idStatus}
              onChange={(e) => setData({ ...data, idStatus: e.target.value })}
            >
              <option value={0}>Hỏng</option>
              <option value={1}>Họat động</option>
            </select>
          </div> */}
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
        <div className="out-input" style={{ marginTop: "5px" }}>
          <button
            type="submit"
            className="btn-confirm"
            style={{ backgroundColor: "#fff", color: "#000" }}
            onClick={(e) => insertStatus(e)}
          >
            Thêm mới
          </button>
        </div>
      </div>
    </Modal>
  );
};
export default InsertFac;
