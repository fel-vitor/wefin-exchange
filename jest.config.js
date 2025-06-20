module.exports = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/dist/",
    "<rootDir>/app/testing/mocks",
  ],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  transformIgnorePatterns: ["/node_modules/(?!flat)/"],
  moduleNameMapper: {
    "^@core/(.*)$": "<rootDir>/src/app/core/$1",
    "^@shared/(.*)$": "<rootDir>/src/app/shared/$1",
    "^@testing/(.*)$": "<rootDir>/src/app/testing/$1",
  },
  coveragePathIgnorePatterns: ["/node_modules/", "/app/testing/"],
};
