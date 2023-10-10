const StaffRoute = require("./StaffRoute");
const StaffPosRoute = require("./Staff_PosRoute");
const TicketRoute = require("./TicketRoute");
const MovieRoute = require("./MovieRoute");
const RoomRoute = require("./RoomRoute");
const FacRoute = require("./FacilitiesRoute");
const STRoute = require("./ShowtimeRoute");
const BranchRoute = require("./BranchRoute");
const PositionRoute = require("./PositionRoute");

function routes(app) {
  app.use("/branch", BranchRoute);
  app.use("/account", StaffRoute);
  app.use("/staff", StaffPosRoute);
  app.use("/ticket", TicketRoute);
  app.use("/movie", MovieRoute);
  app.use("/room", RoomRoute);
  app.use("/fac", FacRoute);
  app.use("/showtime", STRoute);
  app.use("/position", PositionRoute);
}

module.exports = routes;
