# Test case traceability

Each source ID is listed once. Automated entries link to the feature that contains the scenario; candidate entries are not represented as executed coverage.

| Source ID | Scenario | Status | Scenario file or disposition |
|---|---|---|---|
| TC_UI_01 | Page loads correctly | candidate | Candidate; not yet automated (ui) |
| TC_UI_02 | Username field is present | candidate | Candidate; not yet automated (ui) |
| TC_UI_03 | Password field is present | candidate | Candidate; not yet automated (ui) |
| TC_UI_04 | Login button is present | candidate | Candidate; not yet automated (ui) |
| TC_UI_05 | Credentials info section | candidate | Candidate; not yet automated (ui) |
| TC_UI_06 | Password is masked | candidate | Candidate; not yet automated (ui) |
| TC_UI_07 | Page title and favicon | candidate | Candidate; not yet automated (ui) |
| TC_UI_08 | Field focus | candidate | Candidate; not yet automated (ui) |
| TC_UI_09 | Tab order | candidate | Candidate; not yet automated (ui) |
| TC_UI_10 | Responsive layout | candidate | Candidate; not yet automated (ui) |
| TC_FN_01 | Login with standard_user | automated | features/login.feature |
| TC_FN_02 | Login with problem_user | candidate | Candidate; not yet automated (login) |
| TC_FN_03 | Login with performance_glitch_user | candidate | Candidate; not yet automated (login) |
| TC_FN_04 | Login with error_user | candidate | Candidate; not yet automated (login) |
| TC_FN_05 | Login with visual_user | candidate | Candidate; not yet automated (login) |
| TC_FN_06 | Login using the Enter key | candidate | Candidate; not yet automated (login) |
| TC_FN_07 | Logout after login | automated | features/login.feature |
| TC_FN_08 | Back button after logout | candidate | Candidate; not yet automated (login) |
| TC_FN_09 | Session persistence | candidate | Candidate; not yet automated (login) |
| TC_NG_01 | Locked-out user | automated | features/login.feature |
| TC_NG_02 | Invalid username, valid password | candidate | Candidate; not yet automated (login) |
| TC_NG_03 | Valid username, invalid password | candidate | Candidate; not yet automated (login) |
| TC_NG_04 | Both invalid | candidate | Candidate; not yet automated (login) |
| TC_NG_05 | Both fields empty | automated | features/login.feature |
| TC_NG_06 | Username only | candidate | Candidate; not yet automated (login) |
| TC_NG_07 | Password only | candidate | Candidate; not yet automated (login) |
| TC_NG_08 | Username is case-sensitive | candidate | Candidate; not yet automated (login) |
| TC_NG_09 | Password is case-sensitive | candidate | Candidate; not yet automated (login) |
| TC_NG_10 | Leading/trailing spaces in username | candidate | Candidate; not yet automated (login) |
| TC_NG_11 | Spaces in password | candidate | Candidate; not yet automated (login) |
| TC_NG_12 | Spaces only | candidate | Candidate; not yet automated (login) |
| TC_NG_13 | Username and password swapped | candidate | Candidate; not yet automated (login) |
| TC_NG_14 | Direct URL access without login | automated | features/login.feature |
| TC_ER_01 | Error styling | candidate | Candidate; not yet automated (login) |
| TC_ER_02 | Dismiss error | candidate | Candidate; not yet automated (login) |
| TC_ER_03 | Error clears on success | candidate | Candidate; not yet automated (login) |
| TC_ER_04 | Error message doesn’t leak info | candidate | Candidate; not yet automated (login) |
| TC_SC_01 | SQL injection | candidate | Candidate; not yet automated (login) |
| TC_SC_02 | XSS in username | candidate | Candidate; not yet automated (login) |
| TC_SC_03 | Very long input | candidate | Candidate; not yet automated (login) |
| TC_SC_04 | Special characters | candidate | Candidate; not yet automated (login) |
| TC_SC_05 | Copy from password field | manual-only | Manual validation required; Copy from password field |
| TC_SC_06 | Password not in URL | candidate | Candidate; not yet automated (login) |
| TC_SC_07 | HTTPS | candidate | Candidate; not yet automated (login) |
| TC_SC_08 | Repeated failed attempts | candidate | Candidate; not yet automated (login) |
| TC_SC_09 | Autofill / password manager | manual-only | Manual validation required; Autofill / password manager |
| TC_CP_01 | Chrome, Firefox, Edge, Safari | manual-only | Manual validation required; Chrome, Firefox, Edge, Safari |
| TC_CP_02 | Mobile browsers (Android/iOS) | manual-only | Manual validation required; Mobile browsers (Android/iOS) |
| TC_CP_03 | Page load time | candidate | Candidate; not yet automated (performance-security) |
| TC_CP_04 | Login response time (standard_user) | candidate | Candidate; not yet automated (performance-security) |
| TC_CP_05 | Login time (performance_glitch_user) | candidate | Candidate; not yet automated (performance-security) |
| TC_CP_06 | Refresh on the login page | candidate | Candidate; not yet automated (performance-security) |
| TC_CP_07 | Slow network (throttled 3G) | manual-only | Manual validation required; Slow network (throttled 3G) |
| TC_001 | Verify inventory page loads | automated | features/inventory.feature |
| TC_002 | Verify Products heading | automated | features/inventory.feature |
| TC_003 | Verify product list | automated | features/inventory.feature |
| TC_004 | Verify product images | candidate | Candidate; not yet automated (inventory) |
| TC_005 | Verify product name | candidate | Candidate; not yet automated (inventory) |
| TC_006 | Verify product description | candidate | Candidate; not yet automated (inventory) |
| TC_007 | Verify product price | candidate | Candidate; not yet automated (inventory) |
| TC_008 | Verify Add to Cart button | candidate | Candidate; not yet automated (inventory) |
| TC_009 | Click Add to Cart | automated | features/cart.feature |
| TC_010 | Verify cart badge | automated | features/cart.feature |
| TC_011 | Add multiple products | candidate | Candidate; not yet automated (cart) |
| TC_012 | Verify product details navigation | candidate | Candidate; not yet automated (cart) |
| TC_013 | Click shopping cart icon | candidate | Candidate; not yet automated (cart) |
| TC_014 | Click hamburger menu | candidate | Candidate; not yet automated (cart) |
| TC_015 | Verify menu options | candidate | Candidate; not yet automated (cart) |
| TC_016 | Verify default sorting | automated | features/inventory.feature |
| TC_017 | Select Name (Z to A) | automated | features/inventory.feature |
| TC_018 | Select Price (low to high) | automated | features/inventory.feature |
| TC_019 | Select Price (high to low) | automated | features/inventory.feature |
| TC_020 | Change sorting multiple times | candidate | Candidate; not yet automated (sorting) |
| TC_021 | Verify sorting with cart items | candidate | Candidate; not yet automated (sorting) |
| TC_022 | Add one product to cart | automated | features/cart.feature |
| TC_023 | Add two different products | automated | features/cart.feature |
| TC_024 | Add all available products | candidate | Candidate; not yet automated (cart) |
| TC_025 | Remove an added product | automated | features/cart.feature |
| TC_026 | Verify button after adding product | candidate | Candidate; not yet automated (cart) |
| TC_027 | Remove product from inventory page | automated | features/cart.feature |
| TC_028 | Navigate to cart after adding products | automated | features/cart.feature |
| TC_029 | Navigate back to inventory | automated | features/cart.feature |
| TC_030 | Verify product price in cart | automated | features/cart.feature |
| TC_031 | Access inventory page without login | candidate | Candidate; not yet automated (inventory) |
| TC_032 | Refresh inventory page | candidate | Candidate; not yet automated (inventory) |
| TC_033 | Use browser back button | candidate | Candidate; not yet automated (inventory) |
| TC_034 | Use browser forward button | candidate | Candidate; not yet automated (inventory) |
| TC_035 | Try accessing cart without login | candidate | Candidate; not yet automated (inventory) |
| TC_036 | Click Add to Cart multiple times rapidly | candidate | Candidate; not yet automated (cart) |
| TC_037 | Verify unavailable product image | candidate | Candidate; not yet automated (inventory) |
| TC_038 | Verify product with missing price | blocked | Clarification required; expected behavior is underspecified |
| TC_039 | Verify product with long description | candidate | Candidate; not yet automated (inventory) |
| TC_040 | Change sorting while navigating | candidate | Candidate; not yet automated (sorting) |
| TC_041 | Verify page alignment | candidate | Candidate; not yet automated (ui) |
| TC_042 | Verify product card dimensions | candidate | Candidate; not yet automated (ui) |
| TC_043 | Verify image alignment | candidate | Candidate; not yet automated (ui) |
| TC_044 | Verify font consistency | candidate | Candidate; not yet automated (ui) |
| TC_045 | Verify button alignment | candidate | Candidate; not yet automated (ui) |
| TC_046 | Verify product price format | candidate | Candidate; not yet automated (ui) |
| TC_047 | Verify page scrolling | candidate | Candidate; not yet automated (ui) |
| TC_048 | Verify browser zoom at 80%, 100%, and 125% | manual-only | Manual validation required; Verify browser zoom at 80%, 100%, and 125% |
| TC_049 | Verify responsive layout | candidate | Candidate; not yet automated (ui) |
| TC_050 | Verify horizontal scrolling | candidate | Candidate; not yet automated (ui) |
| TC_051 | Navigate using keyboard Tab | candidate | Candidate; not yet automated (accessibility) |
| TC_052 | Navigate using Enter key | candidate | Candidate; not yet automated (accessibility) |
| TC_053 | Verify keyboard focus | candidate | Candidate; not yet automated (accessibility) |
| TC_054 | Verify image alternative text | manual-only | Manual validation required; Verify image alternative text |
| TC_055 | Verify screen reader compatibility | manual-only | Manual validation required; Verify screen reader compatibility |
| TC_056 | Verify color contrast | manual-only | Manual validation required; Verify color contrast |
| TC_057 | Verify dropdown accessibility | candidate | Candidate; not yet automated (accessibility) |
| TC_058 | Measure inventory page load time | blocked | Clarification required; expected behavior is underspecified |
| TC_059 | Measure product image loading | candidate | Candidate; not yet automated (performance-security) |
| TC_060 | Verify repeated sorting performance | candidate | Candidate; not yet automated (performance-security) |
| TC_061 | Verify session expiration | blocked | Clarification required; expected behavior is underspecified |
| TC_062 | Verify direct URL access | candidate | Candidate; not yet automated (performance-security) |
| TC_063 | Verify logout | candidate | Candidate; not yet automated (cart) |
| TC_064 | Verify browser storage after logout | blocked | Clarification required; expected behavior is underspecified |
