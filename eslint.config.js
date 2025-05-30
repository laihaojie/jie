const jie = require('@djie/eslint-config').default

module.exports = jie(
  {},
  {
    ignores: [
      '**/dist/**',
      '**/test/**',
    ],
  },
)
