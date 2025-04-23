const sql = require("mssql");
const dbConfig = require("../config/db");

const ServiceDependency = {
  async getAll() {
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .query("SELECT * FROM service_dependencies");
    return result.recordset;
  },

  async getByParentId(parent_service_id) {
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .input("parent_service_id", sql.Int, parent_service_id)
      .query(
        "SELECT * FROM service_dependencies WHERE parent_service_id = @parent_service_id"
      );
    return result.recordset;
  },

  async addDependency(parent_service_id, dependent_service_id) {
    const pool = await sql.connect(dbConfig);
    await pool
      .request()
      .input("parent_service_id", sql.Int, parent_service_id)
      .input("dependent_service_id", sql.Int, dependent_service_id)
      .query(`INSERT INTO service_dependencies (parent_service_id, dependent_service_id)
              VALUES (@parent_service_id, @dependent_service_id)`);
  },

  async deleteDependency(parent_service_id, dependent_service_id) {
    const pool = await sql.connect(dbConfig);
    await pool
      .request()
      .input("parent_service_id", sql.Int, parent_service_id)
      .input("dependent_service_id", sql.Int, dependent_service_id)
      .query(`DELETE FROM service_dependencies
              WHERE parent_service_id = @parent_service_id AND dependent_service_id = @dependent_service_id`);
  },
};

module.exports = ServiceDependency;
