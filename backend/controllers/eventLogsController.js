const EventLog = require("../models/eventLogModel");
const { sendNotification } = require("../utils/notify");

const controller = {
  async getAll(req, res) {
    const logs = await EventLog.getAll();
    res.json(logs);
  },

  async getById(req, res) {
    const log = await EventLog.getById(req.params.id);
    if (!log) return res.status(404).send("Not found");
    res.json(log);
  },

  async create(req, res) {
    try {
      const result = await EventLog.create(req.body);
      await sendNotification(req.body); // Email if error/critical
      res.status(201).send("Log added");
    } catch (err) {
      console.error(err);
      res.status(500).send("Error creating log");
    }
  },

  async delete(req, res) {
    await EventLog.delete(req.params.id);
    res.send("Deleted");
  },
};

module.exports = controller;
