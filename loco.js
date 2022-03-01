// Import modules
const server = require('./modules/server');
const functionsHelpers = require('./modules/functions');
const consoleHelpers = require('./modules/console');

// Configuration
const cwd = process.cwd();
const config = process.argv[2] ? require(`${cwd}/${process.argv[2]}`) : null;
const appVersion = require('./package.json').version;

// No config provided
if (null === config) {
    const sampleConfig = require('./config.json');
    consoleHelpers.printNoConfigProvided(sampleConfig);
    process.exit();
}

// DotEnv
const sysEnvVars = Object.assign({}, process.env);
const dotenv = require('dotenv');
dotenv.config({path: config.envFile});
const envVars = functionsHelpers.sanitizeEnvObj(sysEnvVars, process.env);

// Express
const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Intercept OPTIONS method
app.use((req, res, next) => {
    if ('OPTIONS' === req.method) {
        // Set headers based on config
        if (Object.keys(config.optionsRequestHeaders).length) {
            Object.keys(config.optionsRequestHeaders).forEach((header) => {
                res.header(header, config.optionsRequestHeaders[header]);
            });
        }

        res.send(config.optionsRequestStatusCode);
    } else {
        next();
    }
});

// Build functions object
const functionObject = functionsHelpers.buildFunctionsObject(config, cwd);

// Print details to console
consoleHelpers.printIntroBanner('Loco', appVersion); //  app banner
consoleHelpers.printAvailableFunctions(functionObject); // available functions
consoleHelpers.printEnvVariables(envVars, config); // Print env variables

// Handle GET requests
app.get('/*', (req, res) => {
    // Process GET request
    server.process(res, req, 'GET', functionObject, envVars);
});

// Handle POST requests
app.post('/*', (req, res) => {
    // Process GET request
    server.process(res, req, 'POST', functionObject, envVars);
});

// Start the server
app.listen(config.appPort, config.appHost, consoleHelpers.printListenInfo(config));
