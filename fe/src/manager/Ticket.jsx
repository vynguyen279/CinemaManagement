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

import { getListTicket } from "../utils/services";
import checkRole from "../utils/checkRole";
import Layout from "../components";
import "../styles/share.css";
import formatMoney from "../components/format/formatMoney";
import UpdateTicket from "../components/popup/ticket/UpdateTicket";
import InsertTicket from "../components/popup/ticket/InsertTicket";
import { deleteTic } from "../utils/services";

const Ticket = () => {
  const [value, setValue] = useState([]);
  const [show, setShow] = useState(false);
  const [showInsert, setShowInsert] = useState(false);
  const [item, setItem] = useState({});
  //const [key, setKey] = useState('');

  const submit = (e, item) => {
    confirmAlert({
      title: "XÁC NHẬN",
      message: "Bạn có chắc muốn xóa?",
      buttons: [
        {
          label: "Có",
          onClick: () => deleteTicket(e, item),
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
    const rs = await getListTicket(data);
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
    const rs = await getListTicket(data);
    if (!rs.status) {
      return;
    } else {
      setValue(rs.data);
    }
  };

  const deleteTicket = async (e, item) => {
    e.preventDefault();
    const params = { idTic: item.idTic };
    const rs = await deleteTic(params);
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
    <Layout title="Danh sách loại vé" pos="Quản lý">
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
                <th>Mã loại vé</th>
                <th>Tên loại vé</th>
                <th>Giá vé</th>
                <th>Hành động</th>
              </tr>
              {value?.map((item, index) => (
                <tr key={item.idTic}>
                  <td>{index + 1}</td>
                  <td>{item.idTic}</td>
                  <td>{item.nameTic}</td>
                  <td>{formatMoney(item.price)}</td>
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
        <UpdateTicket show={show} sendData={handlClose} item={item} />
      ) : null}
      <InsertTicket show={showInsert} sendData={handlCloseInsert} />
    </Layout>
  );
};

export default Ticket;
