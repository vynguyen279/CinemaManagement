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
  const [fac, setFac] = useState();
  const [note, setNote] = useState(props.data.note);
  const [status, setStatus] = useState(props.data.idStatus===2?1:props.data.idStatus);
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
  let data2 = {
    idRoom: props.data.idRoom,
    nameRoom: props.data.nameRoom,
    idStatus: parseInt(status),
    capacity: props.data.capacity,
    row: props.data.row,
    img: props.data.img,
    note: props.data.note ? props.data.note : "",
    col: props.data.col,
    idBra: props.data.idBra,
  };

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
      if(rs.data.length>0)
      setRed(rs.data);
    else
    setRed([])
    }
  };
  const changeRoomStatus = async () => {
    console.log(data2);
    const rs = await updateRoom(data2);
    if (!rs.status) {
      return;
    } else {
      setTimeout(() => window.location.reload(), 3000);
    }
  };
  const setRedSeat = async (value) => {
    setRed(value)
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

  const checkTemp = (temp) => {
    // console.log(temp)
    // console.log(value)
    for (let index = 0; index < temp.length; index++) {
      for (let i = 0; i < value.length; i++) {
        if (value[i].idFac[0] == temp[index].idFac) {
          if (value[i].idStatus !== temp[index].idStatus) {
            temp[index].idStatus = value[i].idStatus
          }
        }
        // else continue
      }
    }
    return temp;
  };

  const handleCheck = async () => {
    console.log(red)
    // console.log(checkNote(value, temp));
    if (checkNote(value, checkTemp(temp)) === 0) {
      if (note) {
        toast.error("Bạn phải xóa ghi chú khi không có CSVC bị hỏng!");
        return;
      } else {
        if (value.length > 0) {
          for (let index = 0; index < value.length; index++) {
            const rs = await updateStatusFac(value[index].idFac[0], {
              idStatus: value[index].idStatus,
            });
          }
        }
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
        setValue([]);
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
      // console.log(rs.data);
      for (let index = 0; index < rs.data.length; index++) {
        setTemp((pre) => [
          { idFac: rs.data[index].idFac[0], idStatus: rs.data[index].idStatus },
          ...pre,
        ]);
      }
    }
  };

  const checkValue = (e, item) => {
    // setTemp([]);
    // getFac();
    // console.log(temp);
    let check = false;
    for (let i = 0; i < value.length; i++) {
      if (item.idFac == value[i].idFac) {
        value[i].idStatus = !e.target.checked ? 1 : 0;
        if (item.idStatus == value[i].idStatus) {
          value.splice(i, 1);
        }
        check = true;
        break;
      }
    }
    if (!check) {
      setValue((pre) => [
        ...pre,
        {
          idFac: item.idFac,
          idStatus: !e.target.checked ? 1 : 0,
        },
      ]);
    }
  };

  const handleDataChange = (e) => {
    setData((pre) => ({ ...pre, [e.target.name]: e.target.value }));
    setNote(e.target.value);
  };
  const handleStatus = (e) => {
    // e.preventDefault();
    setStatus(e.target.value);
    console.log(e.target.value);
  };

  useEffect(() => {
    getListMap();
    getFac()
    // console.log(red)
  }, []);
  // useEffect(() => {
  //   getListRedSeat()
  // }, [red]);

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
            onClick={() => window.location.reload()}
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
            {
              map?<Map map={map} item={props.data} setRed={setRedSeat}/>:null
            }
            
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
                            checkValue(e, item);
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
              <div style={{display:"flex", justifyContent:'space-between'}}>
              <label htmlFor="">Ghi chú</label>
              {localStorage.role === "PS00000003" ? (
              <button
                style={{
                  padding: "10px 20px",
                  border: "1px solid #000",
                  borderRadius: "30px",
                  background: "#fff",
                  cursor: "pointer",
                  marginBottom: "5px",
                  alignSelf: "flex-start",
                  marginRight: "150px",
                }}
                // onClick={()=>{console.log(red);}}
                onClick={handleCheck}
              >
                Cập nhật
              </button>
            ) : null}
              </div>
              
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
            {localStorage.role === "PS00000004" && props.data.note ? (
              <div
                style={{ width: "100%", marginTop: "20px", marginLeft: "30px" }}
              >
                <div>
                  <input
                    type="radio"
                    name="status"
                    id=""
                    onChange={handleStatus}
                    value={1}
                    checked={parseInt(status) === 1 || props.data.idStatus != 3 ? true : false}
                  />
                  <label htmlFor="">Tiếp tục sử dụng</label>
                </div>
                <div style={{ marginTop: "10px" }}>
                  <input
                    type="radio"
                    name="status"
                    id=""
                    value={3}
                    checked={parseInt(status) === 3 ? true : false}
                    onChange={handleStatus}
                  />
                  <label htmlFor="">Hỏng</label>
                </div>
                <button
                  style={{
                    padding: "10px 20px",
                    border: "1px solid #000",
                    borderRadius: "30px",
                    background: "#fff",
                    cursor: "pointer",
                    marginTop: "15px",
                    alignSelf: "flex-end",
                    marginRight: "150px",
                  }}
                  onClick={changeRoomStatus}
                >
                  Cập nhật
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default RoomDetail;