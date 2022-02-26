const fs = require('fs');

/**
 * Build object with all loco functions
 * @param {object} config application configuration object
 * @param {string} cwd current directory path
 * @returns {object} loco functions object
 */
const buildFunctionsObject = (config, cwd) => {
    const functionsObject = {};
    const functionFiles = fs
        .readdirSync(`${cwd}/${config.functionsDir}`, config.readdirSyncOptions)
        .filter((filename) => /\.js$/.test(filename))
        .map((file) => {
            return file.replace(/\.js$/g, '');
        });

    functionFiles.forEach((functionName) => {
        functionsObject[functionName] = require(`${cwd}/${config.functionsDir}/${functionName}.js`);
        functionsObject[functionName].url = `http://${config.appHost}:${config.appPort}/${functionName}`;
    });

    return functionsObject;
};

/**
 * Remove system variables from dotenv variables
 * @param {object} sysEnvVars system env variables
 * @param {object} dotEnvVars dotenv env variables
 * @returns {object} variables from .env file
 */
const sanitizeEnvObj = (sysEnvVars, dotEnvVars) => {
    let sanitizedObj = Object.assign({}, dotEnvVars);

    Object.keys(sysEnvVars).forEach((key) => {
        delete sanitizedObj[key];
    });

    return sanitizedObj;
};

// Export
module.exports = {
    buildFunctionsObject,
    sanitizeEnvObj,
};
