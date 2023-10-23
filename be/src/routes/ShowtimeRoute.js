const express = require("express");
const router = express.Router();
const STController = require("../controllers/ShowtimeController");
const {
  staffCheck,
  managerCheck,
  supervisorCheck,
  supervisorManaCheck,
  authenticateToken,
} = require("../utils/authentication");

router.post("/list", authenticateToken, staffCheck, STController.getList);
// router.post("/list-date", STController.getListDate);
router.post("/insert", authenticateToken, supervisorCheck, STController.insert);
router.post(
  "/update-status",
  authenticateToken,
  staffCheck,
  STController.updateStatus
);
router.post(
  "/update-inf",
  authenticateToken,
  supervisorCheck,
  STController.updateInf
);
router.post("/cancel", authenticateToken, supervisorCheck, STController.cancel);
router.post(
  "/chart",
  authenticateToken,
  supervisorManaCheck,
  STController.chart
);
module.exports = router;
