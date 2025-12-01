const express = require("express");
const router = express.Router();

const upload = require("../middlewares/upload");
const GastronomyController = require("../controllers/gastronomy.controller");

router.post("/save", upload.array("images", 10), GastronomyController.createGastronomy);
router.get("/getAll", GastronomyController.getAllGastronomy);
router.get("/getById/:id", GastronomyController.getGastronomyById);
router.patch("/updateById/:id", GastronomyController.updateGastronomyById);
router.delete("/deleteById/:id", GastronomyController.deleteGastronomyById);

module.exports = router;