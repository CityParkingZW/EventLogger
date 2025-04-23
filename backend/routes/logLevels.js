const express = require("express");
const router = express.Router();
const logLevelController = require("../controllers/logLevelsController");

router.get("/", logLevelController.getAllLogLevels);
router.post("/", logLevelController.createLogLevel);
router.delete("/:id", logLevelController.deleteLogLevel);

module.exports = router;
