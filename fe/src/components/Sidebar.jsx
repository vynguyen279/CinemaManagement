import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import {
  faIdCard,
  faUsers,
  faFilm,
  faTicket,
  faHouse,
  faCalendarDays,
  faLock,
  faRightFromBracket,
  faChartLine,
  faCodeBranch,
} from "@fortawesome/free-solid-svg-icons";

import signOut from "../utils/signOut";
import "./styles/tab.css";

const manager = [
  {
    path: "/profile",
    display: "Hồ sơ",
    icon: faIdCard,
  },
  {
    path: "/manager/dashboard",
    display: "Thống kê",
    icon: faChartLine,
  },
  {
    path: "/manager/branch",
    display: "Chi nhánh",
    icon: faCodeBranch,
  },
  {
    path: "/manager/film",
    display: "Phim",
    icon: faFilm,
  },
  {
    path: "/manager/ticket",
    display: "Loại vé",
    icon: faTicket,
  },
  {
    path: "/manager/room",
    display: "Phòng chiếu",
    icon: faHouse,
  },
  {
    path: "/manager/showtime",
    display: "Lịch chiếu",
    icon: faCalendarDays,
  },
  {
    path: "/changePass",
    display: "Đổi mật khẩu",
    icon: faLock,
  },
  {
    path: "/login",
    display: "Đăng xuất",
    icon: faRightFromBracket,
  },
];

const admin = [
  {
    path: "/profile",
    display: "Hồ sơ",
    icon: faIdCard,
  },
  {
    path: "/admin/staff",
    display: "Nhân viên",
    icon: faUsers,
  },
  {
    path: "/changePass",
    display: "Đổi mật khẩu",
    icon: faLock,
  },
  {
    path: "/login",
    display: "Đăng xuất",
    icon: faRightFromBracket,
  },
];

const supervisor = [
  {
    path: "/profile",
    display: "Hồ sơ",
    icon: faIdCard,
  },
  {
    path: "/manager/dashboard",
    display: "Thống kê",
    icon: faChartLine,
  },
  {
    path: "/supervisor/room",
    display: "Phòng chiếu",
    icon: faHouse,
  },
  {
    path: "/manager/showtime",
    display: "Lịch chiếu",
    icon: faCalendarDays,
  },
  {
    path: "/changePass",
    display: "Đổi mật khẩu",
    icon: faLock,
  },
  {
    path: "/login",
    display: "Đăng xuất",
    icon: faRightFromBracket,
  },
];

const staff = [
  {
    path: "/profile",
    display: "Hồ sơ",
    icon: faIdCard,
  },
  {
    path: "/supervisor/room",
    display: "Phòng chiếu",
    icon: faHouse,
  },
  {
    path: "/manager/showtime",
    display: "Lịch chiếu",
    icon: faCalendarDays,
  },
  {
    path: "/changePass",
    display: "Đổi mật khẩu",
    icon: faLock,
  },
  {
    path: "/login",
    display: "Đăng xuất",
    icon: faRightFromBracket,
  },
];

const Sidebar = (key) => {
  useEffect(() => {
    console.log("This is log: " + key);
  });

  const onClick = (e) => {
    return;
  };
  return (
    <div
      className="nav-frame"
      style={{
        height: window.innerHeight - 60,
      }}
    >
      {localStorage.role === "PS00000001"
        ? admin.map((item, index) => (
            <div className="nav-item" key={index}>
              <NavLink
                to={item.path}
                className={(navClass) =>
                  navClass.isActive ? "nav-active" : "nav-no-active"
                }
              >
                <FontAwesomeIcon icon={item.icon} className="nav-icon" />
                {item.display}
              </NavLink>
            </div>
          ))
        : localStorage.role === "PS00000002"
        ? manager.map((item, index) => (
            <div className="nav-item" key={index}>
              <NavLink
                to={item.path}
                className={(navClass) =>
                  navClass.isActive ? "nav-active" : "nav-no-active"
                }
              >
                <FontAwesomeIcon icon={item.icon} className="nav-icon" />
                {item.display}
              </NavLink>
            </div>
          ))
        : localStorage.role === "PS00000003"
        ? staff.map((item, index) => (
            <div className="nav-item" key={index}>
              <NavLink
                to={item.path}
                className={(navClass) =>
                  navClass.isActive ? "nav-active" : "nav-no-active"
                }
              >
                <FontAwesomeIcon icon={item.icon} className="nav-icon" />
                {item.display}
              </NavLink>
            </div>
          ))
        : supervisor.map((item, index) => (
            <div className="nav-item" key={index}>
              <NavLink
                to={item.path}
                className={(navClass) =>
                  navClass.isActive ? "nav-active" : "nav-no-active"
                }
              >
                <FontAwesomeIcon icon={item.icon} className="nav-icon" />
                {item.display}
              </NavLink>
            </div>
          ))}
    </div>
  );
};
export default Sidebar;
