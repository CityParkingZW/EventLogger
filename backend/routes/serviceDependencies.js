const express = require("express");
const router = express.Router();
const controller = require("../controllers/serviceDependenciesController");

// Get all service dependencies
router.get("/", controller.getAllDependencies);

// Get dependencies for a specific parent service
router.get("/:parentId", controller.getDependenciesByParent);

// Add a service dependency
router.post("/", controller.addDependency);

// Delete a service dependency
router.delete("/", controller.deleteDependency);

module.exports = router;
