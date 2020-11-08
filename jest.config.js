module.exports = {
  roots: [
    '<rootDir>/src',
  ],
  testMatch: [
    '**/__tests__/?(*.)+(test).+(ts|js)',
  ],
  transform: {
    '^.+\\.(ts|js)$': 'ts-jest',
  },
  moduleFileExtensions: [
    'ts',
    'js',
  ],
  collectCoverageFrom: [
    'src/**/*.ts',
    'src/*.ts',
  ],
  collectCoverage: true,
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  coveragePathIgnorePatterns: [
    '<rootDir>/src/errorsGenerators.ts',
  ],
};
