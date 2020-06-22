const { pathsToModuleNameMapper } = require('ts-jest/utils')
const { compilerOptions } = require('./tsconfig')

module.exports = {
  roots: ['<rootDir>'],
  preset: 'ts-jest',
  globalSetup: '<rootDir>/src/test-utils/config/globalSetup.ts',
  globalTeardown: '<rootDir>/src/test-utils/config/globalTeardown.ts',
  setupFiles: ['<rootDir>/src/test-utils/config/setupFiles.ts'],
  setupFilesAfterEnv: ['<rootDir>/src/test-utils/config/setupFilesAfterEnv.ts'],
  modulePaths: ['<rootDir>'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json',
      // tsConfig: false,
      // diagnostics: false
      diagnostics: {
        warnOnly: true,
      },
    },
  },
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
}
