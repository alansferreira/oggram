module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testRegex: '.spec\\.(ts|js)x?$',
  coverageDirectory: 'coverage',
  modulePathIgnorePatterns: ['src/mocks'],
  coveragePathIgnorePatterns: ['src/mocks']
}
