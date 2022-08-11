const path = require('path')

module.exports = {
  application: {
    name: 'express js production',
    logDir: process.env.LOG_DIR || path.join(process.cwd(), 'logs'),
    port: process.env.PORT || '8080',
  },
  env: {
    NODE_ENV: process.env.NODE_ENV || 'development',
  },
}
