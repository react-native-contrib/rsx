'use strict';

let path = require('path');
let utils  = require('rsx-common');
let findPlugins = require('./findPlugins');

let unique = utils._.uniq;
let flatten = utils._.flattenDeep;

/**
 * @return {Array} Array of commands
 */
module.exports = function getCommands() {
    let rsxRoot = path.join(__dirname, '..');
    // Check if we're in a project, if not unset `RN_PROJECT_ROOT`
    let appRoot = process.env.RN_PROJECT_ROOT = process.cwd();
    if (!utils.validate.isProject()) {
        process.env.RN_PROJECT_ROOT = '';
    }

    return unique(
        flatten([
            findPlugins([rsxRoot]).map(require),
            findPlugins([appRoot]).map(name => require(path.join(appRoot, 'node_modules', name))),
    ]), 'name');
};
