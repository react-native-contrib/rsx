'use strict';

let path = require('path');
let expect = require('chai').expect;
let getCommands = require('../src/getCommands');
let mock = require('mock-require');
let mockFs = require('mock-fs');
let sinon = require('sinon');
let rewire = require('rewire');

let commands = require('./fixtures/commands');

/**
 * Paths to two possible `node_modules` locations RSX can be installed
 */
const LOCAL_NODE_MODULES = path.join(process.cwd(), 'node_modules');
const GLOBAL_NODE_MODULES = '/usr/local/lib/node_modules';

/**
 * Paths to `package.json` of project, and RSX - in two installation locations
 */
const APP_JSON = path.join(process.cwd(), 'package.json');
const GLOBAL_RSX_PJSON = path.join(GLOBAL_NODE_MODULES, '/rsx/package.json');
const LOCAL_RSX_PJSON = path.join(LOCAL_NODE_MODULES, 'rsx/package.json');

/**
 * Sample RSX plugin used in test cases
 */
const SAMPLE_RSX_PLUGIN = 'rsx-plugin-test';

/**
 * Sample `package.json` of RSX that will be used in test cases
 */
const SAMPLE_RSX_JSON = {
  dependencies: {
    [SAMPLE_RSX_PLUGIN]: '*',
  },
};

/**
 * Project without RSX plugins defined
 */
const NO_PLUGINS_JSON = {
  dependencies: {},
};

describe('getCommands', () => {

  afterEach(mock.stopAll);

  describe('in all installations', () => {

    var getCommands;
    var revert;

    before(() => {
      getCommands = rewire('../src/getCommands');
      revert = getCommands.__set__({__dirname: path.join(LOCAL_NODE_MODULES, 'rsx/src')});
    });

    /**
     * In this suite we only test RSX package.json, thus we make sure
     * that project json on `process.cwd()` is properly mocked.
     */
    beforeEach(() => {
      mock(APP_JSON, NO_PLUGINS_JSON);
    });

    after(() => revert());

    it('list of the commands should be a non-empty array', () => {
      mock(LOCAL_RSX_PJSON, SAMPLE_RSX_JSON);
      mock(SAMPLE_RSX_PLUGIN, commands.single);

      expect(getCommands()).to.be.not.empty;
      expect(getCommands()).to.be.an('array');
    });

    it('should export one command', () => {
      mock(LOCAL_RSX_PJSON, SAMPLE_RSX_JSON);
      mock(SAMPLE_RSX_PLUGIN, commands.single);

      expect(getCommands().length).to.be.equal(1);
    });

    it('should export multiple commands', () => {
      mock(LOCAL_RSX_PJSON, SAMPLE_RSX_JSON);
      mock(SAMPLE_RSX_PLUGIN, commands.multiple);

      expect(getCommands().length).to.be.equal(2);
    });

    it('should export unique list of commands by name', () => {
      mock(LOCAL_RSX_PJSON, {
        dependencies: {
          [SAMPLE_RSX_PLUGIN]: '*',
          [`${SAMPLE_RSX_PLUGIN}-2`]: '*',
        },
      });

      mock(SAMPLE_RSX_PLUGIN, commands.single);
      mock(`${SAMPLE_RSX_PLUGIN}-2`, commands.single);

      expect(getCommands().length).to.be.equal(1);
    });

  });

  describe('project plugins', () => {

    var getCommands;
    var revert;

    before(() => {
      getCommands = rewire('../src/getCommands');
    });

    /**
     * In this test suite we only test project plugins thus we make sure
     * RSX `package.json` is properly mocked.
     */
    beforeEach(() => {
      mock(LOCAL_RSX_PJSON, NO_PLUGINS_JSON);
      mock(GLOBAL_RSX_PJSON, NO_PLUGINS_JSON);
    });

    afterEach(() => revert());

    it('shoud load when installed locally', () => {
      revert = getCommands.__set__({__dirname: path.join(LOCAL_NODE_MODULES, 'rsx/src')});

      mock(APP_JSON, SAMPLE_RSX_JSON);
      mock(
        path.join(LOCAL_NODE_MODULES, SAMPLE_RSX_PLUGIN),
        commands.single
      );

      expect(getCommands()[0]).to.be.equal(commands.single);
    });

    it('should load when installed globally', () => {
      revert = getCommands.__set__({__dirname: path.join(GLOBAL_NODE_MODULES, 'rsx/src')});

      mock(APP_JSON, SAMPLE_RSX_JSON);
      mock(
        path.join(LOCAL_NODE_MODULES, SAMPLE_RSX_PLUGIN),
        commands.single
      );

      expect(getCommands()[0]).to.be.equal(commands.single);
    });

  });

  describe('rsx and project plugins', () => {

    var getCommands;
    var revert;

    before(() => {
      getCommands = rewire('../src/getCommands');
      revert = getCommands.__set__({__dirname: path.join(LOCAL_NODE_MODULES, 'rsx/src')});
    });

    after(() => revert());

    it('should load concatenated list of plugins', () => {
      mock(APP_JSON, SAMPLE_RSX_JSON);
      mock(LOCAL_RSX_PJSON, {
        dependencies: {
          [`${SAMPLE_RSX_PLUGIN}-2`]: '*',
        },
      });

      mock(
        path.join(LOCAL_NODE_MODULES, SAMPLE_RSX_PLUGIN),
        commands.multiple
      );
      mock(`${SAMPLE_RSX_PLUGIN}-2`, commands.single);

      expect(getCommands().length).to.be.equal(3);
    });

  });

});
