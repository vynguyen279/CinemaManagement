import React from "react";
import { Form, FormGroup, Input, Modal, ModalHeader } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareXmark,
  faEnvelope,
  faUser,
  faAddressCard,
  faAddressBook,
  faBirthdayCake,
  faRestroom,
} from "@fortawesome/free-solid-svg-icons";
import PhoneInput from "react-phone-number-input";

import "../../../styles/share.css";
import "../style.css";
import {
  frameIconDark,
  icon,
  frameFill,
  frameInput,
} from "../../../styles/share";

const DetailStaff = (props) => {
  return (
    <Modal
      isOpen={props.show}
      backdrop="static"
      keyboard={false}
      className="modal"
    >
      <div className="modal-box">
        <ModalHeader closeButton className="header-modal">
          <div className="modal-title">Chi tiết</div>
          <FontAwesomeIcon
            icon={faSquareXmark}
            onClick={() => props.sendData(false)}
            className="icon"
          />
        </ModalHeader>
        <div className="frame-detail">
          <Form>
            <FormGroup>
              <div style={frameFill}>
                <div style={frameIconDark}>
                  <FontAwesomeIcon icon={faUser} style={icon} />
                </div>

                <Input
                  type="text"
                  name="username"
                  id="username"
                  style={frameInput}
                  value={props.item.name}
                  disabled
                />
              </div>
            </FormGroup>
            <FormGroup>
              <div style={frameFill} className="margin-frame">
                <div style={frameIconDark}>
                  <FontAwesomeIcon icon={faEnvelope} style={icon} />
                </div>

                <Input
                  type="text"
                  name="email"
                  id="email"
                  style={frameInput}
                  value={props.item.email}
                  disabled
                />
              </div>
            </FormGroup>
            <FormGroup>
              <div style={frameFill} className="margin-frame">
                <PhoneInput
                  value={props.item.phone}
                  style={{ marginLeft: "10px" }}
                  disabled
                />
              </div>
            </FormGroup>
            <FormGroup>
              <div style={frameFill} className="margin-frame">
                <div style={frameIconDark}>
                  <FontAwesomeIcon icon={faAddressCard} style={icon} />
                </div>

                <Input
                  type="text"
                  name="cccd"
                  id="cccd"
                  style={frameInput}
                  value={props.item.citiIden}
                  disabled
                />
              </div>
            </FormGroup>
            <FormGroup>
              <div style={frameFill} className="margin-frame">
                <div style={frameIconDark}>
                  <FontAwesomeIcon icon={faAddressBook} style={icon} />
                </div>

                <Input
                  type="text"
                  name="address"
                  id="address"
                  style={frameInput}
                  value={props.item.address}
                  disabled
                />
              </div>
            </FormGroup>
            <FormGroup>
              <div style={frameFill} className="margin-frame">
                <div style={frameIconDark}>
                  <FontAwesomeIcon icon={faBirthdayCake} style={icon} />
                </div>

                <Input
                  type="text"
                  name="birthDay"
                  id="birthDay"
                  style={frameInput}
                  value={String(props.item.dateBirth).split("T")[0]}
                  disabled
                />
              </div>
            </FormGroup>
            <FormGroup>
              <div style={frameFill} className="margin-frame">
                <div style={frameIconDark}>
                  <FontAwesomeIcon icon={faRestroom} style={icon} />
                </div>

                <Input
                  type="text"
                  name="sex"
                  id="sex"
                  style={frameInput}
                  value={props.item.sex === true ? "Nữ" : "Nam"}
                  disabled
                />
              </div>
            </FormGroup>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
export default DetailStaff;
