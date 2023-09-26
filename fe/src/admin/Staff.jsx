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
import { updateStatus, updateStaPos, sendEmail } from "../utils/services";

const Staff = () => {
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
    };
    const rs = await list(data);
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
    const rs = await list(data);
    if (!rs.status) {
      return;
    } else {
      setValue(rs.data);
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

    if ((data.idStatus == 1) & (data.idStatus != item.idStatus)) {
      const params = {
        email: item.email,
        mess: "",
      };
      const rs = await sendEmail(params);
      console.log("This is params: " + params);
    }

    if (data.idPos != item.idPos || data.idStatus != item.idStatus) {
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
  }, []);

  return (
    <Layout title="Danh sách nhân viên" pos="Admin">
      <div className="frame">
        <div className="frame-inside" style={{ display: "block" }}>
          <div className="header-list">
            <Input
              placeholder="Tìm kiếm..."
              className="search"
              onChange={(e) => getListSearch(e)}
            />
          </div>
          <div className="frame-list">
            <table>
              <tr>
                <th>STT</th>
                <th>Mã nhân viên</th>
                <th>Họ tên</th>
                <th>Số điện thoại</th>
                <th>Email</th>
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
      />
    </Layout>
  );
};

export default Staff;
