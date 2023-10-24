import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Form, FormGroup, Input } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { login } from "../utils/services";
import "react-toastify/dist/ReactToastify.css";

import "../styles/login.css";
import "../styles/share.css";
import {
  page,
  txtTitle,
  frameFill,
  frameInput,
  frameIcon,
} from "../styles/share";

function useAuth() {
  const handleLogin = async (e, data) => {
    e.preventDefault();
    // if (!data.email || !data.pass) {
    //   toast.error("Tên đăng nhập và mật khẩu không được để trống");
    //   console.log("Tên đăng nhập và mật khẩu không được để trống!");
    //   return;
    // }
    // if (!/\S+@\S+\.\S+/.test(data.email)) {
    //   toast.error("Email không hợp lệ!");
    //   return;
    // }
    const rs = await login(data);
    if (!rs.status) {
      return;
    }
    localStorage.setItem("token", rs.Authorization);
    localStorage.setItem("user", JSON.stringify(rs.data[0]));
    localStorage.setItem("role", rs.data[0].idPos);
    localStorage.setItem("id", rs.data[0].idStaff);
    console.log(localStorage.role);
    if (localStorage.role === "PS00000001")
      setTimeout(() => (window.location.href = "/admin/staff"), 1500);
    else if (localStorage.role === "PS00000002")
      setTimeout(() => (window.location.href = "/manager/showtime"), 1500);
    else {
      localStorage.setItem("branch", rs.data[0].idBra);
      if (localStorage.role === "PS00000003")
        setTimeout(() => (window.location.href = "/supervisor/room"), 1500);
      else setTimeout(() => (window.location.href = "/supervisor/room"), 1500);
    }
  };
  return {
    handleLogin,
  };
}

const Login = () => {
  useEffect(() => {
    localStorage.clear();
  });
  localStorage.clear();
  const [data, setData] = useState({
    email: "",
    pass: "",
  });
  const { handleLogin } = useAuth();
  const handleDataChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  return (
    <div style={page}>
      <div style={frame}>
        <div style={txtTitle}>ĐĂNG NHẬP</div>
        <div
          style={{
            justifyContent: "center",
            display: "flex",
            marginTop: "40px",
          }}
        >
          <Form onSubmit={(e) => handleLogin(e, data)}>
            <FormGroup>
              <div style={frameFill}>
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
                  placeholder="email"
                />
              </div>
            </FormGroup>
            <FormGroup>
              <div style={frameFill} className="margin-frame">
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
            </FormGroup>
            <div className="out-input">
              <Link
                to="/getpass"
                className="forget-pass"
                // onClick={handleShowEmail}
              >
                Quên mật khẩu?
              </Link>
              <button type="submit" className="btn-confirm">
                Đăng nhập
              </button>
              <div className="text-center">
                <p style={{ margin: 0 }}>Bạn chưa có tài khoản?</p>
                <Link className="forget-pass" to="/signup">
                  Đăng ký
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
  height: "450px",
  borderRadius: "20px",
  borderColor: "#000",
  borderWidth: 1,
  backgroundColor: "rgba(13, 12, 12, 0.76)",
};

export default Login;
