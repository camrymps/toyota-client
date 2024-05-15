import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  moduleNameMapper: {
    "(.+)\\.js": "$1",
  },
  extensionsToTreatAsEsm: [".ts"]
};

export default config;
