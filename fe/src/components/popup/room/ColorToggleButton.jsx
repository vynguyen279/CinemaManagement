import React, { useState } from "react";
import "../style.css";
import { updateMap, listRedSeat } from "../../../utils/services";

const ColorToggleButton = ({ defaultColor, alternateColor, item, data, setRed }) => {
  const [currentColor, setCurrentColor] = useState(defaultColor);
  const [status, setStatus] = useState(item.idStatus);

  const toggleColor = () => {
    setCurrentColor((prevColor) =>
      prevColor === defaultColor ? alternateColor : defaultColor
    );
    setStatus((pre)=>Number(!pre))
    update();
    // getFac()
  };

  const update = async () => {
    const data = {
      idSeat: item.idSeat,
      idRow: item.idRow,
      idStatus: Number(!status),
    };
    const rs = await updateMap(item.idRoom, data);
    if (!rs.data[0]==1) {
      return;
    } else {
      // console.log(rs.data[0])
      //setTimeout(() => window.location.reload(), 1500);
      //window.location.reload();
      //close(true);
      getFac()
    }
  };

  const getFac = async () => {
    const rs = await listRedSeat(data);
    if (!rs.status) {
      return;
    } else {
      // console.log(rs.data);
      // if(rs.data.length>0)
      setRed(rs.data)
    // else 
    // setRed([])
    }
  };

  useState(()=>{
    // console.log()
    getFac()
  }, [item.idStatus])


  return (
    <button
      style={{ backgroundColor: currentColor }}
      onClick={toggleColor}
      className="btn-id"
    >
      {item.idSeat}
    </button>
  );
};

export default ColorToggleButton;
