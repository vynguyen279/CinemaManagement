import React, { useState } from "react";
import { Modal, ModalHeader, Input } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareXmark } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

import "../../../styles/share.css";
import "../style.css";

const UpdateTicket = (props) => {
  const [data, setData] = useState({
    idTic: "",
    nameTic: "",
  });

  const updateStatus = (e) => {
    if (data.nameTic == "") {
      toast.error("Tên không được để trống!");
      return;
    }
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
      <div className="modal-box-update-ticket">
        <ModalHeader closeButton className="header-modal">
          <div className="modal-title">Chỉnh sửa</div>
          <FontAwesomeIcon
            icon={faSquareXmark}
            onClick={() => props.sendData(false)}
            className="icon"
          />
        </ModalHeader>
        <div className="status">
          <div className="frame-status">
            <div className="font-text">Mã vé</div>
            <Input
              className="font-text frame-chevron"
              placeholder={props.item.idTic}
              disabled
            />
          </div>
          <div className="frame-status">
            <div className="font-text">Tên vé</div>
            <Input
              className="font-text frame-chevron"
              onChange={(e) => setData({ ...data, nameTic: e.target.value })}
              placeholder={props.item.nameTic}
            />
          </div>
          <div className="frame-status">
            <div className="font-text">Giá vé</div>
            <Input
              className="font-text frame-chevron"
              placeholder={props.item.price}
              disabled
            />
          </div>
        </div>
        <div className="out-input">
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
export default UpdateTicket;
