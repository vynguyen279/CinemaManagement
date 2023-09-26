const express = require("express");
const router = express.Router();
const ticketController = require("../controllers/TicketController");
const { managerCheck, authenticateToken } = require("../utils/authentication");

router.post("/list", authenticateToken, managerCheck, ticketController.getList);
router.put("/update", authenticateToken, managerCheck, ticketController.update);
router.post(
  "/insert",
  authenticateToken,
  managerCheck,
  ticketController.insert
);
router.post(
  "/delete",
  authenticateToken,
  managerCheck,
  ticketController.delete
);

module.exports = router;
