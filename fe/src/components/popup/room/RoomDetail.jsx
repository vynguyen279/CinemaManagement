import React, { useState } from "react";
import { Modal, ModalHeader } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareXmark } from "@fortawesome/free-solid-svg-icons";
import { listFacStatus, listMap, updateFac, updateRoom } from "../../../utils/services";
import Map from "./Map";
import "../../../styles/share.css";
import "../style.css";

const RoomDetail = (props) => {
  const [fac, setFac] = useState();
  const [map, setMap] = useState();
  const [facItem, setItem] = useState();

  const getListMap = async () => {
    const rs = await listMap(props.data.idRoom);
    if (!rs.status) {
      return;
    } else {
      setMap(rs.data);
    }
  };

  const getFac = async () => {
    const rs = await listFacStatus(props.data.idRoom);
    if (!rs.status) {
      return;
    } else {
      console.log(rs.data)
      setFac(rs.data);
      // setShowFac(!showFac);
      // setID(id);
    }
  };

  useState(() => {
    getFac()
    getListMap()
  }, [])
  return (
    <Modal
      isOpen={props.show}
      backdrop="static"
      keyboard={false}
      className="modal"
    >
      <div className="modal-box-update">
        <ModalHeader closeButton className="header-modal">
          <div className="modal-title">Chi tiết phòng chiếu</div>
          <FontAwesomeIcon
            icon={faSquareXmark}
            onClick={() => props.close(false)}
            className="icon"
          />
        </ModalHeader>
        <div style={{ display: "flex", padding:'10px', width:'100%' }}>
          <div className="status" style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", overflow: 'auto', height: "500px" }}>

            <Map map={map} item={props.data} />
            <div className="frame-list" style={{ alignSelf: "flex-start" }}>
              <table>
                <tr>
                  <th>STT</th>
                  <th>Mã cơ sở vật chất</th>
                  <th>Hình ảnh</th>
                  <th>Tên cơ sở vật chất</th>
                  <th>Trạng thái</th>
                  <th>Hỏng</th>
                </tr>
                {fac?.map((item, index) => (
                  <tr key={item.idFac[0]}>
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

                      <input type="checkbox" onChange={(e) => { console.log(item)}} />
                    </td>
                  </tr>
                ))}

              </table>

            </div>

          </div>
          <div>
            <label htmlFor="">Ghi chú</label>
            <textarea name="" id="" cols="60" rows="30"></textarea>
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default RoomDetail;
