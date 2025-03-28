const glob = require('glob');

/**
 * Build object with all loco functions
 * @param {object} config application configuration object
 * @param {string} cwd current directory path
 * @returns {object} loco functions object
 */
const buildFunctionsObject = (config, cwd) => {
    const functionsObject = {};

    // Loop each glob
    config.functionsPath.forEach((globPath) => {
        glob.sync(globPath, {}).forEach((functionFilePath) => {
            const functionName = functionFilePath.replace(/.*\//g, '').replace(/\.(js|cjs)$/g, '');
            const functionNameAbsPath = `${cwd}/${functionFilePath.replace('./', '')}`;
            delete require.cache[require.resolve(functionNameAbsPath)];
            functionsObject[functionName] = require(functionNameAbsPath);
            functionsObject[functionName].url = `http://${config.appHost}:${config.appPort}/${functionName}`;
        });
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
