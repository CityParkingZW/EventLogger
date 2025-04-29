const HealthModel = require("../models/systemhealthlog");
exports.createHealthLog = async (req, res) => {
  try {
    const log = req.body;
    console.log("health", log);
    // Automatically determine status based on thresholds
    let status = "Healthy";
    let failureReason = null;
    const cpu = parseFloat(log.cpu_load);
    const memory = parseFloat(log.memory_usage_mb);
    const disk = parseFloat(log.disk_usage_gb);

    if (
      (!isNaN(cpu) && cpu > 80) ||
      (!isNaN(memory) && memory > 80) ||
      (!isNaN(disk) && disk > 90)
    ) {
      status = "Unhealthy";
      failureReason = "Issues detected: ";
      if (!isNaN(cpu) && cpu > 80) failureReason += `High CPU Load (${cpu}%), `;
      if (!isNaN(memory) && memory > 80)
        failureReason += `High Memory Usage (${memory}%), `;
      if (!isNaN(disk) && disk > 90)
        failureReason += `High Disk Usage (${disk}%), `;
      failureReason = failureReason.slice(0, -2); // Remove trailing comma
    }

    // Prepare log data
    const healthLogData = {
      application_id: log.application_id,
      status,
      response_time_ms: log.response_time_ms || 0,
      memory_usage_mb: log.memory_usage_mb,
      cpu_load: log.cpu_load,
      disk_usage_gb: log.disk_usage_gb,
      failure_count: status === "Unhealthy" ? 1 : 0,
      success_count: status === "Healthy" ? 1 : 0,
      last_failure_reason: failureReason || null,
      updated_at: new Date(),
      created_at: new Date(),
      owner: log.owner || "System",
    };

    // Save health log in the database
    await HealthModel.createHealthLog(healthLogData);

    // If status is Unhealthy, send a notification email
    if (status === "Unhealthy") {
      await sendEmailNotification({
        subject: "System Health Alert",
        message: `🚨 System Health Alert 🚨\n\nStatus: ${status}\nCPU Load: ${log.cpu_load}%\nMemory Usage: ${log.memory_usage_mb}%\nDisk Usage: ${log.disk_usage_gb}%\nFailure Reason: ${failureReason}`,
      });
    }

    res.status(201).json({ message: "Health log created successfully." });
  } catch (err) {
    console.error("Error creating health log:", err);
    res.status(500).json({ error: err.message });
  }
};
exports.getHealthLogs = async (req, res) => {
  try {
    const logs = await HealthModel.getHealthLogs();
    res.status(200).json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getHealthLogById = async (req, res) => {
  try {
    const log = await HealthModel.getHealthLogById(req.params.id);
    if (!log) return res.status(404).json({ error: "Health log not found" });
    res.status(200).json(log);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteHealthLog = async (req, res) => {
  try {
    const rows = await HealthModel.deleteHealthLog(req.params.id);
    if (rows === 0) return res.status(404).json({ error: "Log not found" });
    res.status(200).json({ message: "Log deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
