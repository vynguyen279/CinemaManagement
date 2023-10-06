const express = require("express");
const router = express.Router();
const BranchController = require("../controllers/BranchController");
const {
  managerAdminCheck,
  authenticateToken,
} = require("../utils/authentication");

router.post(
  "/list",
  authenticateToken,
  managerAdminCheck,
  BranchController.getList
);

router.post("/insert", BranchController.insert);

module.exports = router;
