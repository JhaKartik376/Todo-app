const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      // Suppress tsconfig-paths warnings
      process.env.SKIP_TS_PATHS = 'true';
    },
  },
});
