import React, { useState, useEffect } from "react";
import { Modal, ModalHeader } from "reactstrap";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareXmark } from "@fortawesome/free-solid-svg-icons";
import {
  listFacStatus,
  listMap,
  updateStatusFac,
  updateRoom,
  listRedSeat,
} from "../../../utils/services";
import Map from "./Map";
import "../../../styles/share.css";
import "../style.css";

const RoomDetail = (props) => {
  // console.log(props.data.note)
  const [fac, setFac] = useState();
  const [note, setNote] = useState(props.data.note);
  const [red, setRed] = useState([]);
  const [value, setValue] = useState([]);
  const [temp, setTemp] = useState([]);
  const [map, setMap] = useState();
  const [data, setData] = useState({
    idRoom: props.data.idRoom,
    nameRoom: props.data.nameRoom,
    idStatus: props.data.idStatus,
    capacity: props.data.capacity,
    row: props.data.row,
    img: props.data.img,
    note: props.data.note ? props.data.note : "",
    col: props.data.col,
    idBra: props.data.idBra,
  });

  const getListMap = async () => {
    const rs = await listMap(props.data.idRoom);
    if (!rs.status) {
      return;
    } else {
      setMap(rs.data);
    }
  };
  const getListRedSeat = async () => {
    const rs = await listRedSeat(props.data.idRoom);
    if (!rs.status) {
      return;
    } else {
      // console.log(rs.data)
      setRed(rs.data);
    }
  };
  const changeRoomStatus = async () => {
    // console.log(data)
    const rs = await updateRoom(data);
    if (!rs.status) {
      return;
    } else {
      window.location.reload();
    }
  };
  const checkNote = (array, array2) => {
    for (let index = 0; index < array.length; index++) {
      if (array[index].idStatus === 0) {
        // console.log(array[index].idStatus)
        return 1;
      }
    }
    for (let index = 0; index < array2.length; index++) {
      if (array2[index].idStatus === 0) {
        // console.log(array[index].idStatus)
        return 1;
      }
    }
    if (red.length > 0) return 1;
    return 0;
  };
  const handleCheck = async () => {
    // console.log(value)
    console.log(data);
    if (checkNote(value, temp) === 0) {
      // for (let index = 0; index < value.length; index++) {
      // const rs = await updateStatusFac(value[index].idFac[0], { idStatus: value[index].idStatus });
      if (note) {
        toast.error("Bạn phải xóa ghi chú khi không có CSVC bị hỏng!");
        return;
      } else {
        const rs2 = await updateRoom({
          idRoom: props.data.idRoom,
          nameRoom: props.data.nameRoom,
          idStatus: 1,
          capacity: props.data.capacity,
          row: props.data.row,
          img: props.data.img,
          note: "",
          col: props.data.col,
          idBra: props.data.idBra,
        });
        setValue([])
        // window.location.reload()
        setTimeout(() => window.location.reload(), 3000);
      }
      // }
    } else {
      if (!note) {
        toast.error("Bạn phải nhập ghi chú trước khi cập nhật!");
        return;
      }
      if (value.length > 0) {
        for (let index = 0; index < value.length; index++) {
          const rs = await updateStatusFac(value[index].idFac[0], {
            idStatus: value[index].idStatus,
          });
          const rs2 = await updateRoom({
            idRoom: props.data.idRoom,
            nameRoom: props.data.nameRoom,
            idStatus: 2,
            capacity: props.data.capacity,
            row: props.data.row,
            img: props.data.img,
            note: note,
            col: props.data.col,
            idBra: props.data.idBra,
          });
        }
        // window.location.reload()
        setTimeout(() => window.location.reload(), 3000);
      } else {
        const rs2 = await updateRoom({
          idRoom: props.data.idRoom,
          nameRoom: props.data.nameRoom,
          idStatus: 2,
          capacity: props.data.capacity,
          row: props.data.row,
          img: props.data.img,
          note: note,
          col: props.data.col,
          idBra: props.data.idBra,
        });
        // window.location.reload()
        setTimeout(() => window.location.reload(), 3000);
      }

      setValue([]);
    }
  };

  const getFac = async () => {
    const rs = await listFacStatus(props.data.idRoom);
    if (!rs.status) {
      return;
    } else {
      setFac(rs.data);
      for (let index = 0; index < rs.data.length; index++) {
        setTemp((pre) => [
          { idFac: rs.data[index].idFac[0], idStatus: rs.data[index].idStatus },
          ...pre,
        ]);
      }
    }
  };
  const handleDataChange = (e) => {
    setData((pre) => ({ ...pre, [e.target.name]: e.target.value }));
    setNote(e.target.value);
  };

  useState(() => {
    getListMap();
  }, []);
  useState(() => {
    getListRedSeat();
  }, []);
  useState(() => {
    getFac()
  }, [props.data])
  useEffect(() => {

  }, [value, data])

  return (
    <Modal
      isOpen={props.show}
      backdrop="static"
      keyboard={false}
      className="modal"
    >
      <div
        className="modal-box-update"
        style={{ overflowY: "auto", height: "80vh" }}
      >
        <ModalHeader closeButton className="header-modal">
          <div className="modal-title">Chi tiết phòng chiếu</div>
          <FontAwesomeIcon
            icon={faSquareXmark}
            onClick={() => props.close(false)}
            className="icon"
          />
        </ModalHeader>
        <div
          style={{
            display: "flex",
            padding: "10px",
            width: "100%",
            flexDirection: "column",
            height: "80vh",
            overflowY: "auto",
          }}
        >
          <div
            className="status"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              height: "500px",
              marginBottom: "10px",
              overflowY: "auto",
            }}
          >
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
                      {localStorage.role === "PS00000004" ? (
                        <input
                          type="checkbox"
                          disabled
                          checked={item.idStatus === 1 ? false : true}
                        />
                      ) : (
                        <input
                          type="checkbox"
                          defaultChecked={!item.idStatus}
                          key={index}
                          onChange={(e) => {
                            setValue((pre) => [
                              {
                                idFac: item.idFac,
                                idStatus: !e.target.checked ? 1 : 0,
                              },
                              ...pre,
                            ]);
                          }}
                        />
                      )}
                    </td>
                  </tr>
                ))}
              </table>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label htmlFor="">Ghi chú</label>
              {localStorage.role === "PS00000004" ? (
                <textarea
                  name="note"
                  id=""
                  cols="60"
                  rows="20"
                  value={data.note}
                  disabled
                  onChange={handleDataChange}
                ></textarea>
              ) : (
                <textarea
                  name="note"
                  id=""
                  cols="60"
                  rows="20"
                  value={data.note}
                  onChange={handleDataChange}
                ></textarea>
              )}
            </div>

            {/* {
              localStorage.role === 'PS00000004' && props.data.note ? (
                <div style={{ width: "100%", marginTop: "20px", marginLeft: "30px" }}>
                  <div>
                    <input type="radio" name="status" id="" onChange={(e) => setData((pre) => ({ ...pre, idStatus: e.target.value }))} value={1} checked />
                    <label htmlFor="">Tiếp tục sử dụng</label>
                  </div>
                  <div style={{ marginTop: "10px" }}>
                    <input type="radio" name="status" id="" value={3} onChange={(e) => setData((pre) => ({ ...pre, idStatus: e.target.value }))} />
                    <label htmlFor="">Hỏng</label>
                  </div>
                  </div>
            } */}
            {localStorage.role === "PS00000004" && props.data.note ? (
              <div
                style={{ width: "100%", marginTop: "20px", marginLeft: "30px" }}
              >
                <div>
                  <input
                    type="radio"
                    name="status"
                    id=""
                    onChange={(e) =>
                      setData((pre) => ({ ...pre, idStatus: e.target.value }))
                    }
                    value={1}
                    checked
                  />
                  <label htmlFor="">Tiếp tục sử dụng</label>
                </div>
                <div style={{ marginTop: "10px" }}>
                  <input
                    type="radio"
                    name="status"
                    id=""
                    value={3}
                    onChange={(e) =>
                      setData((pre) => ({ ...pre, idStatus: e.target.value }))
                    }
                  />
                  <label htmlFor="">Hỏng</label>
                </div>
                </div>
              ) : (localStorage.role === 'PS00000004' && props.data.note ? (null) : (<button style={{ padding: "10px 20px", border: "1px solid #000", borderRadius: "30px", background: "#fff", cursor: "pointer", marginTop: "15px", alignSelf: "flex-end", marginRight: "150px" }} onClick={handleCheck}>Cập nhật</button>))
            }
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default RoomDetail;
