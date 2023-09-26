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
import { chartST, chartRoom } from "../utils/services";
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
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [cancel, setCancel] = useState([]);
  const [showed, setShowed] = useState([]);
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
        label: "Đã hủy",
        data: cancel.map((item) => item.CanceledSchedulesCount),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        tension: 0.4,
      },
      {
        label: bool == true ? "Đã chiếu" : "Đã đặt",
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

  const handleNavi = () => {
    if (bool) {
      chartRM(year, month);
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
      chartRM(date.getFullYear(), date.getMonth() + 1);
    }
  };

  const chart = async (year, month) => {
    const data = {
      Year: year,
      Month: month,
      Key: 0,
    };

    const rs = await chartST(data);
    if (rs.status) {
      setCancel(rs.data);
    }
    const params = {
      Year: year,
      Month: month,
      Key: 1,
    };

    const row = await chartST(params);
    if (row.status) {
      setShowed(row.data);
    }
    return;
  };

  const chartRM = async (year, month) => {
    const data = {
      Year: year,
      Month: month,
      Key: 0,
    };

    const rs = await chartRoom(data);
    if (rs.status) {
      setCancel(rs.data);
    }
    const params = {
      Year: year,
      Month: month,
      Key: 1,
    };

    const row = await chartRoom(params);
    if (row.status) {
      setShowed(row.data);
    }
    return;
  };

  useEffect(() => {
    checkRole();
    chart(new Date().getFullYear(), new Date().getMonth() + 1);
  }, []);
  return (
    <Layout title="Biểu đồ" pos="Quản lý">
      <div className="frame">
        <div className="frame-inside" style={{ display: "block" }}>
          <div className="header-chart">
            Lọc theo tháng :
            <DatePicker
              dateFormat="MM/yyyy"
              showMonthYearPicker
              selected={selectedDate}
              onChange={handleChange}
              className="month-filter"
            />{" "}
            Biểu đồ khác:
            <button className="date-filter" onClick={() => handleNavi()}>
              {bool == true ? "Phòng chiếu" : "Lịch chiếu"}
            </button>
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
