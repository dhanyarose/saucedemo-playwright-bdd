# SauceDemo Playwright BDD

Cucumber runs Gherkin scenarios, Playwright drives Chromium, page objects hold UI interactions, and JSON keeps non-secret test data separate. Source test cases and their generated inventory and case-to-scenario mapping are kept together in `test-cases/`.

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
features/               Original and end-to-end login, inventory, cart, checkout, order, and session scenarios
src/pages/              Page objects and observed UI locators
src/steps/              Cucumber step definitions
src/support/            Per-scenario browser lifecycle and failure artifacts
src/utils/              Typed test-data access
test-data/              Non-secret JSON data
test-cases/              Source test-case files, extracted text, inventory, analysis, traceability
scripts/                 Source-case importer
reports/                 Allure results and failure traces (generated)
```

`playwright.config.ts` is provided for future Playwright Test utilities; Cucumber is the active runner and does not consume that config. Cucumber browser lifecycle, headless mode, and tracing are configured in `cucumber.js` and `src/support/hooks.ts`.

## Source cases and traceability

The current end-to-end source is `test-cases/TestcasesEndToEnd.docx`. It contains 50 SauceDemo cases covering login, inventory, cart, checkout, order completion, and sessions. The file is UTF-8 tab-delimited text with a `.docx` extension, not a binary Word document. Test data is in `test-data/testdata.json`; the password is read from `TEST_PASSWORD`, not stored in JSON.

The new Gherkin files are `features/e2e-*.feature`; their ID-specific step definitions are under `src/steps/TC_*.steps.ts`, with checkout and order page objects under `src/pages/`. Run `npm run test:end-to-end:inventory` to regenerate the extracted source, inventory, analysis, and traceability matrix after updating the sheet. See `test-cases/traceability-matrix.md` for every source ID and its implementation status. Cases with undefined acceptance criteria, missing boundary limits, or app behavior that conflicts with the expected result are marked blocked or manual-only rather than reported as passing.

## Running tests

Install the browser once with `npx playwright install chromium`, then configure `.env`.

```powershell
npm test
npm run test:smoke
npm run test:regression
npm run test:qa
npm run test:headed
npm run test:end-to-end
npm run test:end-to-end:headed
npm run test:end-to-end:smoke
npx cucumber-js --tags "@TC-LOGIN-002"
```

`test:headed` launches a visible Chromium browser (rather than the headless default). `test:dev`, `test:qa`, and `test:staging` select those environments explicitly; the corresponding URL must still be configured. Scenario tags preserve source IDs, so individual cases can be selected with `--tags "@TC-INV-003"`.

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
4. Run `npm run test:end-to-end:inventory` to refresh the end-to-end inventory and traceability.
5. Run the tagged scenario, then `npm run typecheck`.

## Current coverage and limitations

The original features cover login, logout, protected-route, inventory ordering, and cart journeys. The updated 50-case sheet has 43 fully automated cases, 2 partially covered candidates, 3 blocked cases, and 2 manual-only cases. Runnable end-to-end features cover login, inventory, cart, checkout, order-completion/PDF, and session flows. The SQL/XSS input scenario, browser-download-blocking behavior, ambiguous checkout boundary limits, and the empty-cart/whitespace checkout expectations are not treated as covered until their target behavior or authorization requirements are clarified.

The username, product, and checkout test values are in JSON; the password is read only from `TEST_PASSWORD`.
