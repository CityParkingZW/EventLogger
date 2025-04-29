const express = require("express");
const cors = require("cors");
const fs = require("fs");
const readline = require("readline");

const http = require("http");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
try {
  app.use("/api/users", require("./routes/users"));
  app.use("/api/log-levels", require("./routes/logLevels"));
  app.use("/api/event-types", require("./routes/eventTypes"));
  app.use("/api/environments", require("./routes/environments"));
  app.use("/api/services", require("./routes/services"));
  app.use("/api/applications", require("./routes/applications"));
  app.use("/api/service-dependencies", require("./routes/serviceDependencies"));
  app.use("/api/event-logs", require("./routes/eventLogs"));
  app.use("/api/system-health-logs", require("./routes/systemhealthlogs"));
} catch (error) {
  console.error("Error while setting up routes:", error);
}

const configPath = path.join(__dirname, "config", "notifications.json");
async function promptForEmail() {
  if (fs.existsSync(configPath)) return;

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("Enter notification email address: ", function (email) {
    const config = { mailto: email };
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    console.log("Notification email saved.");
    rl.close();
  });
}

promptForEmail();

app.post("/api/settings/notifications", (req, res) => {
  const { mailto } = req.body;

  if (!mailto || !mailto.includes("@")) {
    return res.status(400).json({ message: "Invalid email" });
  }

  fs.writeFileSync(
    "./config/notifications.json",
    JSON.stringify({ mailto }, null, 2)
  );
  res.json({ message: "Notification email updated" });
});

http.createServer(app).listen(3000, () => {
  console.log("HTTP server listening on http://localhost:3000");
});
// const PORT = 3000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
