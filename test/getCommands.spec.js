jest.autoMockOff();

const path = require('path');
const mock = require('mock-require');
const rewire = require('rewire');

const commands = require('./fixtures/commands');
const isArray = (arg) =>
  Object.prototype.toString.call(arg) === '[object Array]';

/**
 * Paths to two possible `node_modules` locations `preact` can be installed
 */
const LOCAL_NODE_MODULES = path.join(process.cwd(), 'node_modules');
const GLOBAL_NODE_MODULES = '/usr/local/lib/node_modules';

/**
 * Paths to `package.json` of project, and preact - in two installation locations
 */
const APP_JSON = path.join(process.cwd(), 'package.json');
const GLOBAL_PREACT_PJSON = path.join(GLOBAL_NODE_MODULES, 'preact', 'package.json');
const LOCAL_PREACT_PJSON = path.join(LOCAL_NODE_MODULES, 'preact', 'package.json');

/**
 * Sample `preact` plugin used in test cases
 */
const SAMPLE_PREACT_PLUGIN = 'preact-plugin-test';

/**
 * Sample `package.json` of Preact that will be used in test cases
 */
const SAMPLE_PREACT_JSON = {
  dependencies: {
    [SAMPLE_PREACT_PLUGIN]: '*',
  },
};

/**
 * Project without `preact` plugins defined
 */
const NO_PLUGINS_JSON = {
  dependencies: {},
};

const getCommands = rewire('../src/getCommands');
var revert;

describe('getCommands', () => {

  afterEach(mock.stopAll);

  describe('in all installations', () => {

    beforeEach(() => {
      revert = getCommands.__set__({
        __dirname: path.join(LOCAL_NODE_MODULES, 'preact/src'),
      });
      mock(APP_JSON, NO_PLUGINS_JSON);
    });

    afterEach(() => revert());

    it('list of the commands should be a non-empty array', () => {
      mock(APP_JSON, NO_PLUGINS_JSON);
      mock(LOCAL_PREACT_PJSON, SAMPLE_PREACT_JSON);
      mock(SAMPLE_PREACT_PLUGIN, commands.single);

      expect(getCommands().length).not.toBe(0);
      expect(isArray(getCommands())).toBeTruthy();
    });

    it('should export one command', () => {
      mock(LOCAL_PREACT_PJSON, SAMPLE_PREACT_JSON);
      mock(SAMPLE_PREACT_PLUGIN, commands.single);

      expect(getCommands().length).toEqual(1);
    });

    it('should export multiple commands', () => {
      mock(LOCAL_PREACT_PJSON, SAMPLE_PREACT_JSON);
      mock(SAMPLE_PREACT_PLUGIN, commands.multiple);

      expect(getCommands().length).toEqual(2);
    });

    it('should export unique list of commands by name', () => {
      mock(LOCAL_PREACT_PJSON, {
        dependencies: {
          [SAMPLE_PREACT_PLUGIN]: '*',
          [`${SAMPLE_PREACT_PLUGIN}-2`]: '*',
        },
      });

      mock(SAMPLE_PREACT_PLUGIN, commands.single);
      mock(`${SAMPLE_PREACT_PLUGIN}-2`, commands.single);

      expect(getCommands().length).toEqual(1);
    });

  });

  describe('project plugins', () => {
    /**
     * In this test suite we only test project plugins thus we make sure
     * `preact` package.json is properly mocked
     */
    beforeEach(() => {
      mock(LOCAL_PREACT_PJSON, NO_PLUGINS_JSON);
      mock(GLOBAL_PREACT_PJSON, NO_PLUGINS_JSON);
    });

    afterEach(() => revert());

    it('shoud load when installed locally', () => {
      revert = getCommands.__set__({
        __dirname: path.join(LOCAL_NODE_MODULES, 'preact/src'),
      });

      mock(APP_JSON, SAMPLE_PREACT_JSON);
      mock(
        path.join(LOCAL_NODE_MODULES, SAMPLE_PREACT_PLUGIN),
        commands.single
      );

      expect(getCommands()[0]).toEqual(commands.single);
    });

    it('should load when installed globally', () => {
      revert = getCommands.__set__({
        __dirname: path.join(GLOBAL_NODE_MODULES, 'preact/src'),
      });

      mock(APP_JSON, SAMPLE_PREACT_JSON);
      mock(
        path.join(LOCAL_NODE_MODULES, SAMPLE_PREACT_PLUGIN),
        commands.single
      );

      expect(getCommands()[0]).toEqual(commands.single);
    });

  });

  describe('preact and project plugins', () => {

    beforeEach(() => {
      revert = getCommands.__set__({
        __dirname: path.join(LOCAL_NODE_MODULES, 'preact/src'),
      });
    });

    afterEach(() => revert());

    it('should load concatenated list of plugins', () => {
      mock(APP_JSON, SAMPLE_PREACT_JSON);
      mock(LOCAL_PREACT_PJSON, {
        dependencies: {
          [`${SAMPLE_PREACT_PLUGIN}-2`]: '*',
        },
      });

      mock(
        path.join(LOCAL_NODE_MODULES, SAMPLE_PREACT_PLUGIN),
        commands.multiple
      );
      mock(`${SAMPLE_PREACT_PLUGIN}-2`, commands.single);

      expect(getCommands().length).toEqual(3);
    });
  });
});
