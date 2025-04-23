const Service = require("../models/service");

const serviceController = {
  getAll: async (req, res) => {
    try {
      const services = await Service.getAll();
      res.json(services);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getById: async (req, res) => {
    try {
      const service = await Service.getById(req.params.id);
      if (!service)
        return res.status(404).json({ message: "Service not found" });
      res.json(service);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  create: async (req, res) => {
    try {
      const newService = await Service.create(req.body);
      res.status(201).json(newService);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  update: async (req, res) => {
    try {
      const updated = await Service.update(req.params.id, req.body);
      res.json(updated);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  delete: async (req, res) => {
    try {
      await Service.delete(req.params.id);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = serviceController;
