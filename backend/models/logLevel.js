const db = require("../config/db");

const LogLevel = {
  getAll: async () => {
    const result = await db.query("SELECT * FROM log_levels");
    return result.recordset;
  },

  create: async ({ log_level_id, log_level_name }) => {
    await db.query(
      "INSERT INTO log_levels (log_level_id, log_level_name) VALUES (@log_level_id, @log_level_name)",
      { log_level_id, log_level_name }
    );
  },

  delete: async (log_level_id) => {
    await db.query(
      "DELETE FROM log_levels WHERE log_level_id = @log_level_id",
      { log_level_id }
    );
  },
};

module.exports = LogLevel;
