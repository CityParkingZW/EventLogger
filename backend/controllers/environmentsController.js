const Environment = require("../models/environmentModel");

const getAllEnvironments = async (req, res) => {
  try {
    const environments = await Environment.getAll();
    res.json(environments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getEnvironmentById = async (req, res) => {
  try {
    const environment = await Environment.getById(req.params.id);
    if (!environment) {
      return res.status(404).json({ error: "Environment not found" });
    }
    res.json(environment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createEnvironment = async (req, res) => {
  try {
    await Environment.create(req.body);
    res.status(201).json({ message: "Environment created" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateEnvironment = async (req, res) => {
  try {
    await Environment.update(req.params.id, req.body);
    res.json({ message: "Environment updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteEnvironment = async (req, res) => {
  try {
    await Environment.delete(req.params.id);
    res.json({ message: "Environment deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllEnvironments,
  getEnvironmentById,
  createEnvironment,
  updateEnvironment,
  deleteEnvironment,
};
