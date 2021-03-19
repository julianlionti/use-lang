module.exports = {
  roots: ['<rootDir>/src'],

  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },

  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',

  // Module file extensions for importing
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'node'],
}
