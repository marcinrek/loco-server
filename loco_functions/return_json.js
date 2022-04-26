/**
 * Function description string
 */
const description = 'This is the function description text.';

/**
 * Main process function
 * @param {object} param.req entire request object
 * @param {object} param.query GET request query
 * @param {object} param.bodyJSON POST request body
 * @param {string} param.reqMethod request method
 * @param {object} param.loco helper functions object
 * @param {object} param.envVars environment variables
 * @returns {object} response object consisting of response statusCode, body and headers object
 */
// eslint-disable-next-line no-unused-vars
const processFunction = async (param) => {
    const jsonData = await param.loco.fetchJSON('https://api.jokes.one/jod').catch((err) => {
        return {error: err.message};
    });

    return {
        statusCode: 200,
        headers: param.loco.corsHeaders(),
        body: await param.loco.returnJsonWithDelay(2, jsonData),
    };
};

// Export
module.exports = {
    processFunction,
    description,
};
