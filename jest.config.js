const { pathsToModuleNameMapper } = require('ts-jest/utils')
const { compilerOptions } = require('./tsconfig')

module.exports = {
  roots: ['<rootDir>'],
  preset: 'ts-jest',
  testEnvironment: 'node',
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
