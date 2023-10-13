import React, { useEffect, useState } from "react";
import { Form, FormGroup, Input } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { signUp } from "../utils/services";
import "../styles/login.css";
import "../styles/share.css";
import { page, frameFill, frameInput, frameIcon } from "../styles/share";

const Continue = () => {
  const [form, setForm] = useState({
    pass: "",
    rePass: "",
  });
  // const checkInvalid = () => {
  //   if (!form.pass || !form.rePass) {
  //     toast.error("Không được để trống!");
  //     return false;
  //   }
  //   if (form.pass.length !== 8) {
  //     toast.error("Mật khẩu phải đủ 8 ký tự!");
  //     return false;
  //   }
  //   if (form.pass !== form.rePass) {
  //     toast.error("Nhập lại mật khẩu không chính xác!");
  //     return false;
  //   }
  //   return true;
  // };
  const handleSignUp = async (e) => {
    e.preventDefault();
    // if (!checkInvalid()) return;
    const params = {
      name: localStorage.getItem("name"),
      dateBirth: localStorage.getItem("dateBirth"),
      email: localStorage.getItem("email"),
      citiIden: localStorage.getItem("citiIden"),
      phone: localStorage.getItem("phone"),
      address: localStorage.getItem("address"),
      sex: localStorage.getItem("sex"),
      pass: form.pass,
      repass: form.rePass,
    };
    // console.log(params);
    const rs = await signUp(params);
    if (!rs.status) {
      return;
    }
    localStorage.clear();
    setTimeout(() => {
      window.location.href = "/login";
    }, 2500);
  };

  const handleDataChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div style={page}>
      <div style={frame}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Link to="/signup">
            <FontAwesomeIcon
              icon={faArrowLeft}
              style={{
                fontSize: 40,
                color: "#fff",
                fontWeight: 700,
                marginTop: "30px",
              }}
            />
          </Link>
        </div>
        <div
          style={{
            justifyContent: "center",
            display: "flex",
            marginTop: "10px",
          }}
        >
          <Form onSubmit={(e) => handleSignUp(e)}>
            <FormGroup>
              <div
                style={{ fontSize: "16px", color: "#fff", marginTop: "20px" }}
              >
                Nhập mật khẩu
              </div>
              <div style={frameFill}>
                <div style={frameIcon}>
                  <FontAwesomeIcon
                    icon={faLock}
                    style={{ fontSize: 18, color: "#5F5B5B" }}
                  />
                </div>
                <Input
                  type="password"
                  name="pass"
                  id="pass"
                  style={frameInput}
                  onChange={(e) => handleDataChange(e)}
                  placeholder="password"
                />
              </div>
              <div
                style={{ fontSize: "16px", color: "#fff", marginTop: "20px" }}
              >
                Nhập lại mật khẩu
              </div>
              <div style={frameFill}>
                <div style={frameIcon}>
                  <FontAwesomeIcon
                    icon={faLock}
                    style={{ fontSize: 18, color: "#5F5B5B" }}
                  />
                </div>
                <Input
                  type="password"
                  name="rePass"
                  id="rePass"
                  style={frameInput}
                  onChange={(e) => handleDataChange(e)}
                  placeholder="password"
                />
              </div>
            </FormGroup>

            <div className="out-input">
              <button type="submit" className="btn-confirm">
                Đăng ký
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
  width: "350px",
  height: "500px",
  borderRadius: "20px",
  borderColor: "#000",
  borderWidth: 1,
  backgroundColor: "rgba(13, 12, 12, 0.76)",
};

export default Continue;
