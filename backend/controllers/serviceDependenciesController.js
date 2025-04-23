const ServiceDependency = require("../models/serviceDependency");

const getAllDependencies = async (req, res) => {
  try {
    const dependencies = await ServiceDependency.getAll();
    res.json(dependencies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getDependenciesByParent = async (req, res) => {
  try {
    const deps = await ServiceDependency.getByParentId(req.params.parentId);
    res.json(deps);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addDependency = async (req, res) => {
  try {
    const { parent_service_id, dependent_service_id } = req.body;
    await ServiceDependency.addDependency(
      parent_service_id,
      dependent_service_id
    );
    res.status(201).json({ message: "Dependency added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteDependency = async (req, res) => {
  try {
    const { parent_service_id, dependent_service_id } = req.body;
    await ServiceDependency.deleteDependency(
      parent_service_id,
      dependent_service_id
    );
    res.json({ message: "Dependency removed successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllDependencies,
  getDependenciesByParent,
  addDependency,
  deleteDependency,
};
