module.exports = {
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      diagnostics: {
        warnOnly: true,
      },
      // diagnostics: false
    },
  },

  //   roots: ['<rootDir>/src'],
  //   transform: {
  //     '^.+\\.tsx?$': 'ts-jest',
  //   },
  //   testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  //   moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
}
