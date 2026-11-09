# Test case analysis

## Source format

Both files in `testcases/` have a `.docx` extension but contain UTF-8 tab-delimited text (not Word ZIP/DOCX data). Their original wording and IDs are preserved in the extracted Markdown files. The importer deliberately fails on a binary DOCX rather than silently misreading it.

## Inventory

- Source IDs found: 117.
- Automated in this framework: 21.
- Automation candidates not yet implemented: 83.
- Blocked pending clarified acceptance criteria: 4.
- Manual-only in the current environment: 9.

## Clarifications and limitations

- TC_038 does not specify the application state or expected behavior when a product has no price.
- TC_058 requires an agreed page-load performance threshold before it can have a deterministic pass/fail assertion.
- TC_061 does not define how to expire or simulate a session.
- TC_064 does not define which storage keys or session-clearing behavior are required.
- Cross-browser/device coverage, real network throttling, password-manager autofill, clipboard restrictions, screen-reader compatibility, contrast, and zoom are not covered by the Chromium desktop smoke suite.
- Some source cases provide only expected results, not interaction steps or test data; the inventory leaves those fields empty rather than inventing procedures.
- SauceDemo contains documented demo-user behaviors and known user-specific UI issues; product-specific expected results should be treated as environment-sensitive.
