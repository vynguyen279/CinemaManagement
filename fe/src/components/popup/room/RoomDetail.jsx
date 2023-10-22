import React, { useState } from "react";
import { Modal, ModalHeader } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareXmark } from "@fortawesome/free-solid-svg-icons";
import { listFacStatus, listMap, updateFac, updateRoom } from "../../../utils/services";
import Map from "./Map";
import "../../../styles/share.css";
import "../style.css";

const RoomDetail = (props) => {
  console.log(localStorage.role)
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
      console.log(rs)
      setFac(rs.data);
      // setShowFac(!showFac);
      // setID(id);
    }
  };

  useState(() => {
    getListMap()
  }, [])
  useState(() => {
    getFac()
  }, [])
  return (
    <Modal
      isOpen={props.show}
      backdrop="static"
      keyboard={false}
      className="modal"
    >
      <div className="modal-box-update" style={{ overflowY: 'auto', height: '80vh' }}>
        <ModalHeader closeButton className="header-modal">
          <div className="modal-title">Chi tiết phòng chiếu</div>
          <FontAwesomeIcon
            icon={faSquareXmark}
            onClick={() => props.close(false)}
            className="icon"
          />
        </ModalHeader>
        <div style={{ display: "flex", padding: '10px', width: '100%', flexDirection: 'column', height: '80vh' }}>
          <div className="status" style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", height: "500px", marginBottom: '0px' }}>

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
                      {
                        localStorage.role === 'PS00000004' ? (<input type="checkbox" disabled />) : (<input type="checkbox" onChange={(e) => { console.log(item) }} />)
                      }

                    </td>
                  </tr>
                ))}
              </table>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between" }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label htmlFor="">Ghi chú</label>
              <textarea name="" id="" cols="60" rows="20"></textarea>
            </div>
            {
              localStorage.role === 'PS00000004' ? (
                <div style={{width: "100%", marginTop:"20px", marginLeft:"30px"}}>
                  <div>
                    <input type="radio" name="status" id="" />
                    <label htmlFor="">Tiếp tục sử dụng</label>
                  </div>
                  <div style={{marginTop:"10px"}}>
                    <input type="radio" name="status" id="" />
                    <label htmlFor="">Hỏng</label>
                  </div>
                  <div style={{marginTop:"15px"}}>
                    <label for="" class="form-label" style={{marginRight:"8px"}}>Đổi sang phòng</label>
                    <select class="form-select form-select-lg" name="" id="" style={{padding:"10px 20px"}}>
                      <option selected>Không đổi</option>
                      <option selected>Phòng 01</option>
                      <option value="">Phòng 02</option>
                      <option value="">Phòng 03</option>
                    </select>
                  </div>
                  <button style={{ padding: "10px 20px", border: "1px solid #000", borderRadius: "30px", background: "#fff", cursor: "pointer", marginTop: "15px", alignSelf:"center" }}>Cập nhật</button>
                </div>
              ) : null
            }

          </div>
        </div>
      </div>
    </Modal>
  );
};
export default RoomDetail;
