import React, { useState } from "react";
import { Modal, ModalHeader } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquareXmark } from "@fortawesome/free-solid-svg-icons";

import "../../../styles/share.css";
import "../style.css";
import {} from "../../../utils/services";
import ColorToggleButton from "./ColorToggleButton";

const MapSeat = (props) => {
  //   const getLimitedList = () => {
  //     return initialData.slice(start, end);
  //   };
  return (
    <Modal
      isOpen={props.show}
      backdrop="static"
      keyboard={false}
      className="modal"
      style={{ zIndex: 0 }}
    >
      <div className="modal-box-map">
        <ModalHeader closeButton className="header-modal">
          <div className="modal-title">Sơ đồ chỗ ngồi</div>
          <FontAwesomeIcon
            icon={faSquareXmark}
            onClick={() => props.sendData(false)}
            className="icon"
          />
        </ModalHeader>
        <div style={{ marginTop: "40px" }}>
          <div className="row">
            <button className="btn-row">A</button>
            {props.map.slice(0, 8)?.map((item, index) => (
              <ColorToggleButton
                defaultColor={item.idStatus == 0 ? "#e71717" : "#fff"}
                alternateColor={item.idStatus == 1 ? "#e71717" : "#fff"}
                item={item}
              />
            ))}
          </div>
          <div className="row">
            <button className="btn-row">B</button>
            {props.map.slice(8, 16)?.map((item, index) => (
              <ColorToggleButton
                defaultColor={item.idStatus == 0 ? "#e71717" : "#fff"}
                alternateColor={item.idStatus == 1 ? "#e71717" : "#fff"}
                item={item}
              />
            ))}
          </div>
          <div className="row">
            <button className="btn-row">C</button>
            {props.map.slice(16, 24)?.map((item, index) => (
              <ColorToggleButton
                defaultColor={item.idStatus == 0 ? "#e71717" : "#fff"}
                alternateColor={item.idStatus == 1 ? "#e71717" : "#fff"}
                item={item}
              />
            ))}
          </div>
          <div className="row">
            <button className="btn-row">D</button>
            {props.map.slice(24, 32)?.map((item, index) => (
              <ColorToggleButton
                defaultColor={item.idStatus == 0 ? "#e71717" : "#fff"}
                alternateColor={item.idStatus == 1 ? "#e71717" : "#fff"}
                item={item}
              />
            ))}
          </div>
          <div className="row">
            <button className="btn-row">E</button>
            {props.map.slice(32, 40)?.map((item, index) => (
              <ColorToggleButton
                defaultColor={item.idStatus == 0 ? "#e71717" : "#fff"}
                alternateColor={item.idStatus == 1 ? "#e71717" : "#fff"}
                item={item}
              />
            ))}
          </div>
          <div className="row">
            <button className="btn-row">F</button>
            {props.map.slice(40, 48)?.map((item, index) => (
              <ColorToggleButton
                defaultColor={item.idStatus == 0 ? "#e71717" : "#fff"}
                alternateColor={item.idStatus == 1 ? "#e71717" : "#fff"}
                item={item}
              />
            ))}
          </div>
          <div className="row">
            <button className="btn-row">G</button>
            {props.map.slice(48, 56)?.map((item, index) => (
              <ColorToggleButton
                defaultColor={item.idStatus == 0 ? "#e71717" : "#fff"}
                alternateColor={item.idStatus == 1 ? "#e71717" : "#fff"}
                item={item}
              />
            ))}
          </div>
          <div className="row">
            <button className="btn-row">H</button>
            {props.map.slice(56, 64)?.map((item, index) => (
              <ColorToggleButton
                defaultColor={item.idStatus == 0 ? "#e71717" : "#fff"}
                alternateColor={item.idStatus == 1 ? "#e71717" : "#fff"}
                item={item}
              />
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};
export default MapSeat;
