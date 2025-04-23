// constants.js
module.exports = {
  LogLevels: {
    DEBUG: 1,
    INFO: 2,
    WARNING: 3,
    ERROR: 4,
    CRITICAL: 5,
    FATAL: 6,
  },

  EventTypes: {
    APPLICATION: 1,
    EXCEPTION: 2,
    AUTHENTICATION: 3,
    SYSTEM: 4,
    REQUEST: 5,
    SECURITY: 6,
    DATABASE: 7,
    PERFORMANCE: 8,
    MONITORING: 9,
  },

  Environments: {
    DEVELOPMENT: 1,
    TESTING: 2,
    QA: 3,
    UAT: 4,
    PRODUCTION: 5,
    SANDBOX: 6,
  },
};
