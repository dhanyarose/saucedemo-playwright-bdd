# Test case traceability — TestcasesEndToEnd.docx

Source cases: 50. Automated: 43; candidate: 2; blocked: 3; manual-only: 2.

| Source ID | Scenario | Status | Feature mapping or disposition |
|---|---|---|---|
| TC-LOGIN-001 | Verify login page loads | automated | [TC-LOGIN-001] Verify login page loads — `features/e2e-login.feature` |
| TC-LOGIN-002 | Login with valid credentials | automated | [TC-LOGIN-002] Login with valid credentials — `features/e2e-login.feature` |
| TC-LOGIN-003 | Login with both fields empty | automated | [TC-LOGIN-003] Login with both fields empty — `features/e2e-login.feature` |
| TC-LOGIN-004 | Login with username only | automated | [TC-LOGIN-004] Login with username only — `features/e2e-login.feature` |
| TC-LOGIN-005 | Login with password only | automated | [TC-LOGIN-005] Login with password only — `features/e2e-login.feature` |
| TC-LOGIN-006 | Login with invalid username | automated | [TC-LOGIN-006] Login with invalid username — `features/e2e-login.feature` |
| TC-LOGIN-007 | Login with invalid password | automated | [TC-LOGIN-007] Login with invalid password — `features/e2e-login.feature` |
| TC-LOGIN-008 | Login with invalid username and password | automated | [TC-LOGIN-008] Login with invalid username and password — `features/e2e-login.feature` |
| TC-LOGIN-009 | Login using locked_out_user | automated | [TC-LOGIN-009] Login using locked_out_user — `features/e2e-login.feature` |
| TC-LOGIN-010 | Login using problem_user | candidate | [TC-LOGIN-010] Login using problem_user — `features/e2e-login.feature` |
| TC-LOGIN-011 | Login using performance_glitch_user | automated | [TC-LOGIN-011] Login using performance_glitch_user — `features/e2e-login.feature` |
| TC-LOGIN-012 | Login using error_user | candidate | [TC-LOGIN-012] Login using error_user — `features/e2e-login.feature` |
| TC-LOGIN-013 | Login using visual_user | automated | [TC-LOGIN-013] Login using visual_user — `features/e2e-login.feature` |
| TC-LOGIN-014 | Verify password masking | automated | [TC-LOGIN-014] Verify password masking — `features/e2e-login.feature` |
| TC-LOGIN-015 | Enter script or SQL-like input | manual-only | Security payload execution is not run against the public shared demo without an explicitly authorized test target. |
| TC-INV-001 | Verify inventory page after login | automated | [TC-INV-001] Verify inventory page after login — `features/e2e-inventory.feature` |
| TC-INV-002 | Verify all products are displayed | automated | [TC-INV-002] Verify all products are displayed without duplication — `features/e2e-inventory.feature` |
| TC-INV-003 | Sort products by Name A to Z | automated | [TC-INV-003] Sort products by Name A to Z — `features/e2e-inventory.feature` |
| TC-INV-004 | Sort products by Name Z to A | automated | [TC-INV-004] Sort products by Name Z to A — `features/e2e-inventory.feature` |
| TC-INV-005 | Sort products by Price low to high | automated | [TC-INV-005] Sort products by Price low to high — `features/e2e-inventory.feature` |
| TC-INV-006 | Sort products by Price high to low | automated | [TC-INV-006] Sort products by Price high to low — `features/e2e-inventory.feature` |
| TC-INV-007 | Change sorting options repeatedly | automated | [TC-INV-007] Change sorting options repeatedly — `features/e2e-inventory.feature` |
| TC-CART-001 | Add Sauce Labs Backpack to cart | automated | [TC-CART-001] Add Sauce Labs Backpack to cart — `features/e2e-cart.feature` |
| TC-CART-002 | Add multiple products to cart | automated | [TC-CART-002] Add multiple products to cart — `features/e2e-cart.feature` |
| TC-CART-003 | Open shopping cart | automated | [TC-CART-003] Open shopping cart and verify item details — `features/e2e-cart.feature` |
| TC-CART-004 | Remove product from inventory page | automated | [TC-CART-004] Remove product from inventory page — `features/e2e-cart.feature` |
| TC-CART-005 | Remove product from cart page | automated | [TC-CART-005] Remove product from cart page — `features/e2e-cart.feature` |
| TC-CART-006 | Attempt checkout with empty cart | blocked | Live SauceDemo accepts the empty cart into checkout and displays a Finish action at a $0.00 total; the documented expected result does not match the application. |
| TC-CART-007 | Click Continue Shopping | automated | [TC-CART-007] Continue shopping from the cart — `features/e2e-cart.feature` |
| TC-CHECKOUT-001 | Navigate from cart to checkout | automated | [TC-CHECKOUT-001] Navigate from cart to checkout — `features/e2e-checkout-information.feature` |
| TC-CHECKOUT-002 | Enter all valid checkout information | automated | [TC-CHECKOUT-002] Enter all valid checkout information — `features/e2e-checkout-information.feature` |
| TC-CHECKOUT-003 | Submit all fields empty | automated | [TC-CHECKOUT-003] Submit all fields empty — `features/e2e-checkout-information.feature` |
| TC-CHECKOUT-004 | Submit without First Name | automated | [TC-CHECKOUT-004] Submit without First Name — `features/e2e-checkout-information.feature` |
| TC-CHECKOUT-005 | Submit without Last Name | automated | [TC-CHECKOUT-005] Submit without Last Name — `features/e2e-checkout-information.feature` |
| TC-CHECKOUT-006 | Submit without Zip Code | automated | [TC-CHECKOUT-006] Submit without Zip Code — `features/e2e-checkout-information.feature` |
| TC-CHECKOUT-007 | Enter short and long values | blocked | The source does not define the supported short/long input limits, so a boundary value cannot be chosen without inventing a rule. |
| TC-CHECKOUT-008 | Enter whitespace-only values | blocked | Live SauceDemo accepts whitespace-only checkout fields and advances to the overview, contradicting the documented rejection expectation. |
| TC-CHECKOUT-009 | Click Cancel during checkout | automated | [TC-CHECKOUT-009] Cancel during checkout — `features/e2e-checkout-information.feature` |
| TC-CHECKOUT-010 | Verify order overview for one product | automated | [TC-CHECKOUT-010] Verify order overview for one product — `features/e2e-checkout-overview.feature` |
| TC-CHECKOUT-011 | Verify order overview for multiple products | automated | [TC-CHECKOUT-011] Verify order overview for multiple products — `features/e2e-checkout-overview.feature` |
| TC-CHECKOUT-012 | Cancel checkout from overview | automated | [TC-CHECKOUT-012] Cancel checkout from overview — `features/e2e-checkout-overview.feature` |
| TC-ORDER-001 | Click Finish to complete order | automated | [TC-ORDER-001] Finish checkout and display confirmation — `features/e2e-order-completion.feature` |
| TC-ORDER-002 | Verify order confirmation details | automated | [TC-ORDER-002] Verify order confirmation details — `features/e2e-order-completion.feature` |
| TC-ORDER-003 | Refresh confirmation page | automated | [TC-ORDER-003] Refresh confirmation page — `features/e2e-order-completion.feature` |
| TC-ORDER-004 | Click Generate PDF order | automated | [TC-ORDER-004] Generate and download the order PDF — `features/e2e-order-completion.feature` |
| TC-ORDER-005 | Generate PDF when browser downloads are blocked | manual-only | Browser download-blocking behavior requires a defined browser policy and expected user-facing message. |
| TC-ORDER-006 | Navigate home after order completion | automated | [TC-ORDER-006] Navigate home after order completion — `features/e2e-order-completion.feature` |
| TC-SESSION-001 | Logout from application | automated | [TC-SESSION-001] Logout from application — `features/e2e-session-management.feature` |
| TC-SESSION-002 | Press browser Back after logout | automated | [TC-SESSION-002] Press browser Back after logout — `features/e2e-session-management.feature` |
| TC-SESSION-003 | Reset application state | automated | [TC-SESSION-003] Reset application state — `features/e2e-session-management.feature` |
