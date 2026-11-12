# Architecture Diagram

This repository contains a TypeScript-based browser automation suite for SauceDemo, not the application being tested. Cucumber scenarios orchestrate Playwright page objects against a configured SauceDemo environment and produce local reports and failure artifacts.

## Application Architecture

<!-- mermaid-checked: no \n, no em-dash/en-dash, no {} in labels, subgraphs are id["label"], arrows are -->|"label"|, all subgraphs closed by end, ids unique -->
```mermaid
flowchart TD
    subgraph SpecLayer["Behavior Specifications"]
        Features["Gherkin feature files"]
    end
    subgraph RunnerLayer["Test Runner"]
        Cucumber["Cucumber 13"]
        Steps["TypeScript step definitions"]
        Hooks["Scenario lifecycle hooks"]
        World["Per-scenario test world"]
    end
    subgraph AutomationLayer["Browser Automation"]
        Journey["Reusable end-to-end journeys"]
        Pages["Playwright page objects"]
        Browser["Playwright Chromium"]
    end
    subgraph ConfigDataLayer["Configuration and Test Data"]
        EnvConfig["Environment URL configuration"]
        JsonData["JSON test data"]
        Secret["Environment password"]
    end
    subgraph TargetLayer["System Under Test"]
        SauceDemo["SauceDemo web application"]
    end
    subgraph OutputLayer["Test Outputs"]
        Allure["Allure results and report"]
        Artifacts["Failure screenshots and traces"]
        Downloads["Order PDF downloads"]
    end

    Features -->|"scenarios"| Cucumber
    Cucumber -->|"loads"| Steps
    Cucumber -->|"runs hooks"| Hooks
    Steps -->|"reuse flows"| Journey
    Steps -->|"assert and interact"| Pages
    Journey -->|"compose flows"| Pages
    Hooks -->|"initialize and close"| World
    World -->|"holds browser page"| Browser
    EnvConfig -->|"selects base URL"| World
    JsonData -->|"provides test values"| Steps
    Secret -->|"provides password"| Steps
    Browser -->|"HTTPS browser actions"| SauceDemo
    Cucumber -->|"formats test results"| Allure
    Hooks -->|"capture on failure"| Artifacts
    Pages -->|"trigger browser download"| Downloads
```

### Technology Stack Summary

| Layer | Technology | Version | Purpose |
|---|---|---:|---|
| Specifications and runner | Gherkin, Cucumber.js | Cucumber 13.3.0 | Express scenarios and execute step definitions |
| Automation | TypeScript, Playwright, Chromium | TypeScript 5.9.3; Playwright 1.65.0 | Drive and inspect the browser |
| Environment configuration | dotenv, Node.js | dotenv 16.6.1; Node.js 22.12+ | Load environment selection and URL from process environment |
| Test data | JSON and environment variables | N/A | Store non-secret values in JSON and password outside source data |
| Reporting | Allure Cucumber adapter and CLI | 3.14.0; 2.34.0 | Write results and generate an HTML report |

### Data Storage & External Services

The test suite has no application database, cache, or message broker. Non-secret user, product, and checkout values are read from `test-data/testdata.json`; the password and environment-specific base URL are supplied through environment variables. Playwright drives the configured SauceDemo web application over HTTP or HTTPS. Cucumber Allure results, failure screenshots, traces, and downloaded order PDFs are written to local report/output directories.

### Key Architectural Decisions

- Gherkin features are the behavior specifications; Cucumber step definitions bind them to TypeScript automation.
- Page objects centralize UI selectors and interactions, while reusable journey helpers compose common end-to-end flows.
- Each scenario gets its own browser context and page. Failed scenarios attach screenshots and retain Playwright traces.
- `playwright.config.ts` is present for Playwright Test utilities, but the active test runner is Cucumber and its browser lifecycle is configured separately.

## Component Relationships

<!-- mermaid-checked: no \n, no em-dash/en-dash, no {} in labels, subgraphs are id["label"], arrows are -->|"label"|, all subgraphs closed by end, ids unique -->
```mermaid
flowchart LR
    subgraph cPresentation["Specifications and Steps"]
        cFeatures["Feature files"]
        cSteps["Cucumber step definitions"]
    end
    subgraph cFlows["Flow Orchestration"]
        cJourneys["End-to-end journey helpers"]
    end
    subgraph cUI["Browser Interaction"]
        cPages["Page object classes"]
        cPage["Playwright Page"]
        cSite["SauceDemo site"]
    end
    subgraph cRuntime["Scenario Runtime"]
        cHooks["Before and After hooks"]
        cWorld["TestWorld"]
        cBrowser["Chromium browser"]
        cConfig["Environment configuration"]
    end
    subgraph cData["Test Data"]
        cDataHelper["Test data utilities"]
        cJson["testdata.json"]
        cEnv["Environment variables"]
    end
    subgraph cOutputs["Reports and Artifacts"]
        cAllure["Allure formatter"]
        cFailure["Failure screenshot and trace"]
        cDownload["Order PDF download"]
    end

    cFeatures -->|"bind steps"| cSteps
    cSteps -->|"compose common flows"| cJourneys
    cSteps -->|"call page interactions"| cPages
    cJourneys -->|"use page objects"| cPages
    cSteps -->|"access scenario state"| cWorld
    cHooks -->|"create and dispose"| cWorld
    cHooks -->|"launch and close"| cBrowser
    cWorld -->|"provides page"| cSteps
    cWorld -->|"resolves base URL"| cConfig
    cConfig -->|"loads dotenv and URL"| cEnv
    cSteps -->|"read values"| cDataHelper
    cJourneys -->|"read values"| cDataHelper
    cDataHelper -->|"loads"| cJson
    cDataHelper -->|"reads password"| cEnv
    cPages -->|"use browser API"| cPage
    cPage -->|"HTTP or HTTPS UI"| cSite
    cHooks -.->|"capture when failed"| cFailure
    cSteps -.->|"write Cucumber results"| cAllure
    cPages -.->|"request download"| cDownload
```

### Component Inventory

| Component | Layer | Type | Responsibility |
|---|---|---|---|
| `features/*.feature` | Specifications | Gherkin scenarios | Describe login, inventory, cart, checkout, order, and session behavior |
| `src/steps/*.steps.ts` | Presentation | Cucumber step definitions | Bind Gherkin steps to assertions, flows, and page interactions |
| `src/support/e2e-journeys.ts` | Flow orchestration | Journey helpers | Compose reusable configured login and checkout sequences |
| `src/pages/*.ts` | Browser interaction | Page objects | Encapsulate selectors and interactions for login, inventory, cart, checkout, and order completion |
| `src/support/hooks.ts` | Scenario runtime | Cucumber hooks | Launch Chromium, create context/page, capture failure artifacts, and clean up |
| `src/support/world.ts` | Scenario runtime | Cucumber World | Hold per-scenario browser state and expose the selected base URL |
| `config/environments.ts` | Scenario runtime | Configuration module | Validate `TEST_ENV` and its matching absolute HTTP(S) base URL |
| `src/utils/test-data.ts` | Test data | Data access utility | Read typed test inputs and require password from its configured environment variable |
| `test-data/testdata.json` | Test data | JSON data store | Supply non-secret login, product, and checkout values |
| `cucumber.js` | Runner and outputs | Cucumber configuration | Discover features and TypeScript support/step files; configure Allure formatting |
| Allure formatter | Reports and artifacts | Cucumber reporter | Write machine-readable test results for report generation |
| Failure artifacts | Reports and artifacts | Screenshot and trace files | Preserve browser evidence for failed scenarios |
