const { sql, poolPromise } = require("../config/db");

async function createHealthLog(log) {
  const pool = await poolPromise;
  const result = await pool
    .request()
    .input("application_id", sql.Int, log.application_id)
    .input("status", sql.VarChar, log.status)
    .input("response_time_ms", sql.Int, log.response_time_ms)
    .input("memory_usage_mb", sql.Decimal(10, 2), log.memory_usage_mb)
    .input("cpu_load", sql.Decimal(5, 2), log.cpu_load)
    .input("disk_usage_gb", sql.Decimal(10, 2), log.disk_usage_gb)
    .input("failure_count", sql.Int, log.failure_count)
    .input("success_count", sql.Int, log.success_count)
    .input("last_failure_reason", sql.NVarChar, log.last_failure_reason)
    .input("updated_at", sql.DateTime, log.updated_at)
    .input("created_at", sql.DateTime, log.created_at)
    .input("owner", sql.NVarChar, log.owner).query(`
            INSERT INTO system_health_logs (
                application_id, status, response_time_ms, memory_usage_mb, cpu_load, disk_usage_gb,
                failure_count, success_count, last_failure_reason, owner,updated_at, created_at
            ) VALUES (
                @application_id, @status, @response_time_ms, @memory_usage_mb, @cpu_load, @disk_usage_gb,
                @failure_count, @success_count, @last_failure_reason, @owner,@updated_at,@created_at
            )
        `);
  return result;
}

async function getHealthLogs() {
  const pool = await poolPromise;
  const result = await pool.request().query("SELECT * FROM system_health_logs");
  return result.recordset;
}

async function getHealthLogById(id) {
  const pool = await poolPromise;
  const result = await pool
    .request()
    .input("id", sql.Int, id)
    .query("SELECT * FROM system_health_logs WHERE id = @id");
  return result.recordset[0];
}

async function deleteHealthLog(id) {
  const pool = await poolPromise;
  const result = await pool
    .request()
    .input("id", sql.Int, id)
    .query("DELETE FROM system_health_logs WHERE id = @id");
  return result.rowsAffected;
}

module.exports = {
  createHealthLog,
  getHealthLogs,
  getHealthLogById,
  deleteHealthLog,
};
