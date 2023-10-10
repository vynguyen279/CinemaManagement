const express = require("express");
const router = express.Router();
const PositionController = require("../controllers/PositionController");
const { adminCheck, authenticateToken } = require("../utils/authentication");

router.get("/list", authenticateToken, adminCheck, PositionController.getList);
module.exports = router;
