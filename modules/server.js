const browserHelpers = require('./browser');
const consoleHelpers = require('./console');
const loco = require('./helpers');
const appVersion = require('../package.json').version;

/**
 * Process server action
 * @param {object} res response object
 * @param {object} req request object
 * @param {string} reqMethod request method
 * @param {object} functionObject object with all loco functions
 * @param {object} envVars environment variables
 *
 */
const process = (res, req, reqMethod, functionObject, envVars) => {
    const pathName = req._parsedUrl.pathname;
    const functionName = pathName.replace('/', '');
    const query = req.query;
    const bodyJSON = req.body;
    const reqStarTime = new Date();

    // Print request details
    consoleHelpers.printRequestDetails(pathName);

    if (pathName === '/') {
        // Server homepage
        res.send(browserHelpers.printServerHomepage(functionObject, appVersion));
    } else if (pathName === '/favicon.ico') {
        // Favicon - discard
        res.writeHead(200, {'Content-Type': 'image/x-icon'});
        res.end();
    } else if (Object.keys(functionObject).indexOf(functionName) !== -1) {
        // Build param object
        const param = {
            req,
            query,
            bodyJSON,
            reqMethod,
            loco,
            envVars,
        };

        // Run proper processFunction
        functionObject[functionName].processFunction(param).then((response) => {
            const headers = response.headers;
            const body = response.body;
            const statusCode = response.statusCode;

            // Set status code
            res.status(statusCode);

            // Set headers
            if (Object.keys(headers).length) {
                Object.keys(headers).forEach((headerName) => {
                    const headerValue = headers[headerName];
                    res.setHeader(headerName, headerValue);
                });
            }

            // Function present
            const reqEndTime = new Date();
            const requestDuration = reqEndTime.getTime() - reqStarTime.getTime();
            consoleHelpers.printResponseDetails(functionName, query, bodyJSON, reqMethod, requestDuration);

            // Send response
            res.send(body);
        });
    } else {
        // Function not present
        consoleHelpers.printFunctionNotPresent(functionName, functionObject);
        res.status(500);
        const headers = loco.corsHeaders();
        Object.keys(headers).forEach((headerName) => {
            const headerValue = headers[headerName];
            res.setHeader(headerName, headerValue);
        });
        res.send({error: `Requested function name not present.`, requested: functionName, available: Object.keys(functionObject)});
    }
};

// Export
module.exports = {
    process,
};
