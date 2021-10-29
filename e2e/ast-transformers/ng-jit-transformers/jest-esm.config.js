const baseJestCfg = require('./jest.config');

/** @type {import('ts-jest/dist/types').ProjectConfigTsJest} */
module.exports = {
  ...baseJestCfg,
  preset: '<rootDir>/../../../node_modules/ts-jest/presets/default-esm',
  globals: {
    'ts-jest': {
      useESM: true,
      tsconfig: '<rootDir>/../../tsconfig-esm.json',
      stringifyContentPathRegex: '\\.html$',
    },
  },
};
