
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./react-gamepads.cjs.production.min.js')
} else {
  module.exports = require('./react-gamepads.cjs.development.js')
}
