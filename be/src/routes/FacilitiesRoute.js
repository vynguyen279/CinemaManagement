const express = require("express");
const router = express.Router();
const FacController = require("../controllers/FacilitiesController");
const {
  managerCheck,
  authenticateToken,
  staffCheck,
} = require("../utils/authentication");

router.get("/:id/list", authenticateToken, staffCheck, FacController.getList);
router.post(
  "/:id/insert",
  authenticateToken,
  managerCheck,
  FacController.insert
);
router.put("/:id/update", authenticateToken, staffCheck, FacController.update);
router.post(
  "/:id/delete",
  authenticateToken,
  managerCheck,
  FacController.delete
);

module.exports = router;
