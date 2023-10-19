import React, { useState } from "react";
import { Modal, ModalHeader } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareXmark } from "@fortawesome/free-solid-svg-icons";

import "../../../styles/share.css";
import "../style.css";

const UpdateStaff = (props) => {
  const [data, setData] = useState({
    idStaff: "",
    idPos: "",
    idStatus: "",
    idBra: "",
  });

  const updateStatus = (e) => {
    props.update(e, data, props.item);
    props.sendData(false);
  };

  const checkNotBranch = (e) => {
    e.preventDefault();
    if (e.target.value === "PS00000002") {
      setData({ ...data, idBra: "" });
    }
    setData({ ...data, idPos: e.target.value });
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
        <div className="status">
          <div className="frame-status">
            <div className="font-text">Trạng thái</div>
            {props.item.idStatus === 2 ? (
              <select
                className="font-text frame-chevron"
                value={1}
                onChange={(e) => setData({ ...data, idStatus: e.target.value })}
              >
                <option value={1}>Cấp tài khoản</option>
                {/* <option value={2}>Chưa cấp</option> */}
              </select>
            ) : (
              <select
                className="font-text frame-chevron"
                value={
                  data.idStatus === "" ? props.item.idStatus : data.idStatus
                }
                onChange={(e) => setData({ ...data, idStatus: e.target.value })}
              >
                <option value={0}>Khóa</option>
                <option value={1}>Họat động</option>
              </select>
            )}
          </div>
          <div className="frame-status">
            <div className="font-text">Chức vụ</div>

            <select
              className="font-text frame-chevron"
              value={data.idPos === "" ? props.item.idPos : data.idPos}
              onChange={(e) => checkNotBranch(e)}
            >
              {props.pos.map((item, index) => (
                <option value={item.idPos}>{item.namePos}</option>
              ))}{" "}
            </select>
          </div>
          {props.item.idPos === "PS00000002" || props.item.idPos == null ? (
            data.idPos === "" ? (
              ""
            ) : data.idPos === "PS00000002" ? (
              ""
            ) : (
              <div className="frame-status">
                <div className="font-text">Chi nhánh</div>

                <select
                  className="font-text frame-chevron"
                  value={data.idBra === "" ? props.item.idBra : data.idBra}
                  onChange={(e) => setData({ ...data, idBra: e.target.value })}
                >
                  {props.bra.map((item, index) => (
                    <option value={item.idBra}>{item.nameBra}</option>
                  ))}
                </select>
              </div>
            )
          ) : data.idPos === "" ? (
            <div className="frame-status">
              <div className="font-text">Chi nhánh</div>

              <select
                className="font-text frame-chevron"
                value={data.idBra === "" ? props.item.idBra : data.idBra}
                onChange={(e) => setData({ ...data, idBra: e.target.value })}
              >
                {props.bra.map((item, index) => (
                  <option value={item.idBra}>{item.nameBra}</option>
                ))}
              </select>
            </div>
          ) : data.idPos === "PS00000002" ? (
            ""
          ) : (
            <div className="frame-status">
              <div className="font-text">Chi nhánh</div>

              <select
                className="font-text frame-chevron"
                value={data.idBra === "" ? props.item.idBra : data.idBra}
                onChange={(e) => setData({ ...data, idBra: e.target.value })}
              >
                {props.bra.map((item, index) => (
                  <option value={item.idBra}>{item.nameBra}</option>
                ))}
              </select>
            </div>
          )}
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
export default UpdateStaff;
