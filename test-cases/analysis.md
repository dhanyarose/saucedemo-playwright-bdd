# Test case analysis — TestcasesEndToEnd.docx

## Source and coverage

- The current source file has a `.docx` extension but is UTF-8 tab-delimited text, not a binary DOCX package. Its wording and IDs are extracted to `source-test-cases.md`.
- 50 source IDs were found and accounted for in the traceability matrix.
- Automated: 43; candidate: 2; blocked: 3; manual-only: 2.
- The sheet provides scenario titles and expected results but no per-case action steps; the BDD features supply the actions needed to reach those outcomes.

## Clarifications and limitations

- TC-CART-006: Live SauceDemo accepts the empty cart into checkout and displays a Finish action at a $0.00 total; the documented expected result does not match the application.
- TC-CHECKOUT-007: The source does not define the supported short/long input limits, so a boundary value cannot be chosen without inventing a rule.
- TC-CHECKOUT-008: Live SauceDemo accepts whitespace-only checkout fields and advances to the overview, contradicting the documented rejection expectation.
- TC-LOGIN-010: The source mentions known problem_user UI anomalies but does not identify their expected appearance; only login and inventory rendering are covered.
- TC-LOGIN-012: The source says to verify account-specific behavior but does not state the behavior expected for error_user; only successful login is covered.
- TC-LOGIN-015: Security payload execution is not run against the public shared demo without an explicitly authorized test target.
- TC-ORDER-005: Browser download-blocking behavior requires a defined browser policy and expected user-facing message.
- Checkout field lengths and accepted boundary limits are not defined in the source; no boundary thresholds are invented.
- The password is not kept in JSON; tests read it from TEST_PASSWORD as configured by passwordEnv.
