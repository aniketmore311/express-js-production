// Sync object
/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  testMatch: ['**/*.spec.js'],
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.js"
  ]
}

module.exports = config
