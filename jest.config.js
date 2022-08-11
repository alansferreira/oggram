let config = require('./.jest/jest-default')

const profile = process.env['JEST_PROFILE']

if (process.env['JEST_PROFILE']) {
  config = require(`./.jest/jest-${profile}.config`)
}

module.exports = config
