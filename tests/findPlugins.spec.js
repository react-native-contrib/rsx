'use strict';

let chai = require('chai');
let mock = require('mock-require');
let path = require('path');

let expect = chai.expect;

let findPlugins = require('../src/findPlugins');

let pjsonPath = path.join(process.cwd(), 'package.json');

describe('findPlugins', () => {

    it('should return an array of dependencies', () => {
        mock(pjsonPath, {
            dependencies: { 'rsx-plugin-test': '*' },
        });
        expect(findPlugins([process.cwd()])).to.be.an('array');
    });

    it('should return an empty array if there\'re no plugins in this folder', () => {
        mock(pjsonPath, {});
        expect(findPlugins([process.cwd()])).to.be.empty;
    });

    it('should return an empty array if there\'s no package.json in the supplied folder', () => {
        expect(findPlugins(['fake-path'])).to.be.an('array');
        expect(findPlugins(['fake-path'])).to.be.empty;
    });

    it('should return plugins from both dependencies and dev dependencies', () => {
        mock(pjsonPath, {
            dependencies: { 'rsx-plugin-test': '*' },
            devDependencies: { 'rsx-plugin-test-2': '*' },
        });
        expect(findPlugins([process.cwd()]).length).to.equals(2);
    });

    it('should return unique list of plugins', () => {
        mock(pjsonPath, {
            dependencies: { 'rsx-plugin-test': '*' },
            devDependencies: { 'rsx-plugin-test': '*' },
        });
        expect(findPlugins([process.cwd()]).length).to.equals(1);
    });

    afterEach(mock.stopAll);

});
