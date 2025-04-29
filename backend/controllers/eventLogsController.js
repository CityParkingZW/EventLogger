const EventLog = require("../models/eventLogModel");
const { sendNotification } = require("../utils/notify");
const { LogLevels, EventTypes, Environments } = require("../utils/constants");
const controller = {
  async getAll(req, res) {
    const logs = await EventLog.getAll();
    res.json(logs);
  },

  async getById(req, res) {
    const log = await EventLog.getById(req.params.id);
    if (!log) return res.status(404).send("Not found");
    res.json(log);
  },

  async create(req, res) {
    try {
      const body = req.body;
      console.log("event log", body);
      // Automatically derive these
      const log_level_id = determineLogLevel(body);
      const event_type_id = determineEventType(body);
      const environment_id = determineEnvironment(body);

      // Construct the log payload
      const logData = {
        log_level_id,
        service_id: body.service_id,
        application_id: body.application_id,
        event_type_id,
        message: body.message,
        user_id: body.user_id,
        client_ip: body.client_ip,
        mac_address: body.mac_address,
        user_agent: body.user_agent,
        exception_type: body.exception_type || null,
        error_code: body.error_code || null,
        response_time: body.response_time || 0,
        method: body.method,
        endpoint: body.endpoint,
        outcome: body.outcome,
        authentication_method: body.authentication_method || "Unknown",
        failure_reason: body.failure_reason || null,
        source: body.source || "Unspecified App",
        environment_id,
      };

      // Save log
      await EventLog.create(logData);

      // Send notification if Error, Critical, Fatal
      if (log_level_id >= 4) {
        await sendNotification(logData);
      }

      res.status(201).send("Log created");
    } catch (err) {
      console.error("Error creating log:", err);
      res.status(500).send("Internal server error");
    }
  },

  async delete(req, res) {
    await EventLog.delete(req.params.id);
    res.send("Deleted");
  },
};
function determineLogLevel(body) {
  if (body.exception_type) {
    return body.error_code?.startsWith("5")
      ? LogLevels.CRITICAL
      : LogLevels.ERROR;
  }
  if (body.failure_reason?.toLowerCase().includes("unauthorized"))
    return LogLevels.WARNING;
  if (body.message?.toLowerCase().includes("debug")) return LogLevels.DEBUG;
  return LogLevels.INFO;
}

function determineEventType(body) {
  if (body.exception_type) return EventTypes.EXCEPTION;

  if (body.failure_reason || body.authentication_method)
    return EventTypes.AUTHENTICATION;

  const msg = body.message?.toLowerCase() || "";

  if (msg.includes("reboot") || msg.includes("shutdown"))
    return EventTypes.SYSTEM;
  if (msg.includes("request") || body.endpoint) return EventTypes.REQUEST;
  if (
    msg.includes("xss") ||
    msg.includes("csrf") ||
    msg.includes("sql injection")
  )
    return EventTypes.SECURITY;
  if (msg.includes("query failed") || msg.includes("db error"))
    return EventTypes.DATABASE;
  if (msg.includes("latency") || msg.includes("timeout"))
    return EventTypes.PERFORMANCE;
  if (msg.includes("health check") || msg.includes("uptime"))
    return EventTypes.MONITORING;

  return EventTypes.APPLICATION;
}

function determineEnvironment(body) {
  const env = (body.environment || "").toLowerCase();
  if (env.includes("dev")) return Environments.DEVELOPMENT;
  if (env.includes("test")) return Environments.TESTING;
  if (env.includes("qa")) return Environments.QA;
  if (env.includes("uat")) return Environments.UAT;
  if (env.includes("sandbox")) return Environments.SANDBOX;
  return Environments.PRODUCTION;
}

module.exports = {
  determineLogLevel,
  determineEventType,
  determineEnvironment,
};

module.exports = controller;
