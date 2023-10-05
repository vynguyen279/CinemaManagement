import React from "react";
import { Modal, ModalHeader } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareXmark } from "@fortawesome/free-solid-svg-icons";

import "../../../styles/share.css";
import "../style.css";

const HisPos = (props) => {
  return (
    <Modal
      isOpen={props.show}
      backdrop="static"
      keyboard={false}
      className="modal"
    >
      <div className="modal-box-his">
        <ModalHeader closeButton className="header-modal">
          <div className="modal-title">Lịch sử cấp quyền</div>
          <FontAwesomeIcon
            icon={faSquareXmark}
            onClick={() => props.sendData(false)}
            className="icon"
          />
        </ModalHeader>
        <div className="frame-list">
          <table>
            <tr>
              <th>STT</th>
              <th>Cấp bậc</th>
              <th>Ngày cấp</th>
              <th>Thời gian cấp</th>
              <th>Trạng thái</th>
              <th>Chi nhánh</th>
            </tr>
            {props.value?.map((item, index) => (
              <tr key={item.idStaff}>
                <td>{index + 1}</td>
                <td>{item.namePos}</td>
                <td>{String(item.dayPro).split("T")[0]}</td>
                <td>{item.timePro}</td>
                <td>
                  {item.idStatus === 0
                    ? "Khóa"
                    : item.idStatus === 1
                    ? "Hoạt động"
                    : "Chưa cấp"}
                </td>
                <td>{item.nameBra}</td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    </Modal>
  );
};
export default HisPos;
