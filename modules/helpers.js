// Includes
const fetch = require('node-fetch');

/**
 * Returns stringified JSON with delay
 * @param {number} sec seconds to delay the response
 * @param {JSON} jsonResponse JSON to return as stringified
 * @returns {string} stringified JSON response
 */
const returnJsonWithDelay = (sec, jsonResponse) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(JSON.stringify(jsonResponse));
        }, sec * 1000);
    });
};

/**
 * CORS response headers
 * @param {object} headersOverwrites headers to overwrite if required
 * @returns {object} cors response headers
 */
const corsHeaders = (headersOverwrites) => {
    let defaultHeaders = {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-type',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    };
    let overwrites = undefined === headersOverwrites ? [] : headersOverwrites;

    // Perform overwrites
    if (Object.keys(overwrites).length) {
        Object.keys(overwrites).forEach((header) => {
            defaultHeaders[header] = overwrites[header];
        });
    }

    return defaultHeaders;
};

/**
 * GET JSON fetch utility function
 * @param {string} url
 * @returns {object} fetch response
 */
const fetchJSON = async (url) => {
    return await (await fetch(url)).json();
};

// Export
module.exports = {
    corsHeaders,
    fetch,
    fetchJSON,
    returnJsonWithDelay,
};
