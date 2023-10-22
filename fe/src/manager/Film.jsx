import React, { useRef, useEffect, useState } from "react";
import { Input } from "reactstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquarePen,
  faTrashAlt,
  faSquarePlus,
} from "@fortawesome/free-solid-svg-icons";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

import { listMovie, updateMov, deleteMov } from "../utils/services";
import checkRole from "../utils/checkRole";
import Layout from "../components";
import "../styles/share.css";
import InsertMovie from "../components/popup/movie/InsertMovie";
import UpdateMovie from "../components/popup/movie/UpdateMovie";
import Test from "../components/popup/movie/test";
const Film = () => {
  const [value, setValue] = useState([]);
  const [show, setShow] = useState(false);
  const [showUD, setShowUD] = useState(false);
  const [item, setItem] = useState("");

  const getList = async () => {
    checkRole();
    const data = {
      keyword: "",
    };
    const rs = await listMovie(data);
    if (!rs.status) {
      return;
    } else {
      setValue(rs.data);
    }
  };

  const getListSearch = async (e) => {
    const data = {
      keyword: e.target.value,
    };
    const rs = await listMovie(data);
    if (!rs.status) {
      return;
    } else {
      setValue(rs.data);
    }
  };

  const submit = (e, item) => {
    confirmAlert({
      title: "XÁC NHẬN",
      message: "Bạn có chắc muốn xóa?",
      buttons: [
        {
          label: "Có",
          onClick: () => deleteMovie(e, item),
        },
        {
          label: "Không",
          onClick: () => {},
        },
      ],
    });
  };

  const deleteMovie = async (e, item) => {
    e.preventDefault();
    const params = { idMovie: item.idMovie };
    const rs = await deleteMov(params);
    if (rs.status) {
      console.log(item.idMovie);
      setTimeout(() => window.location.reload(), 1500);
    }
    return;
  };

  const handlClose = (bool) => {
    setShow(bool);
  };

  const handlCloseUD = (bool) => {
    setShowUD(bool);
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <Layout title="Danh sách bộ phim" pos="Quản lý">
      <div className="frame">
        <div className="frame-inside" style={{ display: "block" }}>
          <div className="header-list">
            <Input
              placeholder="Tìm kiếm..."
              className="search"
              onChange={(e) => getListSearch(e)}
            />
            <button className="btn-plus">
              <FontAwesomeIcon
                icon={faSquarePlus}
                className="icon-plus"
                onClick={() => setShow(!show)}
              />
            </button>
          </div>
          <div className="frame-list">
            <table>
              <tr>
                <th>STT</th>
                <th>Mã bộ phim</th>
                <th>Hình ảnh</th>
                <th>Tên phim</th>
                <th>Khởi chiếu</th>
                <th>Thời lượng</th>
                <th>Nước sản xuất</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
              {value?.map((item, index) => (
                <tr key={item.idMovie}>
                  <td>{index + 1}</td>
                  <td>{item.idMovie}</td>
                  <td>
                    <img
                      src={
                        item.img ||
                        "https://climate.onep.go.th/wp-content/uploads/2020/01/default-image.jpg"
                      }
                      alt=""
                      name="img"
                      value={item.img}
                      width="100"
                    />
                  </td>
                  <td>
                    {item.nameMovie.length > 20
                      ? item.nameMovie.substring(0, 19) + "..."
                      : item.nameMovie}
                  </td>
                  <td>{String(item.preDate).split("T")[0]}</td>
                  <td>{item.duration} phút</td>
                  <td>{item.proCountry}</td>
                  <td>{item.idStatus == 1 ? "Đang chiếu" : "Ngừng chiếu"}</td>
                  <td>
                    <FontAwesomeIcon
                      icon={faSquarePen}
                      className="icon-action"
                      onClick={() => {
                        setShowUD(!showUD);
                        setItem(item);
                      }}
                    />
                    <FontAwesomeIcon
                      icon={faTrashAlt}
                      className="icon-action"
                      onClick={(e) => submit(e, item)}
                    />
                  </td>
                </tr>
              ))}
            </table>
          </div>
        </div>
      </div>
      <InsertMovie show={show} sendData={handlClose} />
      {showUD ? (
        <UpdateMovie show={showUD} sendData={handlCloseUD} item={item} />
      ) : null}
    </Layout>
  );
};

export default Film;
