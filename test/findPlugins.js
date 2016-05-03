jest.autoMockOff();

const path = require('path');
const findPlugins = require('../src/findPlugins');

const pjsonPath = path.join(process.cwd(), 'package.json');
const isArray = (arg) =>
  Object.prototype.toString.call(arg) === '[object Array]';

describe('findPlugins', () => {

  it('should return an array of dependencies', () => {
    jest.setMock(pjsonPath, {
      dependencies: { 'preact-plugin-test': '*' },
    });
    expect(findPlugins([process.cwd()]).length).toBe(1);
    expect(findPlugins([process.cwd()])[0]).toBe('preact-plugin-test');
  });

  it('should return an empty array if no plugins are in this folder', () => {
    jest.setMock(pjsonPath, {});
    expect(findPlugins([process.cwd()]).length).toBe(0);
  });

  it('should return an empty array if no package.json is in the supplied folder', () => {
    expect(isArray(findPlugins(['fake-path']))).toBeTruthy();
    expect(findPlugins(['fake-path']).length).toBe(0);
  });

  it('should return plugins from both dependencies and devDependencies', () => {
    jest.setMock(pjsonPath, {
      dependencies: { 'preact-plugin-test': '*' },
      devDependencies: { 'preact-plugin-test-2': '*' },
    });
    expect(findPlugins([process.cwd()]).length).toEqual(2);
  });

  it('should return a unique list of plugins', () => {
    jest.setMock(pjsonPath, {
      dependencies: { 'preact-plugin-test': '*' },
      devDependencies: { 'preact-plugin-test': '*' },
    });
    expect(findPlugins([process.cwd()]).length).toEqual(1);
  });

});
