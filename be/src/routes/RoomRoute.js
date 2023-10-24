const express = require("express");
const router = express.Router();
const RoomController = require("../controllers/RoomController");
const SeatController = require("../controllers/SeatController");
const {
  managerCheck,
  authenticateToken,
  supervisorManaCheck,
  supervisorCheck,
  staffCheck,
} = require("../utils/authentication");

router.post("/list", authenticateToken, staffCheck, RoomController.getList);
router.post(
  "/list-empty",
  authenticateToken,
  supervisorCheck,
  RoomController.getListEmpty
);
// router.get(
//   "/list-active",
//   authenticateToken,
//   staffCheck,
//   RoomController.listActive
// );
router.post("/insert", authenticateToken, managerCheck, RoomController.insert);
router.put("/update", authenticateToken, staffCheck, RoomController.update);
router.post("/delete", authenticateToken, managerCheck, RoomController.delete);
router.post(
  "/:id/history",
  authenticateToken,
  staffCheck,
  RoomController.getHis
);
router.post(
  "/:id/history-date",
  authenticateToken,
  staffCheck,
  RoomController.getHisDate
);
router.get("/:id/seat", authenticateToken, staffCheck, SeatController.getList);
router.get("/:id/redSeat", authenticateToken, staffCheck, SeatController.getListRedSeat);
router.post(
  "/:id/update-seat",
  authenticateToken,
  staffCheck,
  SeatController.update
);
router.post(
  "/chart",
  authenticateToken,
  supervisorManaCheck,
  RoomController.chart
);

module.exports = router;
