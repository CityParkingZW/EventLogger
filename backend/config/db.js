const sql = require("mssql");

const config = {
  user: "your_user",
  password: "your_password",
  server: "localhost",
  database: "ServiceLogsMonitoring",
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

sql.on("error", (err) => console.error("SQL Error:", err));

module.exports = {
  sql,
  poolPromise: new sql.ConnectionPool(config).connect(),
};
