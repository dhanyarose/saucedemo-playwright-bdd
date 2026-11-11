import testData from "../../test-data/testdata.json";

type UserKind = "locked" | "problem" | "performance" | "error" | "visual";

export function getPassword(): string {
  const password = process.env[testData.login.passwordEnv];
  if (!password) {
    throw new Error(`${testData.login.passwordEnv} must be set to run authenticated scenarios.`);
  }
  return password;
}

export function getLoginData() {
  return {
    ...testData.login,
    validUser: testData.login.validUsername,
    lockedOutUser: testData.login.lockedUser,
    invalidUser: testData.login.invalidUsername
  };
}

export function getUserName(kind: UserKind): string {
  const users: Record<UserKind, string> = {
    locked: testData.login.lockedUser,
    problem: testData.login.problemUser,
    performance: testData.login.performanceUser,
    error: testData.login.errorUser,
    visual: testData.login.visualUser
  };
  return users[kind];
}

export function getInvalidLoginData() {
  return {
    username: testData.login.invalidUsername,
    password: testData.login.invalidPassword
  };
}

export function getProductData() {
  return testData.products;
}

export function getCheckoutData() {
  return testData.checkout;
}
