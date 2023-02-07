export default {
  moduleFileExtensions: ['js', 'json', 'ts'],
  moduleNameMapper: {
    '@/domain/(.*)': '<rootDir>/domain/$1',
    '@/presentation/(.*)': '<rootDir>/presentation/$1',
    '@/infra/(.*)': '<rootDir>/infra/$1',
    '@/use-cases/(.*)': '<rootDir>/use-cases/$1',
    '@/shared/(.*)': '<rootDir>/shared/$1',
  },
  rootDir: 'src',
  testRegex: '.*\\.(spec)\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
};
