# SauceDemo Playwright BDD

Cucumber runs Gherkin scenarios, Playwright drives Chromium, page objects hold UI interactions, and JSON keeps non-secret test data separate. The supplied cases are in `testcases/`; the generated inventory and case-to-scenario mapping are in `test-cases/`.

## Prerequisites and setup

- Node.js 22.12 or newer and npm.
- Java is required by the Allure command-line report generator.
- From the project root:

```powershell
npm install
npx playwright install chromium
Copy-Item .env.example .env
```

Set `TEST_ENV` to `dev`, `qa`, or `staging`, and set the matching `*_BASE_URL`. The supplied cases explicitly name `https://www.saucedemo.com` as their precondition; `.env.example` uses it for `QA_BASE_URL`. Set `TEST_PASSWORD` to the demo password from the source test cases. Do not commit `.env` or put credentials in test-data JSON.

The runner requires an explicit environment selection and URL and fails immediately if either is missing or invalid. Avoid running state-changing tests against production or shared staging environments without authorization.

## Framework layout

```text
config/                 Environment validation
features/               Login, inventory, and cart Gherkin scenarios
src/pages/              Page objects and observed UI locators
src/steps/              Cucumber step definitions
src/support/            Per-scenario browser lifecycle and failure artifacts
src/utils/              Typed test-data access
test-data/              Non-secret JSON data
testcases/              Supplied source test-case files
test-cases/              Extracted text, inventory, analysis, traceability
scripts/                 Source-case importer
reports/                 Allure results and failure traces (generated)
```

`playwright.config.ts` is provided for future Playwright Test utilities; Cucumber is the active runner and does not consume that config. Cucumber browser lifecycle, headless mode, and tracing are configured in `cucumber.js` and `src/support/hooks.ts`.

## Source cases and traceability

The files named `loginTestcases.docx` and `saucedemo.docx` currently contain tab-delimited UTF-8 text rather than binary DOCX documents. `npm run test:inventory` exports their text to `test-cases/*.md` and regenerates the JSON inventory, analysis, and traceability matrix. The exported text redacts the shared test password; original input files are excluded from Git. The importer refuses binary DOCX input instead of silently corrupting tables; convert genuine Word documents to the same tab-delimited source format before using this importer.

Every source ID is present in `test-cases/traceability-matrix.md`. The matrix distinguishes automated scenarios from candidates, blocked cases, and cases that require capabilities outside this Chromium desktop suite. Candidate status does not mean a test is implemented or passed.

## Running tests

Install the browser once with `npx playwright install chromium`, then configure `.env`.

```powershell
npm test
npm run test:smoke
npm run test:regression
npm run test:qa
npm run test:headed
npx cucumber-js --tags "@TC_FN_01"
```

`test:headed` launches a visible Chromium browser (rather than the headless default). `test:dev`, `test:qa`, and `test:staging` select those environments explicitly; the corresponding URL must still be configured. Scenario tags preserve source IDs, so individual cases can be selected with `--tags "@TC_001"`.

## Reports and failures

The Cucumber Allure formatter writes results to `reports/allure-results`. Generate and open the HTML report with:

```powershell
npm run allure:generate
npm run allure:open
```

Allure results require a successful test run; the report generator requires Java. On failure, Cucumber attaches a screenshot and stores a Playwright trace under `reports/traces/`. Open a trace with `npx playwright show-trace reports/traces/<scenario>.zip`. Generated reports and traces are ignored by Git.

## Adding a test case

1. Add the source case and keep its original ID.
2. Add a Gherkin scenario with `[TC_ID]` in its name and `@TC_ID` tag.
3. Reuse or extend the relevant page object and step definitions; do not put selectors in feature files.
4. Run `npm run test:inventory` to refresh inventory and traceability.
5. Run the tagged scenario, then `npm run typecheck`.

## Current coverage and limitations

The current features automate the core login, logout, protected-route, inventory ordering, and cart journeys. The generated matrix lists all source IDs and their current status. Accessibility, mobile/cross-browser compatibility, visual inspection, actual password-manager behavior, and network throttling are not claimed as automated. Cases with undefined acceptance criteria are marked blocked for clarification.

The supplied source lists the shared SauceDemo demo credential. The username and product data are stored in JSON; the password is read only from `TEST_PASSWORD`.
