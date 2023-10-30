import React, { useRef, useEffect, useState } from "react";
import { Input } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquarePen,
  faTrashAlt,
  faSquarePlus,
  faDesktop,
  faCouch,
  faRectangleList,
} from "@fortawesome/free-solid-svg-icons";

import checkRole from "../utils/checkRole";
import Layout from "../components";
import "../styles/share.css";
import {
  listRoom,
  updateRoom,
  listBranch,
  deleteRoom,
  listFacStatus,
  listHis,
  listMap,
} from "../utils/services";
import InsertRoom from "../components/popup/room/InsertRoom";
import UpdateRoom from "../components/popup/room/UpdateRoom";
import FacRoom from "../components/popup/room/FacRoom";
import HisRoom from "../components/popup/room/HisRoom";
import MapSeat from "../components/popup/room/MapSeat";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { toast } from "react-toastify";

const Room = () => {
  const [value, setValue] = useState();
  const [listBranchData, setListBranch] = useState();
  const [show, setShow] = useState(false);
  const [showUD, setShowUD] = useState(false);
  const [showFac, setShowFac] = useState(false);
  const [showHis, setShowHis] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [item, setItem] = useState({});
  const [item2, setItem2] = useState({});
  const [fac, setFac] = useState([]);
  const [his, setHis] = useState([]);
  const [map, setMap] = useState([]);
  const [id, setID] = useState("");
  const [branch, setBranch] = useState("");
  const [search, setSearch] = useState("");

  const submit = (e, item) => {
    //delete
    confirmAlert({
      title: "XÁC NHẬN",
      message: "Bạn có chắc muốn xóa?",
      buttons: [
        {
          label: "Có",
          onClick: () => deleteRM(e, item),
        },
        {
          label: "Không",
          onClick: () => {},
        },
      ],
    });
  };

  const deleteRM = async (e, item) => {
    e.preventDefault();
    const params = { idRoom: item.idRoom };
    const rs = await deleteRoom(params);
    if (rs.status) {
      // console.log(item.idTic);
      setTimeout(() => window.location.reload(), 1500);
    }
    return;
  };

  //list history
  const getHis = async (id) => {
    const rs = await listHis(id);
    if (!rs.status) {
      return;
    } else {
      setHis(rs.data);
      setShowHis(!showHis);
    }
    return;
  };

  //list
  const getList = async () => {
    checkRole();
    const data = { keyword: search, idBranch: branch };
    // console.log(data)
    const rs = await listRoom(data);
    if (!rs.status) {
      return;
    } else {
      setValue(rs.data);
    }
  };

  const getListBranch = async () => {
    checkRole();
    const data = { keyword: "" };
    const rs = await listBranch(data);
    if (!rs.status) {
      return;
    } else {
      setListBranch(rs.data);
    }
  };

  //list search
  // const getListSearch = async (e) => {
  //   const data = { keyword: e.target.value };
  //   const rs = await listRoom(data);
  //   if (!rs.status) {
  //     return;
  //   } else {
  //     setValue(rs.data);
  //   }
  // };

  //Map Seat
  const getListMap = async (id) => {
    const rs = await listMap(id);
    if (!rs.status) {
      return;
    } else {
      setMap(rs.data);
      setShowMap(!showMap);
      setID(id);
    }
  };

  //update

  //list fac
  const getFac = async (id) => {
    const rs = await listFacStatus(id);
    if (!rs.status) {
      return;
    } else {
      setFac(rs.data);
      setShowFac(!showFac);
      setID(id);
    }
  };

  //Close Popup
  const handlClose = (bool) => {
    setShow(bool);
  };

  const handlCloseUD = (bool) => {
    setShowUD(bool);
  };

  const handlCloseFac = (bool) => {
    setShowFac(bool);
  };

  const handlCloseMap = (bool) => {
    setShowMap(bool);
  };

  const handlCloseHis = (bool) => {
    setShowHis(bool);
  };

  useEffect(() => {
    getListBranch();
  }, []);
  useEffect(() => {
    getList();
  }, [branch, search]);

  return (
    <Layout
      title="Danh sách phòng chiếu"
      pos={
        localStorage.role === "PS00000002"
          ? "Quản lý"
          : localStorage.role === "PS00000003"
          ? "Nhân viên"
          : "Giám sát"
      }
    >
      <div className="frame">
        <div className="frame-inside" style={{ display: "block" }}>
          <div className="header-list">
            <Input
              placeholder="Tìm kiếm..."
              className="search"
              onChange={(e) => setSearch(e.target.value)}
            />
            {/* <select name="" id="" style={{ padding: "8px", width: "25%", marginLeft: "15px" }} onChange={(e)=>}>
            <option value="">Tất cả</option>
            {listBranchData?.map((item, index) => (
              <option value={item.idBra} key={index}>{item.nameBra}</option>
            ))}
            </select> */}
            {localStorage.getItem("role") == "PS00000002" ? (
              <div
                className="filter"
                style={{ marginLeft: "50px", width: "100%" }}
              >
                <span style={{ marginLeft: "20px", marginRight: "20px" }}>
                  Chi nhánh:
                </span>
                <select
                  style={{ fontSize: "20px" }}
                  className="font-text frame-chevron"
                  onChange={(e) => {
                    setBranch(e.target.value);
                  }}
                >
                  <option value="">Tất cả</option>
                  {listBranchData?.map((item, index) => (
                    <option value={item.idBra} key={index}>
                      {item.nameBra}
                    </option>
                  ))}
                </select>
                {branch != "" ? (
                  <button className="btn-plus" style={{ marginLeft: "45%" }}>
                    <FontAwesomeIcon
                      icon={faSquarePlus}
                      className="icon-plus"
                      onClick={() => setShow(!show)}
                    />
                  </button>
                ) : null}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="frame-list">
            <table>
              <tr>
                <th>STT</th>
                <th>Mã phòng</th>
                <th>Hình ảnh</th>
                <th>Tên phòng</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
              {value?.map((item, index) => (
                <tr key={item.idRoom}>
                  <td>{index + 1}</td>
                  <td>{item.idRoom}</td>
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
                  <td>{item.nameRoom}</td>
                  <td>{item.idStatus == 1 ? "Hoạt động" : "Hỏng"}</td>
                  <td>
                    <FontAwesomeIcon
                      icon={faSquarePen}
                      className="icon-action"
                      onClick={() => {
                        setShowUD(!showUD);
                        setItem(item);
                      }}
                    />
                    {localStorage.getItem("role") == "PS00000002" ? (
                      <FontAwesomeIcon
                        icon={faTrashAlt}
                        className="icon-action"
                        onClick={(e) => submit(e, item)}
                      />
                    ) : (
                      ""
                    )}
                    <FontAwesomeIcon
                      icon={faDesktop}
                      className="icon-action"
                      onClick={() => getFac(item.idRoom)}
                    />
                    <FontAwesomeIcon
                      icon={faCouch}
                      className="icon-action"
                      onClick={() => {
                        getListMap(item.idRoom);
                        setItem2(item);
                      }}
                    />
                    <FontAwesomeIcon
                      icon={faRectangleList}
                      className="icon-action"
                      onClick={() => {
                        getHis(item.idRoom);
                        setID(item.idRoom);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </table>
          </div>
        </div>
      </div>
      {show ? (
        <InsertRoom show={show} sendData={handlClose} idBra={branch} />
      ) : null}
      {showUD ? (
        <UpdateRoom
          show={showUD}
          sendData={handlCloseUD}
          item={item}
          // update={update}
        />
      ) : null}
      <FacRoom show={showFac} sendData={handlCloseFac} list={fac} id={id} />
      <MapSeat
        show={showMap}
        sendData={handlCloseMap}
        map={map}
        id={id}
        item={item2}
      />
      <HisRoom show={showHis} sendData={handlCloseHis} his={his} id={id} />
    </Layout>
  );
};

export default Room;
