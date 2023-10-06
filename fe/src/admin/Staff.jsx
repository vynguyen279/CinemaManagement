import React, { useRef, useEffect, useState } from "react";
import { Input, Modal, ModalHeader } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquarePen,
  faRectangleList,
  faDiceOne,
} from "@fortawesome/free-solid-svg-icons";

import { list, getListHis } from "../utils/services";
import checkRole from "../utils/checkRole";
import Layout from "../components";
import "../styles/share.css";
import DetailStaff from "../components/popup/staff/DetailStaff";
import HisPos from "../components/popup/staff/HisPos";
import UpdateStaff from "../components/popup/staff/UpdateStaff";
import { updateStaPos, sendEmail, listBranch } from "../utils/services";

const Staff = () => {
  const [listBra, setListBra] = useState([]);
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
    };
    const rs = await list(data);
    if (!rs.status) {
      return;
    } else {
      setValue(rs.data);
    }
  };

  const getListSearch = async (key, bra) => {
    const data = {
      keyword: key,
      idBra: bra,
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
      data.idStatus = item.idStatus;
    }
    if (data.idPos === "") {
      data.idPos = item.idPos;
    }
    if (data.idBra === "") {
      data.idBra = item.idBra;
    }
    if ((data.idStatus == 1) & (data.idStatus != item.idStatus)) {
      const params = {
        email: item.email,
        mess: "",
      };
      const rs = await sendEmail(params);
      console.log("This is params: " + params);
    }

    if (
      data.idPos != item.idPos ||
      data.idStatus != item.idStatus ||
      data.idBra != item.idBra
    ) {
      const row = await updateStaPos(data);
      if (!row.status) {
      }
    }
    // if (data.idPos === item.idPos || data.idPos === "") {
    //   const rs = await updateStatus(data);
    //   if (!rs.status) {
    //   }
    // } else {
    //   const row = await updateStaPos(data);
    //   if (!row.status) {
    //   }
    // }
    setTimeout(() => window.location.reload(), 1500);
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
              <span style={{ width: "30%" }}>Chi nhánh:</span>
              {/* <input
                type="date"
                name="start"
                className="date-filter"
                onChange={handleDataChange}
              /> */}
              <select
                style={{ marginLeft: "2%", fontSize: "20px" }}
                className="font-text frame-chevron"
                value={bra == "" ? "" : bra}
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
                <th>Chi nhánh</th>
                <th>Cấp bậc</th>
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
                  <td>{item.nameBra}</td>
                  <td>{item.namePos}</td>
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
      <UpdateStaff
        show={showUD}
        sendData={handlCloseUpdate}
        item={item}
        update={update}
        bra={listBra}
      />
    </Layout>
  );
};

export default Staff;