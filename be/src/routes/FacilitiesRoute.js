const express = require("express");
const router = express.Router();
const FacController = require("../controllers/FacilitiesController");
const {
  managerCheck,
  authenticateToken,
  staffCheck,
} = require("../utils/authentication");

router.get("/:id/list", authenticateToken, staffCheck, FacController.getList);
router.get("/:id/listStatus", authenticateToken, staffCheck, FacController.getListStatus);
router.post(
  "/insert",
  authenticateToken,
  managerCheck,
  FacController.insert
);
router.put("/:id/update", authenticateToken, staffCheck, FacController.update);
router.put("/:id/updateStatus", authenticateToken, staffCheck, FacController.updateStatus);
router.post(
  "/:id/delete",
  authenticateToken,
  managerCheck,
  FacController.delete
);

module.exports = router;
