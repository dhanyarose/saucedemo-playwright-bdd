import testData from "../../test-data/testdata.json";

export function getPassword(): string {
  const password = process.env[testData.login.passwordEnv];
  if (!password) {
    throw new Error(`${testData.login.passwordEnv} must be set to run authenticated scenarios.`);
  }
  return password;
}

export function getLoginData() {
  return testData.login;
}

export function getProductData() {
  return testData.products;
}
