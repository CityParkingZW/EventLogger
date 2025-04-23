const HealthModel = require("../models/systemhealthlog");

exports.createHealthLog = async (req, res) => {
  try {
    const log = req.body;
    await HealthModel.createHealthLog(log);
    res.status(201).json({ message: "Health log created successfully." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getHealthLogs = async (req, res) => {
  try {
    const logs = await HealthModel.getHealthLogs();
    res.status(200).json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getHealthLogById = async (req, res) => {
  try {
    const log = await HealthModel.getHealthLogById(req.params.id);
    if (!log) return res.status(404).json({ error: "Health log not found" });
    res.status(200).json(log);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteHealthLog = async (req, res) => {
  try {
    const rows = await HealthModel.deleteHealthLog(req.params.id);
    if (rows === 0) return res.status(404).json({ error: "Log not found" });
    res.status(200).json({ message: "Log deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
