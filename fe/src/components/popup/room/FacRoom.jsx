import React, { useState } from "react";
import { Modal, ModalHeader } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareXmark,
  faSquarePen,
  faSquarePlus,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

import "../../../styles/share.css";
import "../style.css";
import InsertFac from "./fac/InsertFac";
import UpdateFac from "./fac/UpdateFac";
import { deleteFac } from "../../../utils/services";

const FacRoom = (props) => {
  const [show, setShow] = useState(false);
  const [showUD, setShowUD] = useState(false);
  const [id, setID] = useState("");
  const [item, setItem] = useState({});

  const submit = (e, item) => {
    //delete
    
    if (window.confirm("Bạn muốn xóa?")) {
      deleteFacRM(e, item.idFac);
    } else {
      return;
    }
  };

  const deleteFacRM = async (e, id) => {
    e.preventDefault();
    const rs = await deleteFac(id);
    if (rs.status) {
      setTimeout(() => window.location.reload(), 1500);
    }
    return;
  };

  const handlClose = (bool) => {
    setShow(bool);
  };

  const handlCloseUD = (bool) => {
    setShowUD(bool);
  };
  return (
    <Modal
      isOpen={props.show}
      backdrop="static"
      keyboard={false}
      className="modal"
      style={{ zIndex: 0 }}
    >
      <div className="modal-box-his">
        <ModalHeader closeButton className="header-modal">
          <div className="modal-title">Cơ sơ vật chất</div>
          <FontAwesomeIcon
            icon={faSquareXmark}
            onClick={() => props.sendData(false)}
            className="icon"
          />
        </ModalHeader>
        {localStorage.getItem("role") == "PS00000002" ? (
          <button
            className="btn-plus"
            onClick={() => {
              setShow(!show);
              setID(props.id);
            }}
            style={{ marginLeft: "0px" }}
          >
            <FontAwesomeIcon icon={faSquarePlus} className="icon-plus" />
          </button>
        ) : (
          ""
        )}

        <div className="frame-list">
          <table>
            <tr>
              <th>STT</th>
              <th>Mã cơ sở vật chất</th>
              <th>Hình ảnh</th>
              <th>Tên cơ sở vật chất</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
            {props.list?.map((item, index) => (
              <tr key={item.idFac}>
                <td>{index + 1}</td>
                <td>{item.idFac[0]}</td>
                <td>
                  <img
                    src={
                      item.img ||
                      "https://climate.onep.go.th/wp-content/uploads/2020/01/default-image.jpg"
                    }
                    alt=""
                    name="img"
                    value={item.img}
                    width="100"
                  />
                </td>{" "}
                <td>{item.nameFac}</td>
                <td>{item.idStatus == 0 ? "Hỏng" : "Hoạt động"}</td>
                <td>
                  {" "}
                  <FontAwesomeIcon
                    icon={faSquarePen}
                    className="icon-action"
                    onClick={() => {
                      setShowUD(!showUD);
                      setID(props.id);
                      setItem(item);
                    }}
                  />
                  {localStorage.getItem("role") == "PS00000002" ? (
                    <FontAwesomeIcon
                      icon={faTrashAlt}
                      className="icon-action"
                      onClick={(e) => submit(e, item)}
                    />
                  ) : (
                    ""
                  )}
                </td>
              </tr>
            ))}
          </table>
        </div>
      </div>
      <InsertFac show={show} sendData={handlClose} id={props.id} />
      {
        showUD?(<UpdateFac show={showUD} sendData={handlCloseUD} id={id} item={item} />): null
      }
    </Modal>
  );
};
export default FacRoom;
