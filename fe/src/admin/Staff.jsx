import React, { useRef, useEffect, useState } from "react";
import { Input, Modal, ModalHeader } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquarePen,
  faRectangleList,
  faDiceOne,
} from "@fortawesome/free-solid-svg-icons";

import checkRole from "../utils/checkRole";
import Layout from "../components";
import "../styles/share.css";
import DetailStaff from "../components/popup/staff/DetailStaff";
import HisPos from "../components/popup/staff/HisPos";
import UpdateStaff from "../components/popup/staff/UpdateStaff";
import {
  updateStaPos,
  sendEmail,
  listBranch,
  list,
  getListHis,
  listPosition,
} from "../utils/services";

const Staff = () => {
  const [listBra, setListBra] = useState([]);
  const [pos, setPos] = useState([]);
  const [bra, setBra] = useState("");
  const [key, setKey] = useState("");
  const [value, setValue] = useState([]);
  const [show, setShow] = useState(false);
  const [showHis, setShowHis] = useState(false);
  const [showUD, setShowUD] = useState(false);
  const [item, setItem] = useState("");
  const [his, setHis] = useState([]);

  const getList = async () => {
    checkRole();
    const data = {
      keyword: "",
      idBra: "",
      key: 0,
    };
    const rs = await list(data);
    if (!rs.status) {
      return;
    } else {
      setValue(rs.data);
    }
    const row = await listPosition();
    if (!row.status) {
      return;
    } else {
      setPos(row.data);
    }
  };

  const getListSearch = async (key, bra) => {
    const data = {
      keyword: key,
      idBra: bra,
      key: bra == "1" ? 1 : bra == "-1" ? -1 : 0,
    };
    const rs = await list(data);
    if (!rs.status) {
      return;
    } else {
      setValue(rs.data);
    }
  };

  const getListBranch = async (e) => {
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

  const getHis = async (id) => {
    const data = {
      idStaff: id,
    };
    const rs = await getListHis(data);
    if (!rs.status) {
      return;
    } else {
      setHis(rs.data);
    }
  };

  const update = async (e, data, item) => {
    e.preventDefault();
    data.idStaff = item.idStaff;
    if (data.idStatus === "") {
      if (item.idStatus === 2) {
        data.idStatus = 1;
      } else {
        data.idStatus = item.idStatus;
      }
    }
    if (data.idPos === "") {
      if (item.idPos == null) {
        data.idPos = "PS00000002";
      } else {
        data.idPos = item.idPos;
      }
    }
    if (data.idBra == "" && data.idPos != "PS00000002") {
      if (item.idBra == null) {
        data.idBra = listBra[0].idBra;
      } else {
        data.idBra = item.idBra;
      }
    }
    if ((data.idStatus == 1) & (data.idStatus != item.idStatus)) {
      const params = {
        email: item.email,
        mess: "",
      };
      const rs = await sendEmail(params);
    }
    if (
      data.idPos != item.idPos ||
      data.idStatus != item.idStatus ||
      data.idBra != item.idBra
    ) {
      const row = await updateStaPos(data);
      if (!row.status) {
        return;
      }
    }
    console.log(data);
    setTimeout(() => window.location.reload(), 1500);

    // if (data.idPos === item.idPos || data.idPos === "") {
    //   const rs = await updateStatus(data);
    //   if (!rs.status) {
    //   }
    // } else {
    //   const row = await updateStaPos(data);
    //   if (!row.status) {
    //   }
    // }
  };

  const handlClose = (bool) => {
    setShow(bool);
  };

  const handlCloseHis = (bool) => {
    setShowHis(bool);
  };

  const handlCloseUpdate = (bool) => {
    setShowUD(bool);
  };

  useEffect(() => {
    getList();
    getListBranch();
  }, []);

  return (
    <Layout title="Danh sách nhân viên" pos="Admin">
      <div className="frame">
        <div className="frame-inside" style={{ display: "block" }}>
          <div className="header-list">
            <Input
              placeholder="Tìm kiếm..."
              className="search"
              onChange={(e) => {
                setKey(e.target.value);
                getListSearch(e.target.value, bra);
              }}
            />
            <div className="filter" style={{ marginLeft: "10%" }}>
              <span style={{ width: "30%" }}>Lọc:</span>
              {/* <input
                type="date"
                name="start"
                className="date-filter"
                onChange={handleDataChange}
              /> */}
              <select
                style={{ marginLeft: "2%", fontSize: "20px" }}
                className="font-text frame-chevron"
                value={bra != 1 && bra != -1 ? "" : bra}
                onChange={(e) => {
                  setBra(e.target.value);
                  getListSearch(key, e.target.value);
                }}
              >
                <option value="1">Quản lý</option>
                <option value="">Chi nhánh</option>
                <option value="-1">Chưa cấp</option>
              </select>
              {bra != 1 && bra != -1 ? (
                <select
                  style={{ marginLeft: "2%", fontSize: "20px" }}
                  className="font-text frame-chevron"
                  value={bra == 0 ? "" : bra}
                  onChange={(e) => {
                    setBra(e.target.value);
                    getListSearch(key, e.target.value);
                  }}
                >
                  <option value="">Tất cả</option>
                  {listBra.map((item, index) => (
                    <option value={item.idBra}>{item.nameBra}</option>
                  ))}
                </select>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="frame-list">
            <table>
              <tr>
                <th>STT</th>
                <th>Mã nhân viên</th>
                <th>Họ tên</th>
                <th>Số điện thoại</th>
                <th>Email</th>
                {bra === "1" || bra === "-1" ? "" : <th>Chi nhánh</th>}
                {bra === "-1" ? "" : <th>Cấp bậc</th>}
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
              {value?.map((item, index) => (
                <tr key={item.idStaff}>
                  <td>{index + 1}</td>
                  <td>{item.idStaff}</td>
                  <td>{item.name}</td>
                  <td>{item.phone}</td>
                  <td>{item.email}</td>
                  {bra === "1" || bra === "-1" ? "" : <td>{item.nameBra}</td>}
                  {bra === "-1" ? "" : <td>{item.namePos}</td>}
                  <td>
                    {item.idStatus === 0
                      ? "Khóa"
                      : item.idStatus === 1
                      ? "Hoạt động"
                      : "Chưa cấp"}
                  </td>
                  <td>
                    <FontAwesomeIcon
                      icon={faDiceOne}
                      className="icon-action"
                      onClick={() => {
                        setShow(!show);
                        setItem(item);
                      }}
                    />
                    <FontAwesomeIcon
                      icon={faSquarePen}
                      className="icon-action"
                      onClick={() => {
                        setItem(item);
                        setShowUD(true);
                      }}
                    />
                    <FontAwesomeIcon
                      icon={faRectangleList}
                      className="icon-action"
                      onClick={() => {
                        getHis(item.idStaff);
                        setShowHis(true);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </table>
          </div>
        </div>
      </div>
      <DetailStaff show={show} sendData={handlClose} item={item} />
      <HisPos show={showHis} sendData={handlCloseHis} value={his} />
      {showUD ? (
        <UpdateStaff
          show={showUD}
          sendData={handlCloseUpdate}
          item={item}
          update={update}
          bra={listBra}
          pos={pos}
        />
      ) : null}
    </Layout>
  );
};

export default Staff;
