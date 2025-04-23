const sql = require("mssql");
const dbConfig = require("../config/db");

async function getAllEventTypes() {
  const pool = await sql.connect(dbConfig);
  const result = await pool.request().query("SELECT * FROM event_types");
  return result.recordset;
}

async function getEventTypeById(id) {
  const pool = await sql.connect(dbConfig);
  const result = await pool
    .request()
    .input("id", sql.Int, id)
    .query("SELECT * FROM event_types WHERE event_type_id = @id");
  return result.recordset[0];
}

async function createEventType(name) {
  const pool = await sql.connect(dbConfig);
  await pool
    .request()
    .input("name", sql.VarChar(100), name)
    .query("INSERT INTO event_types (event_type_name) VALUES (@name)");
}

async function updateEventType(id, name) {
  const pool = await sql.connect(dbConfig);
  await pool
    .request()
    .input("id", sql.Int, id)
    .input("name", sql.VarChar(100), name)
    .query(
      "UPDATE event_types SET event_type_name = @name WHERE event_type_id = @id"
    );
}

async function deleteEventType(id) {
  const pool = await sql.connect(dbConfig);
  await pool
    .request()
    .input("id", sql.Int, id)
    .query("DELETE FROM event_types WHERE event_type_id = @id");
}

module.exports = {
  getAllEventTypes,
  getEventTypeById,
  createEventType,
  updateEventType,
  deleteEventType,
};
