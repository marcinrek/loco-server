const chalk = require('chalk');

/**
 * Print intro banner
 * @param {string} appName application name
 * @param {string} appVersion application version
 */
const printIntroBanner = (appName, appVersion) => {
    console.log(`                    o    .  o  .  o .  o  .  o  .  o`);
    console.log(`           o`);
    console.log(`        .       ${chalk.magenta(appName)} v${appVersion}`);
    console.log(`      .        ${chalk.cyan('___')}`);
    console.log(chalk.cyan(`     _n_n_n____i_i ________ ______________ _++++++++++++++_`));
    console.log(chalk.cyan(`  ${chalk.red('*')}>(____________I I______I I____________I I______________I`));
    console.log(`    ${chalk.cyan('/')}${chalk.gray('ooOOOO OOOOoo  oo oooo oo          oo ooo          ooo')}`);
    console.log(`------------------------------------------------------------`);
};

/**
 * Print timestamp fragment
 * @returns {string} timestamp in hh:mm:ss format
 */
const printTimestampDate = () => {
    const ts = new Date();
    const hh = ts.getHours() < 10 ? `0${ts.getHours()}` : ts.getHours();
    const mm = ts.getMinutes() < 10 ? `0${ts.getMinutes()}` : ts.getMinutes();
    const ss = ts.getSeconds() < 10 ? `0${ts.getSeconds()}` : ts.getSeconds();
    return `${hh}:${mm}:${ss}`;
};

/**
 * Print available functions
 * @param {object} functionObject object with all loco functions
 */
const printAvailableFunctions = (functionObject) => {
    console.log(chalk.white('\n##### Available functions #####'));
    if (Object.keys(functionObject).length) {
        Object.keys(functionObject).forEach((functionName, i) => {
            const url = functionObject[functionName].url;
            const desc = functionObject[functionName].description;
            console.log(`# ${chalk.white((i += 1))}. ${chalk.greenBright(url)}`);
            console.log(`# ${chalk.gray(`${desc ? `${desc}` : `${'No description ...'}`}`)}`);
            console.log('#####');
        });
    } else {
        console.log('#', chalk.redBright('No function files available ... this makes no sense.'));
    }
};

/**
 * App listen msg
 * @param {object} config application configuration object
 */
const printListenInfo = (config) => {
    console.log(`# Loco listening on ${chalk.yellow(`http://${config.appHost}:${config.appPort}`)}`);
    console.log('###');
};

/**
 * Print info about request
 * @param {string} pathName requested path name
 */
const printRequestDetails = (pathName) => {
    console.log(`${chalk.yellowBright('⇒')} [${printTimestampDate()}] ${chalk.cyan(pathName)} requested ...`);
};

/**
 * Print info about function response
 * @param {string} functionName name of the function handling the request
 * @param {object} query GET query
 * @param {object} bodyJSON request body
 * @param {string} reqMethod request method
 */
const printResponseDetails = (functionName, query, bodyJSON, reqMethod, requestDuration) => {
    console.log(
        `${chalk.greenBright('⇐')} [${printTimestampDate()}] ${chalk.magenta(reqMethod)} ${chalk.greenBright(functionName)} function processed with query:`,
        query,
        'and body:',
        bodyJSON,
        `in ${chalk.yellow(requestDuration)} msec`,
    );
};

/**
 * Print available env variables
 * @param {object} envVars .env file variables
 * @param {object} config application configuration object
 */
const printEnvVariables = (envVars, config) => {
    console.log(`# Env variables loaded from ${chalk.cyan(config.envFile)}:`, envVars);
    console.log(`# passed to process function as ${chalk.cyan('envVars')} argument`);
    console.log('###');
};

/**
 * Print error when path doesn't match any function
 * @param {string} pathName requested path
 * @param {object} functionObject object with all loco functions
 */
const printFunctionNotPresent = (pathName, functionObject) => {
    console.log(`${chalk.redBright('☈')} [${printTimestampDate()}] Requested function ${chalk.redBright(pathName)} not present. Available functions`, Object.keys(functionObject));
};

/**
 * Print info when no config provided in path
 * @param {object} sampleConfig sample config JSON
 */
const printNoConfigProvided = (sampleConfig) => {
    console.log(chalk.redBright('No config file provided.'));
    console.log(`Please create a ${chalk.cyan('config.json')} file and pass it as an argument.`);
    console.log(`Config file structure:`);
    console.log(sampleConfig);
};

// Export
module.exports = {
    printIntroBanner,
    printAvailableFunctions,
    printListenInfo,
    printRequestDetails,
    printResponseDetails,
    printEnvVariables,
    printFunctionNotPresent,
    printNoConfigProvided,
};
