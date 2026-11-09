import "dotenv/config";

export type EnvironmentName = "dev" | "qa" | "staging";

export interface TestEnvironment {
  name: EnvironmentName;
  baseURL: string;
}

const environmentVariables: Record<EnvironmentName, string> = {
  dev: "DEV_BASE_URL",
  qa: "QA_BASE_URL",
  staging: "STAGING_BASE_URL"
};

export function getEnvironment(): TestEnvironment {
  const name = process.env.TEST_ENV;
  if (name !== "dev" && name !== "qa" && name !== "staging") {
    throw new Error("TEST_ENV must be explicitly set to dev, qa, or staging.");
  }

  const variable = environmentVariables[name];
  const rawURL = process.env[variable];
  if (!rawURL) {
    throw new Error(`${variable} must be set for TEST_ENV=${name}.`);
  }

  let parsedURL: URL;
  try {
    parsedURL = new URL(rawURL);
  } catch {
    throw new Error(`${variable} must contain a valid absolute HTTP(S) URL.`);
  }

  if (parsedURL.protocol !== "https:" && parsedURL.protocol !== "http:") {
    throw new Error(`${variable} must use HTTP or HTTPS.`);
  }

  return { name, baseURL: parsedURL.toString().replace(/\/$/, "") };
}
