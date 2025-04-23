const EventType = require("../models/eventType");

exports.getAll = async (req, res) => {
  try {
    const rows = await EventType.getAllEventTypes();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Error fetching event types" });
  }
};

exports.getById = async (req, res) => {
  try {
    const row = await EventType.getEventTypeById(req.params.id);
    if (!row) return res.status(404).json({ message: "Event type not found" });
    res.json(row);
  } catch (err) {
    res.status(500).json({ error: "Error fetching event type" });
  }
};

exports.create = async (req, res) => {
  try {
    await EventType.createEventType(req.body.event_type_name);
    res.status(201).json({ message: "Event type created" });
  } catch (err) {
    res.status(500).json({ error: "Error creating event type" });
  }
};

exports.update = async (req, res) => {
  try {
    await EventType.updateEventType(req.params.id, req.body.event_type_name);
    res.json({ message: "Event type updated" });
  } catch (err) {
    res.status(500).json({ error: "Error updating event type" });
  }
};

exports.remove = async (req, res) => {
  try {
    await EventType.deleteEventType(req.params.id);
    res.json({ message: "Event type deleted" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting event type" });
  }
};
