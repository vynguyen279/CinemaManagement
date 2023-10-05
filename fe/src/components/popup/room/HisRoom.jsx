import React, { useState } from "react";
import { Modal, ModalHeader } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareXmark } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

import "../../../styles/share.css";
import "../style.css";
import { listHisDate } from "../../../utils/services";

const HisRoom = (props) => {
  const [value, setValue] = useState("");
  const [data, setData] = useState({
    start: "",
    end: "",
  });

  const getList = async (e) => {
    e.preventDefault();
    if (data.start == "") {
      toast.error("Chưa chọn ngày bắt đầu!");
      return;
    }
    if (data.end == "") {
      toast.error("Chưa chọn ngày kết thúc!");
      return;
    }
    if (data.start > data.end) {
      toast.error("Chọn ngày không hợp lệ!");
      return;
    }
    const rs = await listHisDate(props.id, data);
    if (rs.status) {
      setValue(rs.data);
    }
    return;
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
      style={{ zIndex: 0 }}
    >
      <div className="modal-box-his">
        <ModalHeader closeButton className="header-modal">
          <div className="modal-title">Lịch sử sử dụng</div>
          <FontAwesomeIcon
            icon={faSquareXmark}
            onClick={() => {
              props.sendData(false);
              setValue("");
            }}
            className="icon"
          />
        </ModalHeader>
        <div className="filter">
          <span>Từ ngày:</span>
          <input
            type="date"
            name="start"
            className="date-filter"
            onChange={handleDataChange}
          />
          <span style={{ marginLeft: "20px" }}>Đến ngày:</span>
          <input
            type="date"
            name="end"
            className="date-filter"
            onChange={handleDataChange}
          />
          <button className="btn-filter" onClick={(e) => getList(e)}>
            Lọc
          </button>
        </div>
        <div className="frame-list">
          <table>
            <tr>
              <th>STT</th>
              <th>Mã suất chiếu</th>
              <th>Thời gian</th>
              <th>Ngày</th>
              <th>Trạng thái</th>
            </tr>
            {value === ""
              ? props.his?.map((item, index) => (
                  <tr key={item.idFac}>
                    <td>{index + 1}</td>
                    <td>{item.idST}</td>
                    <td>{item.timeHis}</td>
                    <td>{String(item.dateHis).split("T")[0]}</td>
                    <td>{item.idStatus == 1 ? "Đã đặt" : "Đã hủy"}</td>
                  </tr>
                ))
              : value?.map((item, index) => (
                  <tr key={item.idFac}>
                    <td>{index + 1}</td>
                    <td>{item.idST}</td>
                    <td>{item.timeHis}</td>
                    <td>{String(item.dateHis).split("T")[0]}</td>
                    <td>{item.idStatus == 1 ? "Đã đặt" : "Đã hủy"}</td>
                  </tr>
                ))}
          </table>
        </div>
      </div>
    </Modal>
  );
};
export default HisRoom;
