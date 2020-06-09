module.exports = {
  preset: 'ts-jest',
  globalSetup: './tests/config/globalSetup.ts',
  globalTeardown: './tests/config/globalTeardown.ts',
  globals: {
    'ts-jest': {
      // tsConfig: 'tsconfig.json',
      // tsConfig: false,
      // diagnostics: false
      diagnostics: {
        warnOnly: true,
      },
    },
  },

  //   roots: ['<rootDir>/src'],
  //   transform: {
  //     '^.+\\.tsx?$': 'ts-jest',
  //   },
  //   testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  //   moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
}
