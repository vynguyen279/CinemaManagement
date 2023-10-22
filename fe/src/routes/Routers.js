import { Routes, Route, Navigate } from "react-router-dom";
import { AxiosLoading } from "../utils/axiosConfig";
import { ToastContainer } from "react-toastify";
import React from "react";
import Login from "../pages/Login";
import Getpass from "../pages/Getpass";
import Signup from "../pages/Signup";
import Continue from "../pages/Continue";
import Profile from "../pages/Profile";
import Changepass from "../pages/Changepass";
import Staff from "../admin/Staff";
import Film from "../manager/Film";
import Dashboard from "../pages/Dashboard";
import Ticket from "../manager/Ticket";
import Showtime from "../pages/Showtime";
import Room from "../pages/Room";
import Branch from "../manager/Branch";
import RoomMap from "../pages/RoomMap";

const Routers = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="login" />} />
        <Route path="login" element={<Login />} />
        <Route path="profile" element={<Profile />} />
        <Route path="admin/staff" element={<Staff />} />
        <Route path="manager/branch" element={<Branch />} />
        <Route path="manager/film" element={<Film />} />
        <Route path="manager/ticket" element={<Ticket />} />
        <Route path="manager/dashboard" element={<Dashboard />} />
        <Route path="manager/showtime" element={<Showtime />} />
        <Route path="manager/room" element={<Room />} />
        <Route path="supervisor/room" element={<RoomMap />} />
        <Route path="login" element={<Login />} />
        <Route path="getpass" element={<Getpass />} />
        <Route path="signup" element={<Signup />} />
        <Route path="continue" element={<Continue />} />
        <Route path="changePass" element={<Changepass />} />
      </Routes>
      <ToastContainer position="top-left" autoClose={2500} />
      <AxiosLoading />
    </>
  );
};

export default Routers;
