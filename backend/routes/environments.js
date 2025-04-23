const express = require("express");
const router = express.Router();
const environmentController = require("../controllers/environmentsController");

// GET all environments
router.get("/", environmentController.getAllEnvironments);

// GET environment by ID
router.get("/:id", environmentController.getEnvironmentById);

// POST create environment
router.post("/", environmentController.createEnvironment);

// PUT update environment
router.put("/:id", environmentController.updateEnvironment);

// DELETE environment
router.delete("/:id", environmentController.deleteEnvironment);

module.exports = router;
