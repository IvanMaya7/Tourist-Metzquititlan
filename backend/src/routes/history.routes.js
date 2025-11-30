const express = require("express");
const router = express.Router();

const HistoryController = require("../controllers/history.controller");

router.post("/save", HistoryController.createHistory);
router.get("/getAll", HistoryController.getAllHistory);
router.get("/getById/:id", HistoryController.getHistoryById);
router.patch("/updateById/:id", HistoryController.updateHistoryById);
router.delete("/deleteById/:id", HistoryController.deleteHistoryById);

module.exports = router;