import { axios } from "./axiosConfig";

//position
export async function listPosition() {
  return axios.get("/position/list");
}

//branch
export async function listBranch(data) {
  return axios.post("/branch/list", data);
}

export async function insertBranch(data) {
  return axios.post("/branch/insert", data);
}

export async function updateBranch(data) {
  return axios.post("/branch/update", data);
}

export async function deleteBranch(data) {
  return axios.post("/branch/delete", data);
}
///account
export async function check(data) {
  return axios.post("/account/check", data);
}
export async function list(data) {
  return axios.post("/account/list", data);
}
export async function login(data) {
  return axios.post("/account/login", data);
}
export async function signUp(data) {
  return axios.post("/account/signUp", data);
}
export async function resetPass(data) {
  return axios.post("/account/resetPass", data);
}

export async function sendEmail(data) {
  return axios.post("/account/sendEmail", data);
}

export async function selectInf(data) {
  return axios.post("account/information", data);
}

export async function updateStatus(data) {
  return axios.post("/account/updateStatus", data);
}

export async function updateStaPos(data) {
  return axios.post("/account/updateStaPos", data);
}

export async function updateInf(data) {
  return axios.post("/account/updateInf", data);
}

export async function updatePass(data) {
  return axios.post("account/updatePass", data);
}

//staff
export async function getListHis(data) {
  return axios.post("/staff/list", data);
}

//ticket
export async function getListTicket(data) {
  return axios.post("/ticket/list", data);
}

export async function updateTic(data) {
  return axios.put("/ticket/update", data);
}

export async function insertTic(data) {
  return axios.post("/ticket/insert", data);
}

export async function deleteTic(data) {
  return axios.post("/ticket/delete", data);
}

//Movie
export async function listMovie(data) {
  return axios.post("/movie/list", data);
}

export async function listMovieActive() {
  return axios.get("/movie/list-active");
}

export async function insertMovie(data) {
  return axios.post("/movie/insert", data);
}

export async function updateMov(data) {
  return axios.put("/movie/update", data);
}

export async function deleteMov(data) {
  return axios.post("/movie/delete", data);
}

//Room
export async function listRoom(data) {
  return axios.post("/room/list", data);
}

export async function listRoomEmpty(data) {
  return axios.post("/room/list-empty", data);
}
// export async function listRoomActive() {
//   return axios.get("/room/list-active");
// }

export async function insertRoom(data) {
  return axios.post("/room/insert", data);
}

export async function updateRoom(data) {
  return axios.put("/room/update", data);
}

export async function deleteRoom(data) {
  return axios.post("/room/delete", data);
}

export async function listHis(id) {
  return axios.post(`/room/${id}/history`);
}

export async function listHisDate(id, data) {
  return axios.post(`/room/${id}/history-date`, data);
}

export async function chartRoom(data) {
  return axios.post(`/room/chart`, data);
}
//Seat
export async function listMap(id) {
  return axios.get(`/room/${id}/seat`);
}
export async function listRedSeat(id) {
  return axios.get(`/room/${id}/redSeat`);
}

export async function updateMap(id, data) {
  return axios.post(`/room/${id}/update-seat`, data);
}
//Facilities
export async function listFac(id) {
  return axios.get(`/fac/${id}/list`);
}
export async function listFacStatus(id) {
  return axios.get(`/fac/${id}/listStatus`);
}

export async function insertFac(data) {
  return axios.post(`/fac/insert`, data);
}

export async function updateFac(id, data) {
  return axios.put(`/fac/${id}/update`, data);
}

export async function updateStatusFac(id, data) {
  return axios.put(`/fac/${id}/updateStatus`, data);
}

export async function deleteFac(id, data) {
  return axios.post(`/fac/${id}/delete`, data);
}

//showtime
export async function listST(data) {
  return axios.post("/showtime/list", data);
}

export async function insertST(data) {
  return axios.post(`/showtime/insert`, data);
}

export async function checkST(data) {
  return axios.post(`/showtime/update-status`, data);
}

export async function updateST(data) {
  return axios.post(`/showtime/update-inf`, data);
}

export async function cancelST(data) {
  return axios.post(`/showtime/cancel`, data);
}

export async function chartST(data) {
  return axios.post(`/showtime/chart`, data);
}
