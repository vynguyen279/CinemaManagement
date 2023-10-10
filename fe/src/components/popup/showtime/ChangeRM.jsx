import React, { useState } from "react";
import { Modal, ModalHeader } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareXmark } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert"; // Import

import { updateST, cancelST } from "../../../utils/services";
import "../../../styles/share.css";
import "../style.css";

const ChangeRM = (props) => {
  const [idNewRoom, setNewRoom] = useState("");

  const changeStatus = async (e) => {
    e.preventDefault();
    if (idNewRoom == "") {
      toast.error("Chưa chọn phòng!");
      return;
    }
    const data = {
      idST: props.item.idST,
      showDateTime: props.item.showDateTime,
      idMovie: props.item.idMovie,
      idTic: props.item.idTic,
      newRoom: idNewRoom,
      oldRoom: props.item.idRoom,
    };
    console.log(data);
    const rs = await updateST(data);
    if (!rs.status) {
      return;
    } else {
      setTimeout(() => window.location.reload(), 1500);
    }
  };
  const cancel = async (data) => {
    const rs = await cancelST(data);
    if (rs.status) {
      setTimeout(() => window.location.reload(), 1500);
    }
    return;
  };

  const submit = (data) => {
    props.sendData(false);
    confirmAlert({
      title: "XÁC NHẬN",
      message: "Bạn có chắc muốn hủy?",
      buttons: [
        {
          label: "Có",
          onClick: () => cancel(data),
        },
        {
          label: "Không",
          onClick: () => {},
        },
      ],
    });
  };
  return (
    <Modal
      isOpen={props.show}
      backdrop="static"
      keyboard={false}
      className="modal"
    >
      <div className="modal-box-update" style={{ height: "400px" }}>
        <ModalHeader closeButton className="header-modal">
          <div className="modal-title">Đổi phòng</div>
          <FontAwesomeIcon
            icon={faSquareXmark}
            onClick={() => props.sendData(false)}
            className="icon"
          />
        </ModalHeader>
        <div className="status">
          <div className="frame-status">
            <div className="font-text">Phòng</div>

            <select
              className="font-text frame-chevron"
              value={idNewRoom || props.item.idRoom}
              onChange={(e) => setNewRoom(e.target.value)}
            >
              <option>Chọn phòng</option>
              {props.room?.map((item, index) => (
                <option value={item.idRoom}>
                  {item.idRoom}
                  {" - "}
                  {item.nameRoom}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="out-input">
          {props.room.length == 0 ? (
            <button
              type="submit"
              className="btn-confirm"
              style={{ backgroundColor: "#e71717", color: "#fff" }}
              onClick={() => submit(props.item)}
            >
              Hủy
            </button>
          ) : (
            <button
              type="submit"
              className="btn-confirm"
              style={{ backgroundColor: "#fff", color: "#000" }}
              onClick={(e) => changeStatus(e)}
            >
              Cập nhật
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};
export default ChangeRM;
