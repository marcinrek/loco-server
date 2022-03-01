/**
 * Function description string
 */
const description = 'This is the function description text.';

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
    const jsonData = await loco.fetchJSON('https://api.jokes.one/jod').catch((err) => {
        return {error: err.message};
    });

    return {
        statusCode: 200,
        headers: loco.corsHeaders(),
        body: await loco.returnJsonWithDelay(2, jsonData),
    };
};

// Export
module.exports = {
    processFunction,
    description,
};
