const { config } = require('./wdio.conf');

exports.config = {
    ...config,
    ...{
        capabilities: [
            {
                maxInstances: 3,
                browserName: 'chrome',
                acceptInsecureCerts: true,
                'goog:chromeOptions': {
                    args: ['--incognito', '--no-sandbox', '--disable-dev-shm-usage', '--lang=en_US']
                },
            },
        ],

        services: ['chromedriver'],
    }
}