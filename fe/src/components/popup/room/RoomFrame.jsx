import React, { useState } from "react";
import RoomDetail from "./RoomDetail";

const RoomFrame = (props) => {
  // console.log(props.data.note)
  const [show, setShow] = useState(false);
  const handleClose = (bool) => {
    setShow(bool);
  };
  return (
    <div
      style={{
        width: "30%",
        height: "30%",
        background: `${props.color}`,
        borderRadius: "10px",
        padding: "8px 20px",
        cursor: "pointer",
      }}
      onClick={() => setShow(true)}
    >
      <h2>{props.data.nameRoom}</h2>
      <h4>
        Trạng thái:{" "}
        {props.data.idStatus == 1
          ? "Trống"
          : props.data.idStatus == 2
          ? "Đang chờ kiểm tra"
          : props.data.idStatus == 3
          ? "Hỏng"
          : "Đang chiếu"}
      </h4>{" "}
      {props.data.note &&
      (props.data.idStatus == 1 || props.data.idStatus == 4) ? (
        <h6 style={{ fontSize: "20px", textAlign: "center" }}>!</h6>
      ) : null}
      <RoomDetail show={show} close={handleClose} data={props.data} />
    </div>
  );
};

export default RoomFrame;
