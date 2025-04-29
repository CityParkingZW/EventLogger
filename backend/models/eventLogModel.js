const { sql, poolPromise } = require("../config/db");

const EventLog = {
  // Get all event logs
  async getAll() {
    const pool = await poolPromise;

    const result = await pool.request().query("SELECT * FROM event_logs");
    return result.recordset;
  },

  // Get a single log by ID
  async getById(id) {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .query("SELECT * FROM event_logs WHERE log_id = @id");
    return result.recordset[0];
  },

  // Create a new log entry
  async create(data) {
    const pool = await poolPromise;
    const request = pool.request();

    request
      .input("timestamp", sql.DateTime, data.timestamp || new Date()) // default to now if not provided
      .input("log_level_id", sql.Int, data.log_level_id)
      .input("service_id", sql.Int, data.service_id)
      .input("application_id", sql.Int, data.application_id)
      .input("event_type_id", sql.Int, data.event_type_id)
      .input("message", sql.Text, data.message)
      .input("user_id", sql.NVarChar, data.user_id)
      .input("client_ip", sql.VarChar, data.client_ip)
      .input("mac_address", sql.VarChar, data.mac_address)
      .input("user_agent", sql.Text, data.user_agent)
      .input("exception_type", sql.VarChar, data.exception_type)
      .input("error_code", sql.VarChar, data.error_code)
      .input("response_time", sql.Int, data.response_time)
      .input("method", sql.VarChar, data.method)
      .input("outcome", sql.VarChar, data.outcome)
      .input("endpoint", sql.Text, data.endpoint)
      .input("authentication_method", sql.VarChar, data.authentication_method)
      .input("failure_reason", sql.Text, data.failure_reason)
      .input("correlation_id", sql.VarChar, data.correlation_id)
      .input("transaction_id", sql.VarChar, data.transaction_id) // ✅ newly added
      .input("source", sql.VarChar, data.source)
      .input("environment_id", sql.Int, data.environment_id);

    const result = await request.query(`
      INSERT INTO event_logs (
    timestamp, log_level_id, service_id, application_id, 
    event_type_id, message, user_id, client_ip, mac_address, user_agent,
    exception_type, error_code, response_time, method, endpoint,
    authentication_method, failure_reason, correlation_id, 
    transaction_id, source, environment_id,outcome
) VALUES (
    GETDATE(), @log_level_id, @service_id, @application_id,
    @event_type_id, @message, @user_id, @client_ip, @mac_address, @user_agent,
    @exception_type, @error_code, @response_time, @method, @endpoint,
    @authentication_method, @failure_reason, @correlation_id,
    @transaction_id, @source, @environment_id,@outcome
);

    `);

    return result;
  },

  // Delete a log by ID
  async delete(id) {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .query("DELETE FROM event_logs WHERE log_id = @id");
    return result;
  },
};

module.exports = EventLog;
