# Loco
Loco is a http proxy and/or mockup server.

## Features
* forward a request using node-fetch
* mock API response
* supports using .env variables

## Changelog
- 3.1.0
    - add multer middleware for multipart/form-data support 
- 3.0.0
    - change process function to only have one parameter now called 'param'.
    - change config _functionsPath_ to be an array of glob entries instead of just one
- 2.0.0
    - add live reload for function files
    - additional loco helper - loco.requireUncached('path');
    - additional loco helper - loco.chalk;
    - config _functionsDir_ replace with _functionsPath_ which is a glob
- 1.1.1
    - fix loco.corsHeaders() error when no headersOverwrites provided
- 1.1.0
    - pass reqMethod to processFunction to distinguish type of request if required
    - add OPTIONS request support
    - enable ovewriting headers in loco.corsHeaders() helper

## Installation
```
npm install -sD loco-server
```

## Usage
Straight from the command line:
```
npx loco <config_file>
```
or if used in package.json scripts:
```
loco <config_file>
```

## Configuration
Sample config file:
```
{
  "appPort": 8888,
  "appHost": "127.0.0.1",
  "functionsPath": ["loco_functions/*.js"],
  "envFile": ".env"
  "optionsRequestHeaders": {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "*"
  },
  "optionsRequestStatusCode": 200
}
```

| Field | Description |
|---|---|
| appPort | Port to run the server on |
| appHost | Host to run the server on |
| functionsPath | Glob to where to look for loco functions |
| envFile | .env file name with path |
| optionsRequestHeaders | Response headers for OPTIONS request |
| optionsRequestStatusCode | OPTIONS request status code |

## Functions 
Functions are understood as JS files specified by _functionsPath_ in the configuration. Each file will be served under a separate webpath in the server. This webpath is equal to the file namie without _.js_ extension. 

Function file scaffold:
```
/**
 * Function description string
 */
const description = 'Blank function scaffold.';

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
const processFunction = async (param) => {
    return {
        statusCode: 200,
        headers: param.loco.corsHeaders(),
        body: {mockup: true}
    };
};

// Export
module.exports = {
    processFunction,
    description,
};

```

The _descriptions_ const is used for providing a short summary of a given function.
Main required function in each function file is the _processFunction_. 
It has one parameter called param which is an object containing:
| Argument | Descriptions |
|---|---|
| req | full express request object |
| query | GET query requested represented as JSON, example:  ```{"query":"test"}``` |
| bodyJSON | POST body requested as as JSON, example: ```{"login":"john"}``` |
| reqMethod | Request method as a string, example: ```GET```|
| loco | object containing predefined helper function, described below in the function helpers section|
| envVars | environment variables from the .env file defined in the config |

The function must return an object with a given structure:
```
{
    statusCode: 200,
    headers: param.loco.corsHeaders(),
    body: {mockup: true}
}
```
| Key| Value |
|---|---|
| statusCode | response status code |
| headers | object containig response header as key and header value as value |
| body | response body |

## Function helpers
Current list of helpers passed as a _param.loco_ argument to the _processFunction_
* ```param.loco.fetch()``` - node-fetch module
* ```param.loco.returnJsonWithDelay(sec, jsonResponse)``` - usefull when a mocked response is return to fake a time delay. Example usage:
```
return {
    [...]
    body: await loco.returnJsonWithDelay(3, jsonData),
};
```
this will return _jsonData_ after 3 seconds.
* ```loco.corsHeaders(headersOverwrites)``` - returns headers that can be used when you want to enable cors: 
```
{
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-type',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
}
```
Example usage:
```
return {
    [...]
    headers: param.loco.corsHeaders(),
    [...]
};
```
You can also overwrite a default header or add a new one:
```
headers: param.loco.corsHeaders({"Content-Type": "text/html; charset=utf-8"}),
```
* ```loco.fetchJSON(url)``` - utility function to make a fetch request to an endpoint that returns JSON response. Example usage:
```
const jsonData = await param.loco.fetchJSON('https://api.url/').catch((err) => {
    return {error: err.message};
});
[...]
return {
    [...]
    body: jsonData,
};
```
* ```param.loco.requireUncached(path)``` - clear cache for _path_ and then require. Usefull when you modify data in processFunction often.

