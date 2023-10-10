import React, { useState } from "react";
import { Modal, ModalHeader, Input } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareXmark } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
// import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";

import { listRoomEmpty, updateST } from "../../../utils/services";
import "../../../styles/share.css";
import "../style.css";

const UpdateST = (props) => {
  const [room, setRoom] = useState([]);
  const [dur, setDur] = useState("");
  const [img, setImg] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [idMovie, setIdMovie] = useState("");
  const [idTic, setIdTic] = useState("");
  const [idNewRoom, setNewRoom] = useState("");
  // const [data, setData] = useState({
  //   idST: "",
  //   showDateTime: "",
  //   idMovie: "",
  //   idTic: "",
  //   newRoom: "",
  //   oldRoom: "",
  // });

  const getDuration = (e) => {
    setIdMovie(e.target.value);
    for (let i = 0; i < props.movie.length; i++) {
      if (props.movie[i].idMovie === e.target.value) {
        // setEmpty({ ...empty, duration: props.movie[i].duration });
        setDur(props.movie[i].duration);
        setImg(props.movie[i].img);
      }
    }
  };

  const getDateTime = async (e) => {
    setDateTime(e.target.value + ":00Z");
    if (dur == "") {
      setDur(props.item.duration);
    }
    const empty = {
      start: e.target.value + ":00Z",
      duration: dur,
      idST: props.item.idST,
      idBra: localStorage.getItem("branch"),
    };
    console.log(empty);
    const rs = await listRoomEmpty(empty);
    if (!rs.status) {
      return;
    } else {
      setRoom(rs.data);
    }
    console.log(room);
    return;
  };

  const updateStatus = async (e) => {
    e.preventDefault();
    if (idNewRoom == "" && dateTime != "") {
      toast.error("Chưa chọn phòng!");
      return;
    }
    if (new Date(String(dateTime).split(":00Z")[0]) < new Date()) {
      toast.error("Quá thời gian để sửa!");
      return;
    }
    const data = {
      idST: props.item.idST,
      showDateTime: dateTime || props.item.showDateTime,
      idMovie: idMovie || props.item.idMovie,
      idTic: idTic || props.item.idTic,
      newRoom: idNewRoom || props.item.idRoom,
      oldRoom: props.item.idRoom,
    };
    console.log(data);
    const rs = await updateST(data);
    if (!rs.status) {
      console.log(data);
      return;
    } else {
      setTimeout(() => window.location.reload(), 1500);
    }
  };

  const resetValue = (e) => {
    e.preventDefault();
    setRoom([]);
    props.sendData(false);
  };
  return (
    <Modal
      isOpen={props.show}
      backdrop="static"
      keyboard={false}
      className="modal"
    >
      <div className="modal-box-film">
        <ModalHeader closeButton className="header-modal">
          <div className="modal-title">Chỉnh sửa</div>
          <FontAwesomeIcon
            icon={faSquareXmark}
            onClick={(e) => resetValue(e)}
            className="icon"
          />
        </ModalHeader>
        <div className="status" style={{ marginBottom: "10px" }}>
          <div className="frame-gener">
            <img
              src={img || props.item.img}
              alt=""
              name="img"
              value={img}
              // className='form-avt'
              width="300"
            />
            <div className="frame-status" style={{ marginLeft: "50px" }}>
              <div className="font-text">Tên phim</div>
              <select
                className="font-text frame-chevron"
                value={idMovie || props.item.idMovie}
                onChange={(e) => getDuration(e)}
              >
                <option>Chọn phim</option>
                {props.movie?.map((item, index) => (
                  <option value={item.idMovie}>
                    {item.nameMovie.length > 20
                      ? item.nameMovie.substring(0, 19) + "..."
                      : item.nameMovie}
                  </option>
                ))}
              </select>
              <div className="font-text" style={{ marginTop: "10px" }}>
                Ngày chiếu - Giờ chiếu
              </div>
              <input
                type="text"
                className="font-text frame-chevron"
                name="start"
                onFocus={(e) => (e.target.type = "datetime-local")}
                onChange={getDateTime}
                placeholder={String(props.item.showDateTime)
                  .split(":00.000Z")[0]
                  .replace("T", " / ")}
              />
              <div className="font-text" style={{ marginTop: "10px" }}>
                Phòng chiếu
              </div>
              <select
                className="font-text frame-chevron"
                value={idNewRoom}
                onChange={(e) => setNewRoom(e.target.value)}
              >
                <option>Chọn phòng</option>

                {room?.map((item, index) => (
                  <option value={item.idRoom}>
                    {item.idRoom}
                    {" - "}
                    {item.nameRoom}
                  </option>
                ))}
              </select>
              <div className="font-text" style={{ marginTop: "10px" }}>
                Giá vé
              </div>
              <select
                className="font-text frame-chevron"
                value={idTic || props.item.idTic}
                onChange={(e) => setIdTic(e.target.value)}
              >
                <option>Chọn giá vé</option>

                {props.ticket?.map((item, index) => (
                  <option value={item.idTic}>
                    {item.idTic}
                    {" - "}
                    {item.nameTic}
                  </option>
                ))}
              </select>
            </div>
            {/* <div className="frame-status">
              <div className="font-text">Ngày chiếu - Giờ chiếu</div>
              <input
                type="text"
                className="font-text frame-chevron"
                name="start"
                onFocus={(e) => (e.target.type = "datetime-local")}
                onChange={getDateTime}
                placeholder={String(props.item.showDateTime)
                  .split(":00.000Z")[0]
                  .replace("T", " / ")}
              />
            </div>
            <div className="frame-status">
              <div className="font-text">Phòng chiếu</div>
              <select
                className="font-text frame-chevron"
                value={idNewRoom}
                onChange={(e) => setNewRoom(e.target.value)}
              >
                <option>Chọn phòng</option>

                {room?.map((item, index) => (
                  <option value={item.idRoom}>
                    {item.idRoom}
                    {" - "}
                    {item.nameRoom}
                  </option>
                ))}
              </select>
            </div>
            <div className="frame-status">
              <div className="font-text">Giá vé</div>
              <select
                className="font-text frame-chevron"
                value={idTic || props.item.idTic}
                onChange={(e) => setIdTic(e.target.value)}
              >
                <option>Chọn giá vé</option>

                {props.ticket?.map((item, index) => (
                  <option value={item.idTic}>
                    {item.idTic}
                    {" - "}
                    {item.nameTic}
                  </option>
                ))}
              </select>
            </div> */}
          </div>
          <div
            className="out-input"
            style={{
              marginTop: "10px",
            }}
          >
            <button
              type="submit"
              className="btn-confirm"
              style={{
                backgroundColor: "#fff",
                color: "#000",
              }}
              onClick={(e) => updateStatus(e)}
            >
              Cập nhật
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default UpdateST;
