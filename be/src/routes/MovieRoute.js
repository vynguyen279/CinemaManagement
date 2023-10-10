const express = require("express");
const router = express.Router();
const MovieController = require("../controllers/MovieController");
const {
  managerCheck,
  supervisorManaCheck,
  authenticateToken,
} = require("../utils/authentication");

router.post("/insert", authenticateToken, managerCheck, MovieController.insert);
router.post("/list", authenticateToken, managerCheck, MovieController.list);
router.get(
  "/list-active",
  authenticateToken,
  supervisorManaCheck,
  MovieController.listActive
);
router.put("/update", authenticateToken, managerCheck, MovieController.update);
router.post("/delete", authenticateToken, managerCheck, MovieController.delete);

module.exports = router;
