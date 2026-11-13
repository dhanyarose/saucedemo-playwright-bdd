# SauceDemo End-to-End Behavior Baseline

**Status**: Baseline snapshot of the existing Playwright/Cucumber suite  
**Source inventory**: `test-cases/TestcasesEndToEnd.docx`

**Source-to-script map**: `test-cases/traceability-matrix.md`

## Purpose and scope

This specification records what the current end-to-end scripts exercise and what they assert against the SauceDemo application. It is a characterization baseline for the existing repository, not a proposal to develop or change application behavior. A source case being listed here does not mean it is automated or that its original expected result matches the live application.

The test project drives the configured SauceDemo site through a browser. Its end-to-end scenarios live in `features/e2e-*.feature`, step implementations in `src/steps/`, and reusable browser interactions in `src/pages/` and `src/support/`. Non-secret values come from `test-data/testdata.json`; the password and selected environment URL come from environment variables.

## Baseline summary

| Source-case disposition | Count | Meaning in this baseline |
|---|---:|---|
| Automated | 43 | The source case's principal behavior has a corresponding automated assertion. |
| Candidate | 2 | A related scenario runs, but it does not yet verify the source case's full account-specific behavior. |
| Blocked | 3 | The requested assertion is unresolved or conflicts with observed live behavior. |
| Manual-only | 2 | The case is deliberately not run automatically under the documented conditions. |
| **Total** | **50** | Every case from the source inventory is accounted for below. |

These are coverage dispositions from the repository's traceability inventory, not a statement that all 50 source expectations pass. The current feature files include scenarios for candidate cases, but those scenarios assert only the behavior described in the table.

## Existing automated behavior

The following describes behavior already asserted by the existing Gherkin scenarios. It does not prescribe additional application work.

### Login and account behavior

| Source ID | Existing assertion |
|---|---|
| TC-LOGIN-001 | The login page displays username, password, and login controls. |
| TC-LOGIN-002 | Valid configured credentials navigate to the Products page. |
| TC-LOGIN-003 | Submitting empty fields displays an error containing `Username is required`. |
| TC-LOGIN-004 | Submitting username only displays an error containing `Password is required`. |
| TC-LOGIN-005 | Submitting password only displays an error containing `Username is required`. |
| TC-LOGIN-006 | An invalid username displays an error containing `Username and password do not match any user in this service`. |
| TC-LOGIN-007 | An invalid password displays the same authentication error as TC-LOGIN-006. |
| TC-LOGIN-008 | Invalid username and password display the same authentication error as TC-LOGIN-006. |
| TC-LOGIN-009 | The locked account displays an error containing `Sorry, this user has been locked out`. |
| TC-LOGIN-011 | The performance account can sign in and reach the Products page. No numeric load-time threshold is asserted. |
| TC-LOGIN-013 | The visual account can sign in and inventory product cards and images render. |
| TC-LOGIN-014 | The password field uses a masked input type. |

### Inventory and sorting

| Source ID | Existing assertion |
|---|---|
| TC-INV-001 | The inventory page displays its product heading and sorting control. |
| TC-INV-002 | The configured product list appears exactly once per product. |
| TC-INV-003 | Selecting Name A to Z sorts product names ascending. |
| TC-INV-004 | Selecting Name Z to A sorts product names descending. |
| TC-INV-005 | Selecting Price low to high sorts prices ascending. |
| TC-INV-006 | Selecting Price high to low sorts prices descending. |
| TC-INV-007 | Repeated name and price sort selections update the displayed order each time. |

### Cart

| Source ID | Existing assertion |
|---|---|
| TC-CART-001 | Adding the configured backpack displays cart badge `1`. |
| TC-CART-002 | Adding the two configured sample products displays badge `2` and both products in the cart. |
| TC-CART-003 | The cart shows the backpack with quantity `1` and a currency-formatted price. |
| TC-CART-004 | Removing the backpack from inventory displays cart badge `0`. |
| TC-CART-005 | Removing the backpack from the cart leaves the cart empty. |
| TC-CART-007 | Continue Shopping returns the user to the Products page. |

### Checkout information and overview

