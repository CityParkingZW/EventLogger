const sql = require("mssql");
const dbConfig = require("../dbConfig");
const sql = require("../config/db");

const EventLog = {
  async getAll() {
    const result = await sql.query`SELECT * FROM event_logs`;
    return result.recordset;
  },

  async getById(id) {
    const result =
      await sql.query`SELECT * FROM event_logs WHERE log_id = ${id}`;
    return result.recordset[0];
  },

  async create(data) {
    const request = new sql.Request();
    Object.entries(data).forEach(([key, value]) => request.input(key, value));
    const result = await request.query(`
      INSERT INTO event_logs (
        timestamp, log_level_id, event_id, service_id, application_id, 
        event_type_id, message, user_id, client_ip, mac_address, user_agent,
        exception_type, error_code, response_time, method, endpoint,
        authentication_method, failure_reason, correlation_id, transaction_id,
        source, environment_id
      ) VALUES (
        GETDATE(), @log_level_id, @event_id, @service_id, @application_id,
        @event_type_id, @message, @user_id, @client_ip, @mac_address, @user_agent,
        @exception_type, @error_code, @response_time, @method, @endpoint,
        @authentication_method, @failure_reason, @correlation_id, @transaction_id,
        @source, @environment_id
      )
    `);
    return result;
  },

  async delete(id) {
    return await sql.query`DELETE FROM event_logs WHERE log_id = ${id}`;
  },
};

module.exports = EventLog;

async function createEventLog(data) {
  const pool = await sql.connect(dbConfig);
  const result = await pool
    .request()
    .input("event_id", sql.VarChar, data.event_id)
    .input("log_level_id", sql.Int, data.log_level_id)
    .input("service_id", sql.Int, data.service_id)
    .input("application_id", sql.Int, data.application_id)
    .input("event_type_id", sql.Int, data.event_type_id)
    .input("message", sql.Text, data.message)
    .input("user_id", sql.VarChar, data.user_id)
    .input("client_ip", sql.VarChar, data.client_ip)
    .input("mac_address", sql.VarChar, data.mac_address)
    .input("user_agent", sql.Text, data.user_agent)
    .input("exception_type", sql.VarChar, data.exception_type)
    .input("error_code", sql.VarChar, data.error_code)
    .input("response_time", sql.Int, data.response_time)
    .input("method", sql.VarChar, data.method)
    .input("endpoint", sql.Text, data.endpoint)
    .input("authentication_method", sql.VarChar, data.authentication_method)
    .input("failure_reason", sql.Text, data.failure_reason)
    .input("correlation_id", sql.VarChar, data.correlation_id)
    .input("transaction_id", sql.VarChar, data.transaction_id)
    .input("source", sql.VarChar, data.source)
    .input("environment_id", sql.Int, data.environment_id)
    .query(`INSERT INTO event_logs (
            event_id, log_level_id, service_id, application_id, event_type_id, message,
            user_id, client_ip, mac_address, user_agent, exception_type, error_code,
            response_time, method, endpoint, authentication_method, failure_reason,
            correlation_id, transaction_id, source, environment_id
        ) VALUES (
            @event_id, @log_level_id, @service_id, @application_id, @event_type_id, @message,
            @user_id, @client_ip, @mac_address, @user_agent, @exception_type, @error_code,
            @response_time, @method, @endpoint, @authentication_method, @failure_reason,
            @correlation_id, @transaction_id, @source, @environment_id
        )`);
  return result;
}

module.exports = {
  createEventLog,
};
