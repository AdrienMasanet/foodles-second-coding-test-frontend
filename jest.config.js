const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const customJestConfig = {
  moduleNameMapper: {
    "^@/mocks/(.*)$": "<rootDir>/__mocks__/$1",
    "^@/components/(.*)$": "<rootDir>/components/$1",
    "^@/context/(.*)$": "<rootDir>/context/$1",
    "^@/hooks/(.*)$": "<rootDir>/hooks/$1",
    "^@/pages/(.*)$": "<rootDir>/pages/$1",
    "^@/services/(.*)$": "<rootDir>/services/$1",
  },
  testEnvironment: "jest-environment-jsdom",
  collectCoverage: true,
  collectCoverageFrom: ["components/**/*.{js,jsx,ts,tsx}", "context/**/*.{js,jsx,ts,tsx}", "hooks/**/*.{js,jsx,ts,tsx}", "pages/**/*.{js,jsx,ts,tsx}", "services/**/*.{js,jsx,ts,tsx}"],
};

module.exports = createJestConfig(customJestConfig);
