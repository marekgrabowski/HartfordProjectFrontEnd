const { defineConfig } = require("cypress");

module.exports = defineConfig({
  
  e2e: {
    setupNodeEvents(on, config) {
    },
    baseUrl: 'http://tww-website.s3-website-us-east-1.amazonaws.com/',
    viewportHeight: 1080,
    viewportWidth: 1920,
    testIsolation: false,
  },
});
