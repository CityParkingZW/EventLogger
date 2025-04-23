const express = require("express");
const router = express.Router();
const controller = require("../controllers/systemHealthLogController");

router.post("/", controller.createHealthLog);
router.get("/", controller.getHealthLogs);
router.get("/:id", controller.getHealthLogById);
router.delete("/:id", controller.deleteHealthLog);

module.exports = router;
