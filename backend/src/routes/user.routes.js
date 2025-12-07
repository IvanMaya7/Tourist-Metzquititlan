const express = require("express");
const router = express.Router();

const UserController = require("../controllers/user.controller");

const auth = require("../middleware/auth.middleware");
const allowedRoles = require("../middleware/verifyRole.middleware");

router.post("/save",/* auth, allowedRoles("admin", "gerente"), */UserController.createUser);
router.get("/getAll", /* auth, allowedRoles("admin", "gerente"), */ UserController.getAllUsers);
router.get("/getById/:id", /* auth, allowedRoles("admin", "gerente"), */ UserController.getUserById);
router.patch("/updateById/:id", /* auth, allowedRoles("admin", "gerente"), */ UserController.updateUserById);
router.delete("/deleteById/:id", /* auth, allowedRoles("admin", "gerente"), */ UserController.deleteUserById);

module.exports = router;