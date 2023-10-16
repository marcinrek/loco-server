// Includes
const fetch = require('node-fetch');
const chalk = require('chalk');

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
 * @param {string} url request url
 * @param {object} options request options
 * @returns {object} fetch response
 */
const fetchJSON = async (url, options = {}) => {
    return await (await fetch(url, options)).json();
};

/**
 * Require module without cache
 * @param {string} module module to clear cache for adn then require
 * @returns {object} required module
 */
const requireUncached = (module) => {
    delete require.cache[require.resolve(module)];
    return require(module);
};

// Export
module.exports = {
    corsHeaders,
    fetch,
    fetchJSON,
    returnJsonWithDelay,
    requireUncached,
    chalk,
};
