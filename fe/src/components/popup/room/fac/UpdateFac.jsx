import React, { useState } from "react";
import { Modal, ModalHeader } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareXmark } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

import { updateFac, updateStatusFac } from "../../../../utils/services";
import "../../../../styles/share.css";
import "../../style.css";
import uploadImg from "../../../../utils/mail";

const UpdateFac = (props) => {
  const [data, setData] = useState({
    nameFac: props.item.nameFac,
    img: props.item.img,
  });
  const [status, setStatus] = useState({
    idStatus: props.item.idStatus
  });

  const update = async () => {
    // console.log(props.item.idFac[0])
    // console.log(status.idStatus)
    // console.log(data.nameFac)
    const rs = await updateFac(props.item.idFac[0], data);
    if (!rs.status) {
      return;
    } else {
      if(props.item.idStatus!=status.idStatus){
      const rs2 = await updateStatusFac(props.item.idFac[0], status);
      setTimeout(() => window.location.reload(), 1500);
      } else{
        setTimeout(() => window.location.reload(), 1500);
      }
    }
  };

  // const updateAll = (e) => {
  //   e.preventDefault();
  //   if (data.idStatus == "") {
  //     data.idStatus = props.item.idStatus;
  //   }
  //   if (data.nameFac == "") {
  //     data.nameFac = props.item.nameFac;
  //   }
  //   if (data.img == "") {
  //     data.img = props.item.img;
  //   }
  //   update();
  // };

  const handleDataChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    // setStatus({ ...status, [e.target.name]: e.target.value });
  };

  const handleStatusChange = (e) => {
    setStatus({ ...status, [e.target.name]: e.target.value });
  };

  const handleUploadImage = (e) => {
    uploadImg(e.target.files[0]).then((rs) => setData({ ...data, img: rs }));
  };

  useState(()=>{

  },[status])

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
            <div className="font-text">Tên cơ sơ vật chất</div>
            <input
              name="nameFac"
              className="font-text frame-chevron"
              value={data.nameFac}
              onChange={(e) => handleDataChange(e)}
              disabled={
                localStorage.getItem("role") == "PS00000002" ? false : true
              }
            />
          </div>
          <div className="frame-status">
            <div className="font-text">Trạng thái</div>

            <select
              className="font-text frame-chevron"
              name="idStatus"
              value={status.idStatus}
              onChange={handleStatusChange}
            >
              <option value={0} >Hỏng</option>
              <option value={1} >Họat động</option>
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
              />
            </label>
          </div>
        </div>
        <div className="out-input" style={{ marginTop: "0px" }}>
          <button
            type="submit"
            className="btn-confirm"
            style={{ backgroundColor: "#fff", color: "#000" }}
            onClick={(e) => update(e)}
          >
            Cập nhật
          </button>
        </div>
      </div>
    </Modal>
  );
};
export default UpdateFac;
