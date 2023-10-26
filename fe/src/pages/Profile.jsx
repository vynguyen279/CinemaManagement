import React, { useRef, useEffect, useState } from "react";
import { Form, FormGroup, Input } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faUser,
  faAddressCard,
  faAddressBook,
  faBirthdayCake,
} from "@fortawesome/free-solid-svg-icons";
import PhoneInput from "react-phone-number-input";
import { toast } from "react-toastify";

import checkRole from "../utils/checkRole";
import Layout from "../components";
import "../styles/share.css";
import { frameFill, frameInput, frameIconDark, icon } from "../styles/share";
import { selectInf, updateInf } from "../utils/services";

const Profile = () => {
  const [data, setData] = useState({
    idStaff: "",
    name: "",
    email: "",
    citiIden: "",
    address: "",
    phone: "",
    dateBirth: "",
    sex: false,
  });
  const [phone, setPhone] = useState("");
  const [male, setMale] = useState(false);

  const update = async (e) => {
    e.preventDefault();
    data.sex = male;
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
    // if (
    //   data.email.length > 50 ||
    //   data.name.length > 50 ||
    //   data.address.length > 50
    // ) {
    //   toast.error("Họ tên, Email, Địa chỉ không vượt quá 50 kí tự");
    //   return;
    // }
    // if (data.citiIden.length !== 12) {
    //   toast.error("CCCD phải đủ 12 số");
    //   return;
    // }
    // if (isNaN(data.citiIden)) {
    //   toast.error("CCCD là số");
    //   return;
    // }
    const rs = await updateInf(data);
    if (!rs.status) {
      return;
    } else {
      console.log(data);
    }
    setTimeout(() => window.location.reload(), 1500);
  };

  const getInf = async () => {
    checkRole();
    const params = {
      idStaff: localStorage.getItem("id"),
    };
    const rs = await selectInf(params);
    if (rs.status) {
      setData(rs.data[0]);
      setPhone(rs.data[0].phone);
      return;
    }
    return;
  };

  const handleDataChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(e.target.value);
  };

  useEffect(() => {
    getInf();
  }, []);

  return (
    <Layout
      title="Thông tin cá nhân"
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
              <Form style={{ marginTop: "30px" }} onSubmit={(e) => update(e)}>
                <FormGroup>
                  <div style={frameFill}>
                    <div style={frameIconDark}>
                      <FontAwesomeIcon icon={faUser} style={icon} />
                    </div>

                    <Input
                      type="text"
                      name="name"
                      id="name"
                      style={frameInput}
                      onChange={(e) => handleDataChange(e)}
                      value={data.name}
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
                      onChange={(e) => handleDataChange(e)}
                      value={data.email}
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
                    <div style={frameIconDark}>
                      <FontAwesomeIcon icon={faAddressCard} style={icon} />
                    </div>

                    <Input
                      type="text"
                      name="citiIden"
                      id="citiIden"
                      style={frameInput}
                      onChange={(e) => handleDataChange(e)}
                      value={data.citiIden}
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
                      onChange={(e) => handleDataChange(e)}
                      value={data.address}
                    />
                  </div>
                </FormGroup>
                <FormGroup>
                  <div style={frameFill} className="margin-frame">
                    <div style={frameIconDark}>
                      <FontAwesomeIcon icon={faBirthdayCake} style={icon} />
                    </div>

                    <input
                      type="text"
                      name="dateBirth"
                      id="dateBirth"
                      style={frameInput}
                      onChange={(e) => handleDataChange(e)}
                      onFocus={(e) => (e.target.type = "date")}
                      value={String(data.dateBirth).split("T")[0]}
                    />
                  </div>
                </FormGroup>
                <div
                  style={{
                    fontSize: "20px",
                    color: "#000",
                    marginTop: "20px",
                    justifyContent: "center",
                    display: "flex",
                    fontFamily: "IBM Plex Serif",
                  }}
                >
                  {data.sex === false ? (
                    <>
                      <input
                        type="radio"
                        name="sex"
                        value="false"
                        checked="true"
                        onChange={(e) => setMale(e.target.value)}
                      />
                      <label for="male">Nam</label>
                      <input
                        type="radio"
                        name="sex"
                        value="true"
                        onChange={(e) => setMale(e.target.value)}
                      />
                      <label for="feMale">Nữ</label>
                    </>
                  ) : (
                    <>
                      <input
                        type="radio"
                        id="sex"
                        name="sex"
                        value="false"
                        onChange={(e) => setMale(e.target.value)}
                      />
                      <label for="male">Nam</label>
                      <input
                        type="radio"
                        id="sex"
                        name="sex"
                        checked="true"
                        value="true"
                        onChange={(e) => setMale(e.target.value)}
                      />
                      <label for="feMale">Nữ</label>
                    </>
                  )}
                </div>
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
  height: "600px",
  borderRadius: "20px",
  borderColor: "#000",
  borderWidth: 1,
  backgroundColor: "#C5E2EC",
};
export default Profile;
