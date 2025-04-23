const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/users", require("./routes/users"));
app.use("/api/log-levels", require("./routes/logLevels"));
app.use("/api/event-types", require("./routes/eventTypes"));
app.use("/api/environments", require("./routes/environments"));
app.use("/api/services", require("./routes/services"));
app.use("/api/applications", require("./routes/applications"));
app.use("/api/service-dependencies", require("./routes/serviceDependencies"));
app.use("/api/event-logs", require("./routes/eventLogs"));

app.use("/api/system-health-logs", require("./routes/systemhealthlogs"));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
