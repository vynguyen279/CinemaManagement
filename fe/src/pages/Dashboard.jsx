import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import checkRole from "../utils/checkRole";
import Layout from "../components";
import {
  chartST,
  chartRoom,
  listBranch,
  listRoom,
  listFac,
} from "../utils/services";
import "../styles/share.css";
import "../components/popup/style.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [bool, setBool] = useState(true);
  const [bra, setBra] = useState("");
  const [room, setRoom] = useState("");
  const [fac, setFac] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [listBranchData, setListBranch] = useState([]);
  const [listRoomData, setListRoomData] = useState([]);
  const [listFacilities, setListFacilities] = useState([]);
  const [cancel, setCancel] = useState([]);
  const [totalCancel, setTotalCancel] = useState(0);
  const [showed, setShowed] = useState([]);
  const [totalShowed, setTotalShowed] = useState(0);

  function getDaysInMonth(month, year) {
    const firstDayOfMonth = new Date(year, month - 1, 1);
    const lastDayOfMonth = new Date(year, month, 0);

    const daysInMonth = [];

    for (
      let day = firstDayOfMonth.getDate();
      day <= lastDayOfMonth.getDate();
      day++
    ) {
      daysInMonth.push(day);
    }

    return daysInMonth;
  }

  // Showtime
  const options = {
    maintainAspectRatio: false, // Tắt tỷ lệ giữa chiều rộng và chiều cao
    // aspectRatio: 2, // Tỉ lệ chiều rộng và chiều cao (vd: 2:1)
    responsive: true,
    plugins: {
      legend: {
        labels: {
          font: {
            size: 20, // Kích thước chữ trong chú thích
            weight: "bold",
            family: "IBM Plex Serif", // Độ đậm chữ trong chú thích
          },
          color: "#000", // Màu sắc chữ trong chú thích
        },
        position: "top",
      },
      title: {
        display: true,
        text: bool == true ? "BIỂU ĐỒ LỊCH CHIẾU" : "BIỂU ĐỒ PHÒNG CHIẾU",
        font: {
          size: 30, // Kích thước chữ trong chú thích
          weight: "bold",
          family: "IBM Plex Serif", // Độ đậm chữ trong chú thích
        },
        color: "#000",
      },
    },
  };

  const data = {
    labels: getDaysInMonth(month, year),
    datasets: [
      {
        label: bool == true ? "Đã hủy: " + totalCancel : "Hỏng: " + totalCancel,
        data: cancel.map((item) => item.CanceledSchedulesCount),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        tension: 0.4,
      },
      {
        label:
          bool == true
            ? "Đã chiếu: " + totalShowed
            : "Bình thường: " + totalShowed,
        data: showed.map((item) => item.CanceledSchedulesCount),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        tension: 0.4,
      },
    ],
  };

  //Room
  // const dataRoom = {
  //   labels: getDaysInMonth(month, year),
  //   datasets: [
  //     {
  //       label: "Đã hủy",
  //       data: cancel.map((item) => item.CanceledSchedulesCount),
  //       borderColor: "rgb(255, 99, 132)",
  //       backgroundColor: "rgba(255, 99, 132, 0.5)",
  //       tension: 0.4,
  //     },
  //     {
  //       label: "Đã chiếu",
  //       data: showed.map((item) => item.CanceledSchedulesCount),
  //       borderColor: "rgb(53, 162, 235)",
  //       backgroundColor: "rgba(53, 162, 235, 0.5)",
  //       tension: 0.4,
  //     },
  //   ],
  // };

  // Get list Facilities
  const getFac = async (id) => {
    const rs = await listFac(id);
    if (!rs.status) {
      return;
    } else {
      setListFacilities(rs.data);
      console.log(rs.data);
      if (rs.data.length > 0) {
        setFac(rs.data[0].idFac);
        chartRM(year, month, rs.data[0].idFac);
      } else {
        setFac("");
        setShowed([]);
        setCancel([]);
        setTotalCancel(0);
        setTotalShowed(0);
      }
    }
  };

  // Get list room
  const getListRoom = async () => {
    const data = {
      keyword: "",
      idBranch:
        localStorage.role == "PS00000002"
          ? listBranchData[0].idBra
          : localStorage.getItem("branch"),
    };
    const rs = await listRoom(data);
    if (!rs.status) {
      return;
    } else {
      setListRoomData(rs.data);
      if (rs.data.length > 0) {
        setRoom(rs.data[0].idRoom);
        getFac(rs.data[0].idRoom);
      } else {
        setRoom("");
        setShowed([]);
        setCancel([]);
        setTotalCancel(0);
        setTotalShowed(0);
      }
    }
  };

  const handleNavi = () => {
    if (bool) {
      getListRoom();
      //chartRM(year, month);
    } else {
      chart(year, month);
    }
    setBool(!bool);
  };

  const handleChange = (date) => {
    setSelectedDate(date);
    setMonth(date.getMonth() + 1);
    setYear(date.getFullYear());
    if (bool) {
      chart(date.getFullYear(), date.getMonth() + 1);
    } else {
      chartRM(date.getFullYear(), date.getMonth() + 1, fac);
    }
  };

  //ShowTime
  const chart = async (year, month) => {
    const data = {
      Year: year,
      Month: month,
      Key: 0,
      Bra:
        localStorage.role == "PS00000002"
          ? bra
          : localStorage.getItem("branch"),
    };

    const rs = await chartST(data);
    if (rs.status) {
      console.log(rs);
      setCancel(rs.data);
      let count = 0;
      for (let i = 0; i < rs.data.length; i++) {
        count += rs.data[i].CanceledSchedulesCount;
      }
      setTotalCancel(count);
    }
    const params = {
      Year: year,
      Month: month,
      Key: 1,
      Bra:
        localStorage.role == "PS00000002"
          ? bra
          : localStorage.getItem("branch"),
    };

    const row = await chartST(params);
    if (row.status) {
      setShowed(row.data);
      let count = 0;
      for (let i = 0; i < row.data.length; i++) {
        count += row.data[i].CanceledSchedulesCount;
      }
      setTotalShowed(count);
    }
    return;
  };

  //Room
  const chartRM = async (year, month, e) => {
    const data = {
      Year: year,
      Month: month,
      Key: 0,
      Fac: e,
    };

    const rs = await chartRoom(data);
    if (rs.status) {
      console.log(rs);
      setCancel(rs.data);
      let count = 0;
      for (let i = 0; i < rs.data.length; i++) {
        count += rs.data[i].CanceledSchedulesCount;
      }
      setTotalCancel(count);
    }
    const params = {
      Year: year,
      Month: month,
      Key: 1,
      Fac: e,
    };

    const row = await chartRoom(params);
    if (row.status) {
      setShowed(row.data);
      let count = 0;
      for (let i = 0; i < row.data.length; i++) {
        count += row.data[i].CanceledSchedulesCount;
      }
      setTotalShowed(count);
    }
    return;
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

  const handleBranch = async (e) => {
    setBra(e.target.value);
    if (bool) {
      const data = {
        Year: year,
        Month: month,
        Key: 0,
        Bra: e.target.value,
      };

      const rs = await chartST(data);
      if (rs.status) {
        setCancel(rs.data);
      }
      const params = {
        Year: year,
        Month: month,
        Key: 1,
        Bra: e.target.value,
      };

      const row = await chartST(params);
      if (row.status) {
        setShowed(row.data);
      }
    } else {
      const data = {
        keyword: "",
        idBranch: e.target.value,
      };
      const rs = await listRoom(data);
      if (!rs.status) {
        return;
      } else {
        setListRoomData(rs.data);
        if (rs.data.length > 0) {
          setRoom(rs.data[0].idRoom);
          getFac(rs.data[0].idRoom);
        } else {
          setListFacilities([]);
          setFac("");
          setShowed([]);
          setCancel([]);
        }
      }
    }
    return;
  };
  useEffect(() => {
    checkRole();
    if (localStorage.role == "PS00000002") {
      getListBranch();
    }
    setBool(true);
    chart(new Date().getFullYear(), new Date().getMonth() + 1);
  }, []);
  return (
    <Layout
      title="Biểu đồ"
      pos={localStorage.role === "PS00000002" ? "Quản lý" : "Giám sát"}
    >
      <div className="frame">
        <div className="frame-inside" style={{ display: "block" }}>
          <div className="header-chart">
            <span style={{ marginRight: "10px" }}>Lọc theo tháng:</span>
            <DatePicker
              dateFormat="MM/yyyy"
              showMonthYearPicker
              selected={selectedDate}
              onChange={handleChange}
              className="month-filter"
            />{" "}
            <span style={{ marginRight: "10px", marginLeft: "20px" }}>
              Biểu đồ:
            </span>
            {/* <button className="date-filter" onClick={() => handleNavi()}>
              {bool == true ? "Phòng chiếu" : "Lịch chiếu"}
            </button> */}
            <select
              className="font-text frame-chevron"
              value={bool}
              onChange={() => handleNavi()}
              style={{ width: "12%" }}
            >
              <option value={true}>Lịch chiếu</option>
              <option value={false}>Phòng chiếu</option>
            </select>
            {bool == true && localStorage.role === "PS00000002" ? (
              <>
                <span style={{ marginRight: "10px", marginLeft: "20px" }}>
                  Chi nhánh:
                </span>
                <select
                  className="font-text frame-chevron"
                  onChange={(e) => handleBranch(e)}
                  value={bra}
                  style={{ width: "12%" }}
                >
                  <option value={""}>Tất cả</option>
                  {listBranchData?.map((item, index) => (
                    <option value={item.idBra} key={index}>
                      {item.nameBra}
                    </option>
                  ))}
                </select>
              </>
            ) : localStorage.role === "PS00000002" ? (
              <>
                <span style={{ marginRight: "10px", marginLeft: "20px" }}>
                  Chi nhánh:
                </span>
                <select
                  className="font-text frame-chevron"
                  onChange={(e) => handleBranch(e)}
                  style={{ width: "12%" }}
                >
                  {listBranchData?.map((item, index) => (
                    <option value={item.idBra} key={index}>
                      {item.nameBra}
                    </option>
                  ))}
                </select>
                <span style={{ marginRight: "10px", marginLeft: "20px" }}>
                  Phòng:
                </span>
                <select
                  value={room}
                  className="font-text frame-chevron"
                  onChange={(e) => {
                    getFac(e.target.value);
                    setRoom(e.target.value);
                  }}
                  style={{ width: "12%" }}
                >
                  {listRoomData?.map((item, index) => (
                    <option value={item.idRoom} key={index}>
                      {item.nameRoom}
                    </option>
                  ))}
                </select>
                <span style={{ marginRight: "10px", marginLeft: "20px" }}>
                  CSVC:
                </span>
                <select
                  className="font-text frame-chevron"
                  onChange={(e) => {
                    setFac(e.target.value);
                    chartRM(year, month, e.target.value);
                  }}
                  style={{ width: "12%" }}
                  value={fac}
                >
                  {listFacilities?.map((item, index) => (
                    <option value={item.idFac} key={index}>
                      {item.nameFac}
                    </option>
                  ))}
                </select>
              </>
            ) : bool == false ? (
              <>
                <span style={{ marginRight: "10px", marginLeft: "20px" }}>
                  Phòng:
                </span>
                <select
                  value={room}
                  className="font-text frame-chevron"
                  onChange={(e) => {
                    getFac(e.target.value);
                    setRoom(e.target.value);
                  }}
                  style={{ width: "12%" }}
                >
                  {listRoomData?.map((item, index) => (
                    <option value={item.idRoom} key={index}>
                      {item.nameRoom}
                    </option>
                  ))}
                </select>
                <span style={{ marginRight: "10px", marginLeft: "20px" }}>
                  CSVC:
                </span>
                <select
                  className="font-text frame-chevron"
                  onChange={(e) => {
                    setFac(e.target.value);
                    chartRM(year, month, e.target.value);
                  }}
                  style={{ width: "12%" }}
                  value={fac}
                >
                  {listFacilities?.map((item, index) => (
                    <option value={item.idFac} key={index}>
                      {item.nameFac}
                    </option>
                  ))}
                </select>
              </>
            ) : (
              ""
            )}
          </div>
          <div className="frame-chart">
            <div style={{ height: "600px", width: "1200px" }}>
              <Line options={options} data={data} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
