import signOut from "./signOut";
const adminPath = ["/profile", "/admin/staff", "/changePass", "/login"];
const managerPath = [
  "/profile",
  "/manager/dashboard",
  "/manager/branch",
  "/manager/film",
  "/manager/ticket",
  "/manager/room",
  "/manager/showtime",
  "/changePass",
  "/login",
];
const supervisorPath = [
  "/profile",
  "/manager/dashboard",
  "/supervisor/room",
  "/manager/showtime",
  "/changePass",
  "/login",
];
const staffPath = [
  "/profile",
  "/supervisor/room",
  "/manager/showtime",
  "/changePass",
  "/login",
];

function checkRole() {
  if (localStorage.role === "PS00000001") {
    if (!adminPath.includes(window.location.pathname)) {
      signOut();
    }
  } else {
    if (localStorage.role === "PS00000002") {
      if (!managerPath.includes(window.location.pathname)) {
        signOut();
      }
    } else {
      if (localStorage.role === "PS00000004") {
        if (!supervisorPath.includes(window.location.pathname)) {
          signOut();
        }
      } else {
        if (localStorage.role === "PS00000003") {
          if (!staffPath.includes(window.location.pathname)) {
            signOut();
          }
        } else {
          signOut();
        }
      }
    }
  }
}

export default checkRole;
