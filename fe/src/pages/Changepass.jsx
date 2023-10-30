import React, { useRef, useEffect, useState } from "react";
import { Form, FormGroup, Input } from "reactstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

import checkRole from "../utils/checkRole";
import Layout from "../components";
import "../styles/share.css";
import { frameFill, frameInput, frameIconDark, icon } from "../styles/share";
import { updatePass } from "../utils/services";

const Changepass = (e) => {
  const [data, setData] = useState({
    idStaff: localStorage.getItem("id"),
    pass: "",
    newPass: "",
    rePass: "",
  });

  const update = async (e) => {
    e.preventDefault();
    // if (!data.pass || !data.newPass || !data.rePass) {
    //   toast.error("Không được để trống!");
    //   return;
    // }
    // if (data.newPass.length !== 8) {
    //   toast.error("Mật khẩu phải đủ 8 ký tự!");
    //   return false;
    // }
    // if (data.newPass !== data.rePass) {
    //   toast.error("Nhập lại mật khẩu mới không trùng khớp!");
    //   return;
    // }
    const rs = await updatePass(data);
    if (rs.status) {
      setTimeout(() => window.location.reload(), 1500);
    }
  };

  const handleDataChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    checkRole();
  }, []);
  const [value, setValue] = useState();

  return (
    <Layout
      title="Thay đổi mật khẩu"
      pos={
        localStorage.role === "PS00000001"
          ? "Admin"
          : localStorage.role === "PS00000002"
          ? "Quản lý"
          : localStorage.role === "PS00000003"
          ? "Nhân viên"
          : "Giám sát"
      }
    >
      <div className="frame">
        <div className="frame-inside">
          <div style={frame}>
            <div
              style={{
                justifyContent: "center",
                display: "flex",
              }}
            >
              <Form style={{ marginTop: "50px" }} onSubmit={(e) => update(e)}>
                <FormGroup>
                  <div style={{ fontSize: "16px", color: "#000" }}>
                    Nhập lại mật khẩu cũ
                  </div>
                  <div style={frameFill}>
                    <div style={frameIconDark}>
                      <FontAwesomeIcon icon={faLock} style={icon} />
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
                    style={{
                      fontSize: "16px",
                      color: "#000",
                      marginTop: "20px",
                    }}
                  >
                    Nhập mật khẩu mới
                  </div>
                  <div style={frameFill}>
                    <div style={frameIconDark}>
                      <FontAwesomeIcon icon={faLock} style={icon} />
                    </div>
                    <Input
                      type="password"
                      name="newPass"
                      id="newPass"
                      style={frameInput}
                      onChange={(e) => handleDataChange(e)}
                      placeholder="password"
                    />
                  </div>
                  <div
                    style={{
                      fontSize: "16px",
                      color: "#000",
                      marginTop: "20px",
                    }}
                  >
                    Nhập lại mật khẩu mới
                  </div>
                  <div style={frameFill}>
                    <div style={frameIconDark}>
                      <FontAwesomeIcon icon={faLock} style={icon} />
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
                  <button
                    type="submit"
                    className="btn-confirm"
                    style={{ backgroundColor: "#fff", color: "#000" }}
                  >
                    Cập nhật
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
const frame = {
  width: "400px",
  height: "450px",
  borderRadius: "20px",
  borderColor: "#000",
  borderWidth: 1,
  backgroundColor: "#C5E2EC",
};
export default Changepass;
