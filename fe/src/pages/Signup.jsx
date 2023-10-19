import React from "react";
import { useState } from "react";
import { Form, FormGroup, Input } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faUser,
  faAddressCard,
  faAddressBook,
  faBirthdayCake,
} from "@fortawesome/free-solid-svg-icons";
import { Link, Navigate, redirect } from "react-router-dom";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { toast } from "react-toastify";

import { check, signUp } from "../utils/services";
import "../styles/share.css";

import {
  page,
  txtTitle,
  frameFill,
  frameInput,
  frameIcon,
} from "../styles/share";

const Signup = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    citiIden: "",
    address: "",
    phone: "",
    dateBirth: "",
    sex: false,
  });

  const [phone, setPhone] = useState("");

  const checkInvalid = async (e) => {
    e.preventDefault();
    localStorage.removeItem("data");
    // if (
    //   !data.name ||
    //   !data.email ||
    //   !data.phone ||
    //   !data.citiIden ||
    //   !data.address ||
    //   !data.dateBirth
    // ) {
    //   toast.error("Không được để trống!");
    //   return;
    // }
    // if (!/\S+@\S+\.\S+/.test(data.email)) {
    //   toast.error("Email không hợp lệ!");
    //   return;
    // }
    // const rs = await check(data);
    // if (!rs.status) {
    //   return;
    // }
    // if (
    //   data.email.length > 50 ||
    //   data.name.length > 50 ||
    //   data.address.length > 50
    // ) {
    //   toast.error("Họ tên, Email, Địa chỉ không vượt quá 50 kí tự");
    //   return;
    // }
    // if (/^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/.test(data.phone)) {
    //   toast.error("Số điện thoại không hợp lệ!");
    //   return;
    // }
    // if (data.citiIden.length !== 12) {
    //   toast.error("CCCD phải đủ 12 số");
    //   return;
    // }
    // if (isNaN(data.citiIden)) {
    //   console.log(data.citiIden.length);
    //   toast.error("CCCD là số");
    //   return;
    // }
    // let date = new Date().toLocaleString()
    // let year = new Date().toLocaleString("default", { year: "numeric" });
    // if (new Date(data.dateBirth).toLocaleString()>date) {
    //   toast.error("Ngày sinh không hợp lệ!");
    //   return;
    // }
    // if (new Date(data.dateBirth).toLocaleString()<date) {
    //   console.log(new Date(data.dateBirth).toLocaleString(),date)
    //   // console.log(date - new Date(data.dateBirth).getFullYear());
    //   toast.error("không hợp lệ!");
    //   return;
    // }
    localStorage.setItem("name", data.name);
    localStorage.setItem("email", data.email);
    localStorage.setItem("phone", data.phone);
    localStorage.setItem("citiIden", data.citiIden);
    localStorage.setItem("sex", data.sex);
    localStorage.setItem("dateBirth", data.dateBirth);
    localStorage.setItem("address", data.address);
    const params = {
      name: data.name,
      dateBirth: data.dateBirth,
      email: data.email,
      citiIden: data.citiIden,
      phone: data.phone,
      address: data.address,
      sex: data.sex,
      pass: null,
      repass: null,
    };
    // console.log(params);
    const rs = await signUp(params);
    console.log(rs);
    if (!rs.status) {
      return;
    }
    window.location.href = "/continue";
  };

  const handleDataChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div style={page}>
      <div style={frame}>
        <div style={txtTitle}>ĐĂNG KÝ</div>
        <div
          style={{
            justifyContent: "center",
            display: "flex",
            marginTop: "10px",
          }}
        >
          <Form onSubmit={(e) => checkInvalid(e)}>
            <FormGroup>
              <div style={frameFill}>
                <div style={frameIcon}>
                  <FontAwesomeIcon
                    icon={faUser}
                    style={{ fontSize: 18, color: "#5F5B5B" }}
                  />
                </div>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  style={frameInput}
                  onChange={(e) => handleDataChange(e)}
                  placeholder="Họ tên"
                />
              </div>
            </FormGroup>

            <FormGroup>
              <div style={frameFill} className="margin-frame">
                <div style={frameIcon}>
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    style={{ fontSize: 18, color: "#5F5B5B" }}
                  />
                </div>

                <Input
                  type="text"
                  name="email"
                  id="email"
                  style={frameInput}
                  onChange={(e) => handleDataChange(e)}
                  placeholder="Email"
                />
              </div>
            </FormGroup>
            <FormGroup>
              <div style={frameFill} className="margin-frame">
                <PhoneInput
                  placeholder="Số điện thoại"
                  value={phone}
                  onChange={(phone) => setData({ ...data, phone: phone })}
                  style={{ marginLeft: "10px" }}
                />
              </div>
            </FormGroup>
            <FormGroup>
              <div style={frameFill} className="margin-frame">
                <div style={frameIcon}>
                  <FontAwesomeIcon
                    icon={faAddressCard}
                    style={{ fontSize: 18, color: "#5F5B5B" }}
                  />
                </div>

                <Input
                  type="text"
                  name="citiIden"
                  id="citiIden"
                  style={frameInput}
                  onChange={(e) => handleDataChange(e)}
                  placeholder="CCCD"
                />
              </div>
            </FormGroup>
            <FormGroup>
              <div style={frameFill} className="margin-frame">
                <div style={frameIcon}>
                  <FontAwesomeIcon
                    icon={faAddressBook}
                    style={{ fontSize: 18, color: "#5F5B5B" }}
                  />
                </div>

                <Input
                  type="text"
                  name="address"
                  id="address"
                  style={frameInput}
                  onChange={(e) => handleDataChange(e)}
                  placeholder="Địa chỉ"
                />
              </div>
            </FormGroup>
            <FormGroup>
              <div style={frameFill} className="margin-frame">
                <div style={frameIcon}>
                  <FontAwesomeIcon
                    icon={faBirthdayCake}
                    style={{ fontSize: 18, color: "#5F5B5B" }}
                  />
                </div>

                <Input
                  type="date"
                  name="dateBirth"
                  id="dateBirth"
                  style={frameInput}
                  onChange={(e) => handleDataChange(e)}
                  placeholder="Ngày sinh"
                />
              </div>
            </FormGroup>
            <div
              style={{
                fontSize: "20px",
                color: "#fff",
                marginTop: "20px",
                justifyContent: "center",
                display: "flex",
              }}
            >
              <Input
                type="radio"
                id="name"
                name="sex"
                value="false"
                checked="true"
                onChange={(e) => handleDataChange(e)}
              />
              <label for="male">Nam</label>
              <Input
                type="radio"
                id="contactChoice2"
                name="sex"
                value="true"
                onChange={(e) => handleDataChange(e)}
              />
              <label for="feMale">Nữ</label>
            </div>
            <div className="out-input">
              <button type="submit" className="btn-confirm">
                Tiếp tục
              </button>
              <div className="text-center">
                <p style={{ margin: 0 }}>Bạn đã có tài khoản?</p>
                <Link className="forget-pass" to="/login">
                  Đăng nhập
                </Link>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

const frame = {
  width: "400px",
  height: "700px",
  borderRadius: "20px",
  borderColor: "#000",
  borderWidth: 1,
  backgroundColor: "rgba(13, 12, 12, 0.76)",
};

export default Signup;
