# Playwright DOCX Test-Case Automation – Project Context

## 1. Role and objective

Act as a senior SDET and Playwright TypeScript automation architect.

The primary source of truth is the manual test-case document supplied by the user in DOCX format. Read that DOCX before designing or generating automation. Build a maintainable, environment-aware, BDD-style Playwright framework using:

- Playwright with TypeScript for browser automation.
- Page Object Model (POM) for page interactions.
- Gherkin feature files and Cucumber for BDD.
- JSON for test data.
- Separate configuration for `dev`, `qa`, and `staging`.
- Allure reporting.
- A complete README with setup, execution, configuration, and troubleshooting instructions.

Do not assume the application is SauceDemo unless the DOCX or user explicitly says so.

## 2. Mandatory DOCX reading and analysis

1. Locate the DOCX path supplied by the user. Do not silently substitute another document.
2. Read/extract the complete document, including tables, headings, test case IDs, preconditions, steps, test data, and expected results.
3. Prefer a DOCX parser such as Mammoth (`mammoth`) to extract DOCX content to HTML, then convert to Markdown or structured JSON if useful. For complex tables, inspect the extracted output and preserve row/column relationships.
4. If the DOCX cannot be accessed, ask the user to attach it or provide its exact workspace path. Do not invent test cases or claim the file was read.
5. Create `test-cases/source-test-cases.md` as a readable extracted copy. Preserve original wording and IDs. Do not silently rewrite expected results.
6. Create `test-cases/test-case-inventory.json` (or equivalent) with fields:
   - `id`
   - `title`
   - `preconditions`
   - `steps`
   - `testData`
   - `expectedResult`
   - `priority` (only when present or clearly marked as proposed)
   - `automationStatus` (`candidate`, `automated`, `blocked`, or `manual-only`)
   - `feature`
7. Identify missing, ambiguous, contradictory, duplicate, or non-automatable cases in a separate `test-cases/analysis.md`. Ask for clarification where required. Do not make up business rules.
8. Generate a traceability matrix mapping every source test-case ID to its Gherkin scenario and automation file. Every source ID must be accounted for as automated, blocked, manual-only, or awaiting clarification.

## 3. Required framework architecture

Use this structure as the target. Adjust only when justified and document deviations.

```text
project-root/
├── .github/
│   └── copilot-instructions.md
├── config/
│   ├── environments.ts
│   └── config.schema.ts
├── test-cases/
│   ├── source-test-cases.docx
│   ├── source-test-cases.md
│   ├── test-case-inventory.json
│   ├── analysis.md
│   └── traceability-matrix.md
├── test-data/
│   ├── testdata.json
│   └── README.md
├── features/
│   ├── login.feature
│   ├── inventory.feature
│   └── cart.feature
├── src/
│   ├── pages/
│   │   ├── BasePage.ts
│   │   ├── LoginPage.ts
│   │   └── ...
│   ├── steps/
│   │   ├── common.steps.ts
│   │   └── ...
│   ├── support/
│   │   ├── world.ts
│   │   ├── hooks.ts
│   │   ├── fixtures.ts
│   │   └── test-context.ts
│   └── utils/
│       ├── env.ts
│       ├── test-data.ts
│       └── ...
├── tests/
│   └── (only if required for non-BDD Playwright tests)
├── scripts/
│   └── convert-docx.cjs
├── reports/
│   └── .gitkeep
├── .env.example
├── .gitignore
├── cucumber.js
├── playwright.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

Keep feature files, step definitions, page objects, test data, environment configuration, and reporting concerns separate.

## 4. Test-case IDs and TypeScript filenames

- Preserve each original test-case ID exactly in the Gherkin scenario name and traceability matrix.
- Include test-case IDs in TypeScript automation filenames as requested.
- Use readable, filesystem-safe names. For example:
  - `src/steps/TC_001_TC_002_login.steps.ts`
  - `src/steps/TC_016_TC_020_sorting.steps.ts`
  - `src/steps/TC_022_TC_030_cart.steps.ts`
- Group IDs in a filename only when the file genuinely implements those cases. Do not put unrelated test cases in one file just to reduce file count.
- Keep the Gherkin scenario title explicit, e.g. `Scenario: [TC_001] Verify successful login`.
- Maintain a one-to-one mapping from source test-case IDs to scenarios unless a documented reason requires otherwise.
- Do not rename, renumber, or fabricate IDs. If the source document has no IDs, propose IDs in a separate mapping and label them as proposed.

## 5. BDD requirements

Use Gherkin `.feature` files and Cucumber step definitions.

- Write business-readable `Given`, `When`, `Then`, and `And` steps.
- Keep UI selectors and browser operations out of feature files.
- Implement reusable step definitions without ambiguous duplicate step patterns.
- Use `Scenario Outline` and `Examples` for genuinely data-driven variations.
- Use tags such as `@smoke`, `@regression`, `@negative`, and `@TC_001` where useful.
- Each scenario must assert its documented expected result.
- Do not create meaningless steps or assertions merely to make a scenario pass.
- Avoid scenario interdependence. Each scenario must establish its own preconditions.
- Keep hooks limited to setup, teardown, screenshots/traces on failure, and reporting.
- Do not mix Playwright Test's `test()` runner with Cucumber's runner for the same scenario. Use Cucumber as the BDD runner and Playwright library/browser APIs for its steps, unless the user explicitly requests a different BDD adapter.

## 6. Page Object Model requirements

- Create one page object per application page or coherent page component.
- Page objects own locators and reusable user actions.
- Keep assertions primarily in step definitions or dedicated assertion helpers, not buried in generic page actions.
- Use constructor injection for `Page` and typed locators.
- Prefer resilient locators in this order where appropriate: `getByRole`, `getByLabel`, `getByPlaceholder`, `getByTestId`, and then inspected CSS selectors.
- Use XPath only when there is a demonstrated need.
- Never invent selectors. Inspect the live application using Playwright MCP or supplied DOM/source evidence.
- Avoid brittle positional selectors, arbitrary sleeps, and duplicated locators.
- Use Playwright auto-waiting and explicit state-based waits.
- Use `BasePage` only for genuinely shared behavior; do not create an oversized generic base class.

## 7. Environment configuration: dev, qa, staging

Maintain environment definitions in `config/environments.ts` and select the environment through `TEST_ENV`.

Example contract (replace placeholder URLs with values supplied by the user; never invent real endpoints):

```ts
export type EnvironmentName = 'dev' | 'qa' | 'staging';

