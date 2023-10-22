import React, { useEffect, useState } from "react";
import { Input } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquarePen,
  faTrashAlt,
  faSquarePlus,
} from "@fortawesome/free-solid-svg-icons";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

import checkRole from "../utils/checkRole";
import Layout from "../components";
import "../styles/share.css";
import InsertBranch from "../components/popup/branch/InsertBranch";
import UpdateBranch from "../components/popup/branch/UpdateBranch";
import { listBranch, updateBranch, deleteBranch } from "../utils/services";

const Branch = () => {
  const [value, setValue] = useState([]);
  const [show, setShow] = useState(false);
  const [showInsert, setShowInsert] = useState(false);
  const [item, setItem] = useState({});

  const submit = (e, item) => {
    confirmAlert({
      title: "XÁC NHẬN",
      message: "Bạn có chắc muốn xóa?",
      buttons: [
        {
          label: "Có",
          onClick: () => deleteBra(e, item),
        },
        {
          label: "Không",
          onClick: () => {},
        },
      ],
    });
  };

  const getListSearch = async (e) => {
    const data = {
      keyword: e.target.value,
    };
    const rs = await listBranch(data);
    if (!rs.status) {
      return;
    } else {
      setValue(rs.data);
    }
  };

  const getList = async () => {
    checkRole();
    const data = {
      keyword: "",
    };
    const rs = await listBranch(data);
    if (!rs.status) {
      return;
    } else {
      setValue(rs.data);
    }
  };

  const deleteBra = async (e, item) => {
    e.preventDefault();
    const params = { idBra: item.idBra };
    const rs = await deleteBranch(params);
    if (rs.status) {
      console.log(item.idTic);
      setTimeout(() => window.location.reload(), 1500);
    }
    return;
  };

  useEffect(() => {
    getList();
  }, []);

  const handlClose = (bool) => {
    setShow(bool);
  };

  const handlCloseInsert = (bool) => {
    setShowInsert(bool);
  };
  return (
    <Layout title="Danh sách chi nhánh" pos="Quản lý">
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
                onClick={() => setShowInsert(true)}
              />
            </button>
          </div>
          <div className="frame-list">
            <table>
              <tr>
                <th>STT</th>
                <th>Mã chi nhánh</th>
                <th>Tên chi nhánh</th>
                <th>Hành động</th>
              </tr>
              {value?.map((item, index) => (
                <tr key={item.idTic}>
                  <td>{index + 1}</td>
                  <td>{item.idBra}</td>
                  <td>{item.nameBra}</td>
                  <td>
                    <FontAwesomeIcon
                      icon={faSquarePen}
                      className="icon-action"
                      onClick={() => {
                        setShow(!show);
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
      {show ? (
        <UpdateBranch show={show} item={item} sendData={handlClose} />
      ) : null}
      <InsertBranch show={showInsert} sendData={handlCloseInsert} />
    </Layout>
  );
};

export default Branch;
