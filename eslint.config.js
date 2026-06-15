const jie = require('@djie/eslint-config')

module.exports = jie(
  {},
  {
    ignores: [
      '**/dist/**',
      '**/test/**',
    ],
  },
)