| Source ID | Existing assertion |
|---|---|
| TC-CHECKOUT-001 | Proceeding from the cart displays the checkout information form. |
| TC-CHECKOUT-002 | Submitting configured customer information advances to the checkout overview. |
| TC-CHECKOUT-003 | Submitting all checkout fields empty displays an error containing `First Name is required`. |
| TC-CHECKOUT-004 | Omitting first name displays an error containing `First Name is required`. |
| TC-CHECKOUT-005 | Omitting last name displays an error containing `Last Name is required`. |
| TC-CHECKOUT-006 | Omitting postal code displays an error containing `Postal Code is required`. |
| TC-CHECKOUT-009 | Canceling from checkout information returns the user to the cart without completing an order. |
| TC-CHECKOUT-010 | For one configured product, the overview displays consistent product and price totals. |
| TC-CHECKOUT-011 | For two configured products, the overview displays both products and consistent price totals. |
| TC-CHECKOUT-012 | Canceling from the overview returns the user to inventory without completing an order. |

### Order completion

| Source ID | Existing assertion |
|---|---|
| TC-ORDER-001 | Finishing checkout displays the order confirmation page. |
| TC-ORDER-002 | The confirmation displays success and dispatch messages. |
| TC-ORDER-003 | Refreshing the confirmation keeps it visible and leaves the cart empty. |
| TC-ORDER-004 | Generating the order PDF makes a non-empty PDF download available. |
| TC-ORDER-006 | Back Home returns the user to the Products page. |

### Session management

| Source ID | Existing assertion |
|---|---|
| TC-SESSION-001 | Logging out returns the user to the login page with empty fields. |
| TC-SESSION-002 | Using browser Back after logout leaves the user unauthenticated. |
| TC-SESSION-003 | Resetting application state empties the cart while leaving inventory available. |

## Cases not fully automated

| Source ID | Disposition | Current state and reason |
|---|---|---|
| TC-LOGIN-010 | Candidate | A scenario signs in with `problem_user` and checks the Products page only. The source case's account-specific UI anomalies are not asserted because the expected anomalies are not specified. |
| TC-LOGIN-012 | Candidate | A scenario signs in with `error_user` and checks the Products page only. The source case's account-specific behavior is not specified or asserted. |
| TC-LOGIN-015 | Manual-only | Script/SQL-like security payload execution is not run against the public shared demo without an explicitly authorized test target. |
| TC-CART-006 | Blocked | The source expects an empty cart to prevent checkout. The traceability record says the live application allows proceeding to checkout and presents a Finish action with a `$0.00` total, conflicting with that expectation. |
| TC-CHECKOUT-007 | Blocked | The source requests short and long checkout boundary values but does not define supported limits; no boundary thresholds are invented. |
| TC-CHECKOUT-008 | Blocked | The source expects whitespace-only checkout values to be rejected. The traceability record says the live application accepts them and advances to the overview, conflicting with that expectation. |
| TC-ORDER-005 | Manual-only | Download-blocking behavior has no defined browser policy or exact user-facing expected result. |

## Execution and environment baseline

- The active runner is Cucumber.js. End-to-end scenarios are selected with the `@end-to-end` tag; `npm run test:end-to-end` is the documented command.
- Scenarios use Playwright Chromium with an isolated browser context and page. The suite captures screenshots and traces for failed scenarios and writes Allure results locally.
- `TEST_ENV` must select `dev`, `qa`, or `staging`, with the corresponding `*_BASE_URL` configured. `TEST_PASSWORD` supplies the password separately from JSON test data.
- The recorded runtime report dated 2026-11-11 reports a headed full-suite run with 78 scenarios and 407 steps passed, and an end-to-end run with 45 scenarios and 231 steps passed. This is historical validation evidence, not a guarantee of current remote-site behavior.
- The project is a browser test suite; it does not contain the SauceDemo application backend, database, or an application deployment to start locally.

## Baseline acceptance

- All 50 source IDs remain traceable to a status and current assertion or disposition above.
- The 43 automated assertions describe only behaviors present in the mapped end-to-end features.
- Candidate, blocked, and manual-only cases remain explicitly distinguished from fully automated coverage.
- Changes to application code are outside the scope of this baseline artifact.
