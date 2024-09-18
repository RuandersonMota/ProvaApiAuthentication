const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Implementar eventos de configuração de node aqui, se necessário
    },
    baseUrl: 'https://api.getnet.com.br',
    env: {
      CLIENT_ID: '67823c6d-58de-494f-96d9-86a4c22682cb',
      CLIENT_SECRET: 'c2d6a06f-5f31-448b-9079-7e170e8536e4'
    },
    specPattern: '**/*.spec.js',
    supportFile: false,
    fixturesFolder: 'cypress/fixtures',
    screenshotsFolder: 'cypress/screenshots',
    videosFolder: 'cypress/videos',
    trashAssetsBeforeRuns: true,
  },
});
