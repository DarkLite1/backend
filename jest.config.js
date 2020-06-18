module.exports = {
  // roots: ['./src'],
  preset: 'ts-jest',
  globalSetup: './src/test-utils/config/globalSetup.ts',
  globalTeardown: './src/test-utils/config/globalTeardown.ts',
  setupFiles: ['./src/test-utils/config/setupFiles.ts'],
  moduleDirectories: ['node_modules', 'src'],
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
