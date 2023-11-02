const { defineConfig } = require("cypress");

module.exports = defineConfig({
  
  e2e: {
    setupNodeEvents(on, config) {
    },
    baseUrl: 'http://localhost:4321/',
    viewportHeight: 1080,
    viewportWidth: 1920,
    testIsolation: false,
  },
});
