import React, { useState } from "react";
import { Modal, ModalHeader, Input } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareXmark } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";

import { insertST, listRoomEmpty } from "../../../utils/services";
import "../../../styles/share.css";
import "../style.css";

const InsertST = (props) => {
  const [room, setRoom] = useState([]);
  const [dur, setDur] = useState("");
  const [img, setImg] = useState("");
  const [data, setData] = useState({
    showDateTime: "",
    idMovie: "",
    idTic: "",
    idRoom: "",
  });

  // const [empty, setEmpty] = useState({
  //   start: "",
  //   duration: "",
  //   idST: "",
  // });

  const getDuration = (e) => {
    setData({ ...data, idMovie: e.target.value });
    for (let i = 0; i < props.movie.length; i++) {
      if (props.movie[i].idMovie === e.target.value) {
        // setEmpty({ ...empty, duration: props.movie[i].duration });
        setDur(props.movie[i].duration);
        setImg(props.movie[i].img);
      }
    }
  };

  // Khi chọn thời gian bắt đầu chiếu
  //  + Không trùng thời gian lịch chiếu khác
  //  + Không nằm trong khung giờ lịch chiếu khác đang chiếu
  //  + Đến thời lượng phim mình chọn không diễn ra sau thời gian có trong lịch chiếu khác trong cùng ngày)
  // Lấy danh sách phòng trống, không bị hỏng
  const getListRoom = async (empty) => {
    console.log(empty);
    const rs = await listRoomEmpty(empty);
    if (!rs.status) {
      return;
    } else {
      console.log(rs);
      setRoom(rs.data);
    }
    console.log(room);
    return;
  };

  const getDateTime = (e) => {
    setData({ ...data, showDateTime: e.target.value + ":00Z" });

    if (dur == "") {
      toast.error("Chưa chọn phim!");
      return;
    }
    const empty = {
      start: e.target.value + ":00Z",
      duration: dur,
      idST: "",
      idBra: localStorage.getItem("branch"),
    };
    getListRoom(empty);
  };

  const insert = async () => {
    const rs = await insertST(data);
    if (!rs.status) {
      console.log(data);
      return;
    } else {
      setTimeout(() => window.location.reload(), 1500);
    }
  };

  // const insertStatus = (e) => {
  //   e.preventDefault();
  //   if (data.idMovie == "") {
  //     toast.error("Chưa chọn phim!");
  //     return;
  //   }
  //   if (data.showDateTime == "") {
  //     toast.error("Chưa chọn thời gian!");
  //     return;
  //   }
  //   if (new Date(String(data.showDateTime).split(":00Z")[0]) < new Date()) {
  //     toast.error("Quá thời gian để thêm!");
  //     return;
  //   }
  //   if (data.idRoom == "") {
  //     toast.error("Chưa chọn phòng!");
  //     return;
  //   }
  //   if (data.idTic == "") {
  //     toast.error("Chưa chọn giá vé!");
  //     return;
  //   }
  //   insert();
  // };

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
          <div className="modal-title">Thêm mới</div>
          <FontAwesomeIcon
            icon={faSquareXmark}
            onClick={(e) => resetValue(e)}
            className="icon"
          />
        </ModalHeader>
        <div className="status" style={{ marginBottom: "10px" }}>
          <div className="frame-gener">
            <img
              src={
                img ||
                "https://climate.onep.go.th/wp-content/uploads/2020/01/default-image.jpg"
              }
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
                value={data.idMovie}
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
                type="datetime-local"
                className="font-text frame-chevron"
                name="start"
                onChange={(e) => getDateTime(e)}
              />
              <div className="font-text" style={{ marginTop: "10px" }}>
                Phòng chiếu
              </div>
              <select
                className="font-text frame-chevron"
                value={data.idRoom}
                onChange={(e) => setData({ ...data, idRoom: e.target.value })}
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
                value={data.idTic}
                onChange={(e) => setData({ ...data, idTic: e.target.value })}
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
          </div>
          {/* <div className="frame-status">
            <div className="font-text">Ngày chiếu - Giờ chiếu</div>
            <input
              type="datetime-local"
              className="font-text frame-chevron"
              name="start"
              onChange={(e) => getDateTime(e)}
            />
          </div>
          <div className="frame-status">
            <div className="font-text">Phòng chiếu</div>
            <select
              className="font-text frame-chevron"
              value={data.idRoom}
              onChange={(e) => setData({ ...data, idRoom: e.target.value })}
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
              value={data.idTic}
              onChange={(e) => setData({ ...data, idTic: e.target.value })}
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
            onClick={(e) => insert(e)}
          >
            Thêm mới
          </button>
        </div>
      </div>
    </Modal>
  );
};
export default InsertST;
