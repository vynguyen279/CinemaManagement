import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { redirect, Link } from "react-router-dom";

import {
  faIdCard,
  faUsers,
  faFilm,
  faTicket,
  faHouse,
  faCalendarDays,
  faLock,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { Menu } from "antd";

//import "./styles/tab.css";

function getItem(label, key, icon, path) {
  return {
    key,
    icon,
    label,
    path,
  };
}

const items = [
  getItem(
    <Link to={"/profile"}>
      <span style={{ fontSize: "20px", fontFamily: "IBM Plex Serif" }}>
        Hồ sơ
      </span>
    </Link>,
    "profile",
    <FontAwesomeIcon icon={faIdCard} style={{ fontSize: 25 }} />
  ),
  getItem(
    <Link to={"/login"}>
      <span style={{ fontSize: "20px", fontFamily: "IBM Plex Serif" }}>
        Nhân viên
      </span>
    </Link>,
    "/login",
    <FontAwesomeIcon icon={faUsers} style={{ fontSize: 25 }} />
  ),
  getItem(
    <span style={{ fontSize: "20px", fontFamily: "IBM Plex Serif" }}>
      Phim
    </span>,
    "/admin/film",
    <FontAwesomeIcon icon={faFilm} style={{ fontSize: 25 }} />
  ),
  getItem(
    <span style={{ fontSize: "20px", fontFamily: "IBM Plex Serif" }}>
      Loại vé
    </span>,
    "/admin/ticket",
    <FontAwesomeIcon icon={faTicket} style={{ fontSize: 25 }} />
  ),
  getItem(
    <span style={{ fontSize: "20px", fontFamily: "IBM Plex Serif" }}>
      Phòng chiếu
    </span>,
    "sub5",
    <FontAwesomeIcon icon={faHouse} style={{ fontSize: 25 }} />
  ),
  getItem(
    <span style={{ fontSize: "20px", fontFamily: "IBM Plex Serif" }}>
      Lịch chiếu
    </span>,
    "sub6",
    <FontAwesomeIcon icon={faCalendarDays} style={{ fontSize: 25 }} />
  ),
  getItem(
    <Link to={"/changePass"} key="changePass">
      <span style={{ fontSize: "20px", fontFamily: "IBM Plex Serif" }}>
        Đổi mật khẩu
      </span>
    </Link>,
    "changePass",
    <FontAwesomeIcon icon={faLock} style={{ fontSize: 25 }} />
  ),
  getItem(
    <Link to={"/login"}>
      <span style={{ fontSize: "20px", fontFamily: "IBM Plex Serif" }}>
        Đăng xuất
      </span>
    </Link>,
    "sub8",
    <FontAwesomeIcon
      icon={faRightFromBracket}
      style={{ fontSize: 25, color: "#555353" }}
    />
  ),
];

const Tab = (key) => {
  useEffect(() => {
    console.log("This is log: " + key);
  });

  const onClick = (e) => {
    return;
  };
  return (
    <Menu
      onClick={onClick}
      style={{
        width: "200px",
        height: window.innerHeight - 60,
        flexShrink: "0",
      }}
      defaultSelectedKeys={[key]}
      defaultOpenKeys={[key]}
      mode="inline"
      items={items}
    />
  );
};
export default Tab;
