const { sql, poolPromise } = require("../config/db");

const Application = {
  async getAll() {
    const pool = await poolPromise;
    await pool.request().query("SELECT * FROM applications");
    return result.recordset;
  },

  async getById(id) {
    const pool = await poolPromise;

    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .query("SELECT * FROM applications WHERE application_id = @id");
    return result.recordset[0];
  },

  async create(data) {
    const pool = await poolPromise;

    const result = await pool
      .request()
      .input("Name", sql.VarChar(100), data.name)
      .input("BaseUrl", sql.VarChar(100), data.base_url)
      .input("CreatedAt", sql.DateTime(100), data.created_at)
      .input("Description", sql.Text, data.description).query(`
        INSERT INTO applications (name, description ,baseurl,createdat)
        OUTPUT INSERTED.id, INSERTED.name
        VALUES (@name, @description, @baseurl,@createdat)
      `);
    return result.recordset[0];
  },

  async update(id, data) {
    const pool = await poolPromise;

    await pool
      .request()
      .input("id", sql.Int, id)
      .input("application_name", sql.VarChar(100), data.application_name)
      .input("description", sql.Text, data.description).query(`
        UPDATE applications
        SET application_name = @application_name, description = @description
        WHERE application_id = @id
      `);
  },

  async remove(id) {
    const pool = await poolPromise;

    await pool
      .request()
      .input("id", sql.Int, id)
      .query("DELETE FROM applications WHERE application_id = @id");
  },
};

module.exports = Application;
