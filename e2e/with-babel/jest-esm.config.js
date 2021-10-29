const baseJestCfg = require('./jest.config');

/** @type {import('ts-jest/dist/types').ProjectConfigTsJest} */
module.exports = {
  ...baseJestCfg,
  preset: '<rootDir>/../../node_modules/ts-jest/presets/js-with-babel-esm',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/../tsconfig-esm.json',
      babelConfig: true,
    },
  },
};
