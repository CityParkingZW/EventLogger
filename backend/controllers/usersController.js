const userModel = require("../models/userModel");

exports.getAll = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const user = await userModel.getUserById(req.params.id);
    if (!user) return res.status(404).send("User not found");
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    await userModel.createUser(req.body);
    res.status(201).send("User created");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    await userModel.updateUser(req.params.id, req.body);
    res.send("User updated");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await userModel.deleteUser(req.params.id);
    res.send("User deleted");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
