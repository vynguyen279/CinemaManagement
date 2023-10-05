const express = require("express");
const router = express.Router();
const staffPosController = require("../controllers/Staff_PosController");

router.post("/list", staffPosController.getList);

module.exports = router;
