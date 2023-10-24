import React, { useState } from "react";
import { Form, FormGroup, Input } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { resetPass, sendEmail } from "../utils/services";
import "../styles/login.css";
import "../styles/share.css";
import {
  page,
  txtTitle,
  frameFill,
  frameInput,
  frameIcon,
} from "../styles/share";

const Getpass = () => {
  const [email, setEmail] = useState("");

  const handleGetPass = async (e) => {
    e.preventDefault();
    const data = {
      email: email,
    };
    const rs = await resetPass(data);
    if (!rs.status) {
      return;
    } else {
      const params = {
        email: email,
        mess: rs.data,
      };
      const res = await sendEmail(params);
    }
  };

  return (
    <div style={page}>
      <div style={frame}>
        <div style={txtTitle}>LẤY LẠI MẬT KHẨU</div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Link to="/login">
            <FontAwesomeIcon
              icon={faArrowLeft}
              style={{ fontSize: 40, color: "#fff", fontWeight: 700 }}
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
          <Form onSubmit={(e) => handleGetPass(e)}>
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
                  name="username"
                  id="username"
                  style={frameInput}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email"
                />
              </div>
            </FormGroup>

            <div className="out-input">
              <button type="submit" className="btn-confirm">
                Gửi
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
  width: "400px",
  height: "300px",
  borderRadius: "20px",
  borderColor: "#000",
  borderWidth: 1,
  backgroundColor: "rgba(13, 12, 12, 0.76)",
};

export default Getpass;
