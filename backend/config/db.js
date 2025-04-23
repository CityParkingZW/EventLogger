const sql = require("mssql");
require("dotenv").config();

const dbConfig = {
  user: "research",
  password: "password",
  server: "CHAPARIKA\\SQLEXPRESS",
  database: "ServiceLogsMonitoring",
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
  port: 1433,
};

const poolPromise = new sql.ConnectionPool(dbConfig)
  .connect()
  .then((pool) => {
    console.log("Connected to SQL Server");
    return pool;
  })
  .catch((err) => {
    console.error("Database Connection Failed!", err);
    process.exit(1);
  });

// Only export once
module.exports = {
  sql,
  poolPromise,
};
