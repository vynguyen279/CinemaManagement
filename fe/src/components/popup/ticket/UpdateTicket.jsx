import React, { useState } from "react";
import { Modal, ModalHeader, Input } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareXmark } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { updateTic } from "../../../utils/services";

import "../../../styles/share.css";
import "../style.css";

const UpdateTicket = (props) => {
  const [data, setData] = useState({
    idTic: props.item.idTic,
    nameTic: props.item.nameTic,
  });

  const updateStatus = async (e) => {
    // if (data.nameTic == "") {
    //   toast.error("Tên không được để trống!");
    //   return;
    // }
    // if (data.nameTic.length > 20) {
    //   toast.error("Không được quá 20 ký tự!");
    //   return;
    // }
    e.preventDefault();
    const rs = await updateTic(data);
    if (rs.status) {
      setTimeout(() => window.location.reload(), 1500);
    }
    props.sendData(false);
    return;
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
            <div className="font-text">Mã vé</div>
            <Input
              className="font-text frame-chevron"
              placeholder={data.idTic}
              disabled
            />
          </div>
          <div className="frame-status">
            <div className="font-text">Tên vé</div>
            <Input
              className="font-text frame-chevron"
              onChange={(e) => setData({ ...data, nameTic: e.target.value })}
              value={data.nameTic}
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
export default UpdateTicket;
