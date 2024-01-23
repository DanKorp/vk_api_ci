const timeouts = require('../src/environment/timeouts');
const setupBrowser = require('../src/framework/browserActions');

exports.config = {

    before: (async () => {
        await setupBrowser();
        await browser.reloadSession();
        await browser.setTimeout({ 'implicit': timeouts.implicit, 'pageLoad': timeouts.pageLoadTime });
        await browser.setWindowSize(1920, 1080)
    }),
    
    // runner: 'local',
    specs: [
        '../src/test/steps/*.js'
    ],
    exclude: [
    ],
    maxInstances: 3,
    logLevel: 'warn',
    bail: 0,
    baseUrl: 'http://localhost',
    waitforTimeout: timeouts.explicit,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
}
