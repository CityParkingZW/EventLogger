const userModel = require("../models/userModel");

exports.getUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await userModel.getUserById(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.createUser = async (req, res) => {
  try {
    await userModel.createUser(req.body);
    res.status(201).send("User created");
  } catch (err) {
    res.status(500).send(err.message);
  }
};
