/**
 * Markup to be printend on server homepage access
 * @param {object} functionObject object with all loco functions
 * @param {string} appVersion application version
 * @returns {string} homepage markup
 */
const printServerHomepage = (functionObject, appVersion) => {
    let markup = '<div style="font-size: 16px;">';
    markup += `<h1 style="font-size: 16px;">Loco v${appVersion}</h1>`;

    if (Object.keys(functionObject).length) {
        markup += `<ol>`;
        Object.keys(functionObject).forEach((functionName) => {
            const url = functionObject[functionName].url;
            const desc = functionObject[functionName].description;
            markup += `<li><a href="${url}" style="">${url}</a> <pre style="font-size: 12px;">${desc ? `${desc}` : 'No description ...'}</pre></li>`;
        });
        markup += `</ol>`;
    } else {
        markup += '<h2 style="font-size: 12px; color: #ff0000;">No function files available ... this makes no sense.</h2>';
    }

    markup += '</div>';

    return markup;
};

// Export
module.exports = {
    printServerHomepage,
};
