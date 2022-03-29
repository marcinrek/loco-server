/**
 * Function description string
 */
const description = 'Blank function scaffold.';

/**
 * Main process function
 * @param {object} query GET request query
 * @param {object} bodyJSON POST request body
 * @param {string} reqMethod request method
 * @param {object} loco helper functions object
 * @param {object} envVars environment variables
 * @returns {object} response object consisting of response statusCode, body and headers object
 */
// eslint-disable-next-line no-unused-vars
const processFunction = async (query, bodyJSON, reqMethod, loco, envVars) => {
    return {
        statusCode: 200,
        headers: loco.corsHeaders(),
        body: {mockup: true},
    };
};

// Export
module.exports = {
    processFunction,
    description,
};
