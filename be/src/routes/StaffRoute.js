const express = require("express");
const router = express.Router();
const staffController = require("../controllers/StaffController");
const { adminCheck, authenticateToken } = require("../utils/authentication");

router.post("/list", authenticateToken, adminCheck, staffController.list);
// router.post(
//   "/updateStatus",
//   authenticateToken,
//   adminCheck,
//   staffController.updateStatus
// );
router.post(
  "/updateStaPos",
  authenticateToken,
  adminCheck,
  staffController.updateStaPos
);
router.post("/updateInf", authenticateToken, staffController.updateInf);
router.post("/updatePass", authenticateToken, staffController.changePass);
router.post("/information", authenticateToken, staffController.selectInf);
router.post("/login", staffController.login);
router.post("/signUp", staffController.signUp);
router.post("/check", staffController.checkEmail);
router.post("/resetPass", staffController.resetPass);
router.post("/sendEmail", staffController.sendEmail);
module.exports = router;
