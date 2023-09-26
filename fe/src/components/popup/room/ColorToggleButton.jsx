import React, { useState } from "react";
import "../style.css";
import { updateMap } from "../../../utils/services";

const ColorToggleButton = ({ defaultColor, alternateColor, item }) => {
  const [currentColor, setCurrentColor] = useState(defaultColor);

  const toggleColor = () => {
    setCurrentColor((prevColor) =>
      prevColor === defaultColor ? alternateColor : defaultColor
    );
    update();
  };

  const update = async () => {
    const data = {
      idSeat: item.idSeat,
      idRow: item.idRow,
      idStatus: Number(!item.idStatus),
    };
    const rs = await updateMap(item.idRoom, data);
    if (!rs.status) {
      return;
    }
  };
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
