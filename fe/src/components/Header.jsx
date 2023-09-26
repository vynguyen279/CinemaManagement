import React, { useRef, useEffect, useState } from "react";
import "./styles/header.css";

const Header = (props) => {
  return (
    <header className="header">
      <div className="position">{props.pos}</div>
      <div className="title-header">{props.title}</div>
    </header>
  );
};

export default Header;
