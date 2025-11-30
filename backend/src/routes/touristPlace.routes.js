const express = require("express");
const router = express.Router();

const ToristPlaceController = require("../controllers/touristPlace.controller");

router.post("/save", ToristPlaceController.createPlace);
router.get("/getAll", ToristPlaceController.getAllPlaces);
router.get("/getById/:id", ToristPlaceController.getPlaceById);
router.patch("/updateById/:id", ToristPlaceController.updatePlaceById);
router.delete("/deleteById/:id", ToristPlaceController.deletePlaceById);

module.exports = router;