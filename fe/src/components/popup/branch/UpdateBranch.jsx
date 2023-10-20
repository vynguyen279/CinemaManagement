import React, { useState } from "react";
import { Modal, ModalHeader, Input } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareXmark } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

import "../../../styles/share.css";
import "../style.css";

const UpdateBranch = (props) => {
  const [data, setData] = useState({
    idBra: props.item.idBra,
    nameBra: props.item.nameBra,
  });

  const updateStatus = (e) => {
    if (data.nameBra == "") {
      toast.error("Tên không được để trống!");
      return;
    }
    if (data.nameBra.length > 50) {
      toast.error("Không được quá 50 ký tự!");
      return;
    }
    console.log(data); //props.update(e, data, props.item);
  };

  const handleDataChange = (e) => {
    setData((pre) => ({ ...pre, [e.target.name]: e.target.value }));
    // setOldName((pre) => ({ ...pre, [e.target.name]: e.target.value }))
    // console.log(data)
  };
  return (
    <Modal
      isOpen={props.show}
      backdrop="static"
      keyboard={false}
      className="modal"
    >
      <div className="modal-box-update-ticket">
        <ModalHeader closeButton className="header-modal">
          <div className="modal-title">Chỉnh sửa</div>
          <FontAwesomeIcon
            icon={faSquareXmark}
            onClick={() => props.sendData(false)}
            className="icon"
          />
        </ModalHeader>
        <div className="status" style={{ marginBottom: "50px" }}>
          <div className="frame-status">
            <div className="font-text">Mã chi nhánh</div>
            <Input
              className="font-text frame-chevron"
              value={props.item.idBra}
              disabled
            />
          </div>
          <div className="frame-status">
            <div className="font-text">Tên chi nhánh</div>
            <Input
              name="nameBra"
              className="font-text frame-chevron"
              onChange={handleDataChange}
              placeholder={data.nameBra}
              value={data.nameBra}
            />
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
export default UpdateBranch;
