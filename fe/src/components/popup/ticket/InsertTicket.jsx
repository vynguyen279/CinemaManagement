import React, { useState } from "react";
import { Modal, ModalHeader, Input } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareXmark } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

import { insertTic } from "../../../utils/services";
import "../../../styles/share.css";
import "../style.css";

const InsertTicket = (props) => {
  const [data, setData] = useState({
    nameTic: "",
    price: "",
  });

  const insert = async () => {
    const rs = await insertTic(data);
    if (!rs.status) {
      return;
    } else {
      setTimeout(() => window.location.reload(), 1500);
    }
  };

  const insertStatus = (e) => {
    e.preventDefault();
    // if (data.nameTic == "" || data.price == "") {
    //   toast.error("Không được để trống!");
    //   return;
    // }
    // if (data.nameTic.length > 20) {
    //   toast.error("Không được quá 20 ký tự!");
    //   return;
    // }
    insert();
  };
  const handleDataChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
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
        <div className="status">
          <div className="frame-status">
            <div className="font-text">Tên vé</div>
            <Input
              className="font-text frame-chevron"
              name="nameTic"
              id="nameTic"
              onChange={(e) => handleDataChange(e)}
            />
          </div>
          <div className="frame-status">
            <div className="font-text">Giá vé</div>
            <Input
              className="font-text frame-chevron"
              name="price"
              id="price"
              onChange={(e) => handleDataChange(e)}
            />
          </div>
        </div>
        <div className="out-input">
          <button
            type="submit"
            className="btn-confirm"
            style={{ backgroundColor: "#fff", color: "#000" }}
            onClick={(e) => insertStatus(e)}
          >
            Thêm
          </button>
        </div>
      </div>
    </Modal>
  );
};
export default InsertTicket;
