const Application = require("../models/application");
const { sql, poolPromise } = require("../config/db");
const applicationController = {
  async getAll(req, res) {
    try {
      const data = await Application.getAll();
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch applications" });
    }
  },

  async getById(req, res) {
    try {
      const data = await Application.getById(req.params.id);
      data ? res.json(data) : res.status(404).json({ error: "Not found" });
    } catch (err) {
      res.status(500).json({ error: "Error retrieving application" });
    }
  },

  async create(req, res) {
    try {
      console.log("app register", req.body);

      // Check if the application name already exists in the database
      const pool = await poolPromise;
      const existingApp = await pool
        .request()
        .input("Name", sql.VarChar(100), req.body.name).query(`
          SELECT id, name FROM applications WHERE name = @Name
        `);

      // If the application name exists, return a message and do not create a new one
      if (existingApp.recordset.length > 0) {
        console.log("Application already exists:", existingApp.recordset[0]);
        return res.status(400).json({
          message: "Application already created",
          id: existingApp.recordset[0].id,
          name: existingApp.recordset[0].name,
        });
      }

      // Otherwise, create the new application
      const app = await Application.create(req.body);
      console.log("created", app);

      // Return the created application details
      res.status(201).json({
        message: "Application created",
        id: app.id,
        name: app.name,
      });
    } catch (err) {
      console.log("Error creating application:");
      console.log("Message:", err.message);

      res.status(500).json({ error: "Failed to create application" });
    }
  },

  async update(req, res) {
    try {
      await Application.update(req.params.id, req.body);
      res.json({ message: "Application updated" });
    } catch (err) {
      res.status(500).json({ error: "Failed to update application" });
    }
  },

  async remove(req, res) {
    try {
      await Application.remove(req.params.id);
      res.json({ message: "Application deleted" });
    } catch (err) {
      res.status(500).json({ error: "Failed to delete application" });
    }
  },
};

module.exports = applicationController;
