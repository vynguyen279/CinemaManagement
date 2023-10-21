const express = require("express");
const router = express.Router();
const BranchController = require("../controllers/BranchController");
const {
  managerAdminCheck,
  managerCheck,
  authenticateToken,
} = require("../utils/authentication");

router.post(
  "/list",
  authenticateToken,
  managerAdminCheck,
  BranchController.getList
);

router.post(
  "/insert",
  authenticateToken,
  managerCheck,
  BranchController.insert
);
router.post(
  "/update",
  authenticateToken,
  managerCheck,
  BranchController.update
);

router.post(
  "/delete",
  authenticateToken,
  managerCheck,
  BranchController.delete
);
module.exports = router;
