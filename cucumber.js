module.exports = {
  default: {
    paths: ["features/**/*.feature"],
    requireModule: ["ts-node/register"],
    require: ["src/support/**/*.ts", "src/steps/**/*.ts"],
    format: ["progress", "allure-cucumberjs/reporter"],
    formatOptions: {
      resultsDir: "reports/allure-results"
    },
    publishQuiet: true,
    parallel: 1
  }
};