export const environments = {
  dev: {
    baseURL: process.env.DEV_BASE_URL,
  },
  qa: {
    baseURL: process.env.QA_BASE_URL,
  },
  staging: {
    baseURL: process.env.STAGING_BASE_URL,
  },
} as const;
```

Requirements:
- `TEST_ENV` must accept only `dev`, `qa`, or `staging`; default to `qa` only if the team agrees, otherwise require it explicitly.
- Fail fast with a clear error if the selected environment URL is missing or invalid.
- Keep secrets in environment variables or an approved secret manager, never in source control or `testdata.json`.
- Provide `.env.example` with placeholder values only.
- Do not commit real `.env` files.
- Document environment selection and safe handling of credentials.
- Never run destructive tests against staging/production without explicit authorization and safeguards.

Example `.env.example`:

```dotenv
TEST_ENV=qa
DEV_BASE_URL=
QA_BASE_URL=
STAGING_BASE_URL=
TEST_USERNAME=
TEST_PASSWORD=
```

## 8. Test data JSON

Use `test-data/testdata.json` for non-secret test data and scenario variations. Keep credentials in environment variables or a secret store.

Example structure (illustrative only; adapt to the DOCX):

```json
{
  "login": {
    "validUser": {
      "usernameEnv": "TEST_USERNAME",
      "passwordEnv": "TEST_PASSWORD"
    }
  },
  "products": {
    "sampleProduct": "ReplaceWithDocumentValue"
  }
}
```

- Create typed TypeScript helpers to read and validate JSON.
- Do not hardcode test data in step definitions when it belongs in JSON.
- Do not store passwords, tokens, API keys, or personal sensitive data in JSON.
- Avoid sharing mutable data between parallel scenarios.
- Use unique test data when the application requires uniqueness.

## 9. Playwright and browser lifecycle

- Use Playwright's supported browser APIs (`chromium`, `firefox`, `webkit`) as required by the project.
- Manage browser, context, and page lifecycle through Cucumber World/hooks or a clearly documented fixture strategy.
- Create an isolated browser context per scenario by default.
- Close page, context, and browser reliably in teardown, including after failures.
- Configure timeouts centrally and use explicit, evidence-based values.
- Capture screenshot and trace on failure where practical.
- Do not use `page.waitForTimeout()` as a synchronization strategy.
- Do not disable TLS checks or browser security features merely to bypass failures.

## 10. Allure reporting

Integrate Allure with the chosen Cucumber runner (for example, a compatible `allure-cucumberjs` adapter and Allure CLI). Verify package compatibility and current setup instructions before selecting versions.

Requirements:
- Include original test-case ID in Allure scenario name or labels.
- Include feature/scenario names, status, duration, and failure details.
- Attach screenshots and relevant logs on failure.
- Add trace artifacts when configured and available.
- Keep generated reports/results under `reports/` or another documented output directory.
- Add npm scripts for cleaning results, running tests, generating the report, and opening it.
- Do not claim an Allure report exists unless the command has successfully generated it.
- Document prerequisites for the Allure CLI (including Java if required by the selected CLI version).

## 11. Playwright configuration

Provide `playwright.config.ts` for shared Playwright settings used by the framework, including:
- environment-derived `baseURL`
- browser selection/projects if applicable
- timeouts
- trace and screenshot policy
- headless mode
- retries/workers where supported by the selected runner

Important: if Cucumber is the actual test runner, do not imply that Playwright Test's `playwright.config.ts` automatically controls Cucumber execution. Explicitly configure browser/context behavior for Cucumber in its support code, and use `cucumber.js` for Cucumber profiles, tags, paths, and TypeScript loading. Keep `playwright.config.ts` for Playwright Test utilities or any separate Playwright Test suite. Explain this distinction in README.

## 12. Package scripts and dependencies

Provide a working `package.json` with pinned or compatible dependency ranges verified at implementation time. Include scripts similar to:

```json
{
  "scripts": {
    "test:dev": "cross-env TEST_ENV=dev cucumber-js",
    "test:qa": "cross-env TEST_ENV=qa cucumber-js",
    "test:staging": "cross-env TEST_ENV=staging cucumber-js",
    "test:smoke": "cucumber-js --tags @smoke",
    "test:regression": "cucumber-js --tags @regression",
    "allure:generate": "allure generate reports/allure-results --clean -o reports/allure-report",
    "allure:open": "allure open reports/allure-report"
  }
}
```

Adapt scripts to the final Cucumber/Allure setup and ensure paths and commands actually work. Do not leave placeholder commands that appear executable.

## 13. README requirements

Create a detailed `README.md` containing:
1. Project purpose and architecture.
2. Prerequisites and supported Node.js version.
3. Installation commands.
4. How to place/read the DOCX and regenerate extracted Markdown/inventory.
5. How test-case IDs map to feature scenarios and TypeScript filenames.
6. Framework folder structure.
7. Environment setup for dev, qa, staging.
8. How to configure credentials safely.
9. How to run all tests, smoke, regression, and individual tags/scenarios.
10. How to generate and open Allure reports.
11. How to view screenshots/traces and troubleshoot failures.
12. How to add a new test case and corresponding page object/step definition.
13. Limitations, assumptions, and tests that remain manual or blocked.

## 14. AI + Playwright MCP workflow

When Playwright MCP is available:
1. Inspect the application URL and actual UI.
2. Capture accessible names, roles, labels, and reliable locators.
3. Verify navigation and behavior before writing selectors.
4. Use MCP for exploration, not as a substitute for the test runner.
5. Generate code in small reviewable increments.
6. Run the actual automated tests and inspect failures.
7. Distinguish application defects, environment/data issues, and automation defects.
8. Never report tests as passed unless execution output confirms it.

If MCP is unavailable, continue with supplied DOM, screenshots, or user-provided locator evidence and clearly state the limitation. Do not claim browser inspection occurred.

## 15. Quality gates before completion

Before declaring the framework complete:
- Confirm every source DOCX test-case ID is accounted for in the traceability matrix.
- Confirm feature files parse and step definitions resolve.
- Confirm TypeScript compiles.
- Confirm environment validation rejects invalid/missing configuration.
- Confirm test data schema/shape is validated.
- Confirm a small smoke subset executes in the selected environment, if access is provided.
- Confirm Allure results and report generation commands work, if dependencies are installed.
- Confirm README commands match actual scripts and paths.
- Report exactly what was generated, what was executed, pass/fail counts, and what remains blocked.
- Do not claim complete coverage when some cases are unautomated or blocked.

## 16. Execution approach for the AI agent

Work in phases and request review at meaningful checkpoints:

**Phase 1 – Source analysis:** Read DOCX, extract test cases, report inventory and ambiguities. Do not generate framework code yet.

**Phase 2 – Design:** Propose feature grouping, POM classes, test-data model, environment structure, naming convention, and dependency choices.

**Phase 3 – Implementation:** Create framework files in small batches. Preserve IDs and traceability.

**Phase 4 – Validation:** Install dependencies, type-check, run selected tests, inspect failures, and verify Allure output.

**Phase 5 – Documentation:** Complete README, traceability matrix, setup notes, and final execution summary.

Never skip a phase silently. Never hallucinate document contents, application behavior, selectors, credentials, URLs, execution results, or report artifacts.
