const sql = require("mssql");
const dbConfig = require("../config/db");

const Environment = {
  async getAll() {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().query("SELECT * FROM environments");
    return result.recordset;
  },

  async getById(environment_id) {
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input("environment_id", sql.Int, environment_id)
      .query(
        "SELECT * FROM environments WHERE environment_id = @environment_id"
      );
    return result.recordset[0];
  },

  async create(environment) {
    const pool = await sql.connect(dbConfig);
    await pool
      .request()
      .input("environment_name", sql.VarChar(50), environment.environment_name)
      .query(
        "INSERT INTO environments (environment_name) VALUES (@environment_name)"
      );
  },

  async update(environment_id, environment) {
    const pool = await sql.connect(dbConfig);
    await pool
      .request()
      .input("environment_id", sql.Int, environment_id)
      .input("environment_name", sql.VarChar(50), environment.environment_name)
      .query(
        "UPDATE environments SET environment_name = @environment_name WHERE environment_id = @environment_id"
      );
  },

  async delete(environment_id) {
    const pool = await sql.connect(dbConfig);
    await pool
      .request()
      .input("environment_id", sql.Int, environment_id)
      .query("DELETE FROM environments WHERE environment_id = @environment_id");
  },
};

module.exports = Environment;
