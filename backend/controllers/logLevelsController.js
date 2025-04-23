const LogLevel = require("../models/logLevel");

exports.getAllLogLevels = async (req, res) => {
  try {
    const data = await LogLevel.getAll();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Error getting log levels", error: err });
  }
};

exports.createLogLevel = async (req, res) => {
  try {
    await LogLevel.create(req.body);
    res.status(201).json({ message: "Log level created" });
  } catch (err) {
    res.status(500).json({ message: "Error creating log level", error: err });
  }
};

exports.deleteLogLevel = async (req, res) => {
  try {
    await LogLevel.delete(req.params.id);
    res.json({ message: "Log level deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting log level", error: err });
  }
};
