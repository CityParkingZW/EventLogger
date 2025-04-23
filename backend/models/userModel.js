const sql = require("mssql");
const dbConfig = require("../config/db");

const getAllUsers = async () => {
  await sql.connect(dbConfig);
  const result = await sql.query`SELECT * FROM users`;
  return result.recordset;
};

const getUserById = async (id) => {
  await sql.connect(dbConfig);
  const result = await sql.query`SELECT * FROM users WHERE user_id = ${id}`;
  return result.recordset[0];
};

const createUser = async (user) => {
  const { user_id, username, full_name, email, phone_number, role } = user;
  await sql.connect(dbConfig);
  await sql.query`
    INSERT INTO users (user_id, username, full_name, email, phone_number, role)
    VALUES (${user_id}, ${username}, ${full_name}, ${email}, ${phone_number}, ${role})`;
};

const updateUser = async (id, user) => {
  const { username, full_name, email, phone_number, role } = user;
  await sql.connect(dbConfig);
  await sql.query`
    UPDATE users 
    SET username = ${username}, full_name = ${full_name}, email = ${email}, 
        phone_number = ${phone_number}, role = ${role}
    WHERE user_id = ${id}`;
};

const deleteUser = async (id) => {
  await sql.connect(dbConfig);
  await sql.query`DELETE FROM users WHERE user_id = ${id}`;
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
