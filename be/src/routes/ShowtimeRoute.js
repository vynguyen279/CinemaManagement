const express = require("express");
const router = express.Router();
const STController = require("../controllers/ShowtimeController");
const {
  staffCheck,
  managerCheck,
  authenticateToken,
} = require("../utils/authentication");

router.post("/list", authenticateToken, staffCheck, STController.getList);
// router.post("/list-date", STController.getListDate);
router.post("/insert", authenticateToken, managerCheck, STController.insert);
router.post(
  "/update-status",
  // authenticateToken,
  // managerCheck,
  STController.updateStatus
);
router.post(
  "/update-inf",
  authenticateToken,
  managerCheck,
  STController.updateInf
);
router.post("/cancel", authenticateToken, managerCheck, STController.cancel);
router.post("/chart", authenticateToken, managerCheck, STController.chart);
module.exports = router;
