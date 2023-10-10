import React, { useEffect, useState } from "react";
import { Input } from "reactstrap";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquarePen,
  faTrashAlt,
  faSquarePlus,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

import {
  listST,
  getListTicket,
  listMovieActive,
  checkST,
  cancelST,
  listRoomEmpty,
  listBranch,
} from "../utils/services";
import checkRole from "../utils/checkRole";
import Layout from "../components/index";
import "../styles/share.css";
import "../components/popup/style.css";
import InsertST from "../components/popup/showtime/InsertST";
import UpdateST from "../components/popup/showtime/UpdateST";
import ChangeRM from "../components/popup/showtime/ChangeRM";

const Showtime = () => {
  checkRole();

  const [show, setShow] = useState(false);
  const [list, setList] = useState([]);
  const [listBra, setListBra] = useState([]);
  const [movie, setMovie] = useState([]);
  const [item, setItem] = useState("");
  const [room, setRoom] = useState([]);
  const [ticket, setTicket] = useState([]);
  const [change, setChange] = useState(false);
  const [update, setUpdate] = useState(false);
  const [data, setData] = useState({
    key: 0,
    start: "",
    end: "",
    keyword: "",
    idBra:
      localStorage.role === "PS00000002" ? "" : localStorage.getItem("branch"),
  });

  const getList = async () => {
    const rs = await listST(data);
    if (!rs.status) {
      return;
    } else {
      setList(rs.data);
    }
  };

  const getListBranch = async () => {
    const data = {
      keyword: "",
    };
    const rs = await listBranch(data);
    if (!rs.status) {
      return;
    } else {
      setListBra(rs.data);
    }
  };

  const getListSearch = async (e) => {
    setData({ ...data, keyword: e.target.value });
    const rs = await listST(data);
    if (!rs.status) {
      return;
    } else {
      setList(rs.data);
    }
  };

  const listMovie = async () => {
    const rs = await listMovieActive();
    if (rs.status) {
      setMovie(rs.data);
    }
    return;
  };

  // get list room empty that change room
  const listRoom = async (item) => {
    const empty = {
      start: item.showDateTime,
      duration: item.duration,
      idST: item.idST,
      idBra: localStorage.getItem("branch"),
    };
    const rs = await listRoomEmpty(empty);
    if (!rs.status) {
      return;
    } else {
      console.log(rs);
      setRoom(rs.data);
      setChange(true);
    }
    return;
  };

  const listTicket = async () => {
    const data = {
      keyword: "",
    };
    const rs = await getListTicket(data);
    if (rs.status) {
      setTicket(rs.data);
    }
    return;
  };

  const getListDate = async (e) => {
    e.preventDefault();

    data.key = 1;
    if (data.start == "") {
      toast.error("Chưa chọn <Từ ngày>!");
      return;
    }
    if (data.end == "") {
      toast.error("Chưa chọn <Đến ngày>!");
      return;
    }
    if (data.start > data.end) {
      toast.error("Chọn ngày không hợp lệ!");
      return;
    }
    const rs = await listST(data);
    if (!rs.status) {
      return;
    } else {
      setList(rs.data);
    }
    return;
  };

  const handleDataChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // check status show time , see that just change room or update information or not allow change thing
  const checkStatus = async (item) => {
    const check = {
      idST: item.idST,
      duration: item.duration,
    };
    const rs = await checkST(check);
    if (rs.status) {
      //showing, just change room
      if (rs.data == 0) {
        listRoom(item);
        setItem(item);
      } else {
        if (rs.data == 1) {
          insert();
          setUpdate(true);
          setItem(item);
        } else {
          if (rs.data == -1) {
            toast.error("Đã chiếu không được chỉnh sửa!");
            return;
          } else {
            toast.error("Đã hủy không được chỉnh sửa!");
            return;
          }
        }
      }
    }
    return;
  };

  const cancel = async (data) => {
    const rs = await cancelST(data);
    if (rs.status) {
      console.log(item.idMovie);
      setTimeout(() => window.location.reload(), 1500);
    }
    return;
  };

  const submit = (data) => {
    confirmAlert({
      title: "XÁC NHẬN",
      message: "Bạn có chắc muốn hủy?",
      buttons: [
        {
          label: "Có",
          onClick: () => cancel(data),
        },
        {
          label: "Không",
          onClick: () => {},
        },
      ],
    });
  };

  const cancelStatus = async (item) => {
    const check = {
      idST: item.idST,
      duration: item.duration,
    };
    const rs = await checkST(check);
    if (rs.status) {
      if (rs.data == 0) {
        toast.error("Phim đang chiếu không được hủy chỉ đổi phòng!");
        return;
      } else {
        if (rs.data == 1) {
          const data = {
            idST: item.idST,
            idRoom: item.idRoom,
          };
          submit(data);
        } else {
          if (rs.data == -1) {
            toast.error("Đã chiếu không được hủy!");
            return;
          } else {
            toast.error("Đã hủy!");
            return;
          }
        }
      }
    }
    return;
  };

  const insert = () => {
    listMovie();
    listTicket();
  };
  useEffect(() => {
    getList();
    if (localStorage.role === "PS00000002") getListBranch();
  }, []);

  const handlClose = (bool) => {
    setShow(bool);
  };

  const handlCloseRM = (bool) => {
    setChange(bool);
  };

  const handlCloseUD = (bool) => {
    setUpdate(bool);
  };

  return (
    <Layout
      title="Danh sách lịch chiếu"
      pos={
        localStorage.role === "PS00000002"
          ? "Quản lý"
          : localStorage.role === "PS00000004"
          ? "Giám sát"
          : "Nhân viên"
      }
    >
      <div className="frame">
        <div className="frame-inside" style={{ display: "block" }}>
          <div className="header-list">
            <Input
              placeholder="Tìm kiếm..."
              className="search"
              onChange={(e) => getListSearch(e)}
            />
            <div className="filter" style={{ marginLeft: "50px" }}>
              <span>Từ ngày:</span>
              <input
                type="date"
                name="start"
                className="date-filter"
                onChange={handleDataChange}
              />
              <span style={{ marginLeft: "20px" }}>Đến ngày:</span>
              <input
                type="date"
                name="end"
                className="date-filter"
                onChange={handleDataChange}
              />
              {localStorage.role === "PS00000002" ? (
                <>
                  <span style={{ marginLeft: "20px" }}>Chi nhánh:</span>
                  <select
                    style={{ fontSize: "20px" }}
                    className="font-text frame-chevron"
                    value={data.idBra === "" ? "" : data.idBra}
                    onChange={(e) => {
                      setData({ ...data, idBra: e.target.value });
                    }}
                  >
                    <option value="">Tất cả</option>
                    {listBra.map((item, index) => (
                      <option value={item.idBra}>{item.nameBra}</option>
                    ))}
                  </select>
                </>
              ) : (
                ""
              )}

              <button
                className="btn-filter"
                onClick={(e) => getListDate(e)}
                style={{ marginRight: "3%" }}
              >
                Lọc
              </button>
            </div>
            {localStorage.getItem("role") == "PS00000004" ? (
              <button className="btn-plus" style={{ marginLeft: "200px" }}>
                <FontAwesomeIcon
                  icon={faSquarePlus}
                  className="icon-plus"
                  onClick={() => {
                    insert();
                    setShow(true);
                  }}
                />
              </button>
            ) : (
              ""
            )}
          </div>
          <div className="frame-list">
            <table>
              <tr>
                <th>STT</th>
                <th>Mã suất chiếu</th>
                <th>Hình ảnh</th>
                <th>Tên phim</th>
                <th>Ngày chiếu</th>
                <th>Giờ chiếu</th>
                <th>Phòng chiếu</th>
                <th>Trạng thái</th>
                {localStorage.getItem("role") == "PS00000004" ? (
                  <th>Hành động</th>
                ) : (
                  ""
                )}
              </tr>
              {list?.map((item, index) => (
                <tr
                  key={item.idST}
                  style={{
                    color:
                      item.statusRoom == 0 && item.idStatus == 1 ? "#fff" : "",
                    backgroundColor:
                      item.statusRoom == 0 && item.idStatus == 1
                        ? "#e71717"
                        : "",
                  }}
                >
                  <td>{index + 1}</td>
                  <td>{item.idST}</td>
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
                  <td>{String(item.showDateTime).split("T")[0]}</td>
                  <td>
                    {String(item.showDateTime).split("T")[1].substring(0, 5)}
                  </td>
                  <td>{item.nameRoom}</td>
                  <td
                    style={{
                      color: item.idStatus == 0 ? "#e71717" : "",
                    }}
                  >
                    {item.idStatus == 0
                      ? "Đã hủy"
                      : item.idStatus == 1
                      ? "Đang chiếu"
                      : item.idStatus == 2
                      ? "Sắp chiếu"
                      : "Đã chiếu"}
                  </td>
                  {localStorage.getItem("role") == "PS00000004" ? (
                    <td>
                      <FontAwesomeIcon
                        icon={faSquarePen}
                        className="icon-action"
                        onClick={() => checkStatus(item)}
                        style={{
                          color:
                            item.statusRoom == 0 && item.idStatus == 1
                              ? "#fff"
                              : "",
                        }}
                      />
                      <FontAwesomeIcon
                        icon={faTrashAlt}
                        className="icon-action"
                        onClick={() => cancelStatus(item)}
                        style={{
                          color:
                            item.statusRoom == 0 && item.idStatus == 1
                              ? "#fff"
                              : "",
                        }}
                      />
                    </td>
                  ) : (
                    ""
                  )}
                </tr>
              ))}
            </table>
          </div>
        </div>
      </div>
      <InsertST
        show={show}
        sendData={handlClose}
        movie={movie}
        ticket={ticket}
      />
      <ChangeRM show={change} sendData={handlCloseRM} room={room} item={item} />
      <UpdateST
        show={update}
        sendData={handlCloseUD}
        item={item}
        movie={movie}
        ticket={ticket}
      />
    </Layout>
  );
};

export default Showtime;
