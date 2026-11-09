# Source test cases: loginTestcases.docx

Valid usernames: standard_user, locked_out_user, problem_user, performance_glitch_user, error_user, visual_user
Password (all users): [REDACTED: TEST_PASSWORD]
Precondition for all cases: the browser is open at https://www.saucedemo.com

1. UI / Page Elements
ID	Scenario	Steps	Expected Result
TC_UI_01	Page loads correctly	Open the URL	Login page loads with the “Swag Labs” title and no broken elements
TC_UI_02	Username field is present	Observe the form	Username input is visible with placeholder “Username”
TC_UI_03	Password field is present	Observe the form	Password input is visible with placeholder “Password”
TC_UI_04	Login button is present	Observe the form	Green “Login” button is visible and enabled
TC_UI_05	Credentials info section	Scroll to the bottom panel	“Accepted usernames are” lists all 6 users, and “Password for all users” shows [REDACTED: TEST_PASSWORD]
TC_UI_06	Password is masked	Type [REDACTED: TEST_PASSWORD] in the Password field	Characters appear as dots/asterisks
TC_UI_07	Page title and favicon	Check the browser tab	Correct tab title is displayed
TC_UI_08	Field focus	Click each field	Cursor appears and the field shows focus styling
TC_UI_09	Tab order	Press Tab repeatedly	Focus moves Username → Password → Login
TC_UI_10	Responsive layout	Resize to mobile, tablet and desktop widths	Layout adjusts with no overlapping or cut-off elements
2. Positive / Functional
ID	Scenario	Test Data	Expected Result
TC_FN_01	Login with standard_user	standard_user / [REDACTED: TEST_PASSWORD]	Redirected to /inventory.html, “Products” page shown
TC_FN_02	Login with problem_user	problem_user / [REDACTED: TEST_PASSWORD]	Login succeeds; inventory page loads (known UI issues like wrong product images may appear)
TC_FN_03	Login with performance_glitch_user	performance_glitch_user / [REDACTED: TEST_PASSWORD]	Login succeeds but takes noticeably longer
TC_FN_04	Login with error_user	error_user / [REDACTED: TEST_PASSWORD]	Login succeeds; errors may occur on later actions
TC_FN_05	Login with visual_user	visual_user / [REDACTED: TEST_PASSWORD]	Login succeeds; visual differences may appear on inventory page
TC_FN_06	Login using the Enter key	Enter valid credentials, press Enter	Login succeeds, same as clicking Login
TC_FN_07	Logout after login	Log in, open menu, click Logout	Returned to the login page and fields are cleared
TC_FN_08	Back button after logout	Log out, click the browser Back button	User is not logged back in; the login page or an error shows
TC_FN_09	Session persistence	Log in, refresh the inventory page	User stays logged in
3. Negative Scenarios
ID	Scenario	Test Data	Expected Result
TC_NG_01	Locked-out user	locked_out_user / [REDACTED: TEST_PASSWORD]	Error: “Epic sadface: Sorry, this user has been locked out.”
TC_NG_02	Invalid username, valid password	invalid_user / [REDACTED: TEST_PASSWORD]	Error: “Username and password do not match any user in this service”
TC_NG_03	Valid username, invalid password	standard_user / wrong_pass	Same “do not match” error
TC_NG_04	Both invalid	abc / xyz	Same “do not match” error
TC_NG_05	Both fields empty	(blank) / (blank)	Error: “Username is required”
TC_NG_06	Username only	standard_user / (blank)	Error: “Password is required”
TC_NG_07	Password only	(blank) / [REDACTED: TEST_PASSWORD]	Error: “Username is required”
TC_NG_08	Username is case-sensitive	STANDARD_USER / [REDACTED: TEST_PASSWORD]	Login fails with “do not match” error
TC_NG_09	Password is case-sensitive	standard_user / [REDACTED: TEST_PASSWORD]	Login fails with “do not match” error
TC_NG_10	Leading/trailing spaces in username	“ standard_user “ / [REDACTED: TEST_PASSWORD]	Login fails (no auto-trim), or the behavior is documented
TC_NG_11	Spaces in password	standard_user / “ [REDACTED: TEST_PASSWORD] “	Login fails
TC_NG_12	Spaces only	“ “ / “ “	Login fails with an error
TC_NG_13	Username and password swapped	[REDACTED: TEST_PASSWORD] / standard_user	Login fails
TC_NG_14	Direct URL access without login	Open /inventory.html directly	Redirected to login with: “You can only access ‘/inventory.html’ when you are logged in.”
4. Error Message Behavior
ID	Scenario	Steps	Expected Result
TC_ER_01	Error styling	Trigger any error	Red error banner appears above the Login button, and the fields show error icons/highlight
TC_ER_02	Dismiss error	Click the “X” on the banner	Error message is removed
TC_ER_03	Error clears on success	Fail login, then enter valid credentials	Login succeeds and the error no longer shows
TC_ER_04	Error message doesn’t leak info	Try an invalid username versus an invalid password	Both show the same generic message, so valid usernames can’t be enumerated
5. Input Validation / Security
ID	Scenario	Test Data	Expected Result
TC_SC_01	SQL injection	' OR '1'='1 in both fields	Login fails; no SQL error or bypass
TC_SC_02	XSS in username	<script>alert(1)</script>	Script is not executed; login fails
TC_SC_03	Very long input	500+ characters in each field	App handles it gracefully, with no crash or layout break
TC_SC_04	Special characters	!@#$%^&*()	Login fails with the standard error; no crash
TC_SC_05	Copy from password field	Type a password, try Ctrl+C	Masked value can’t be copied as plain text
TC_SC_06	Password not in URL	Submit login	Credentials never appear in the URL or query string
TC_SC_07	HTTPS	Check the URL	Page is served over HTTPS
TC_SC_08	Repeated failed attempts	5–10 wrong logins in a row	Note the behavior (no lockout is expected on this demo site)
TC_SC_09	Autofill / password manager	Save credentials, revisit	Browser autofill works without breaking the form
6. Compatibility and Performance
ID	Scenario	Expected Result
TC_CP_01	Chrome, Firefox, Edge, Safari	Login works the same in all browsers
TC_CP_02	Mobile browsers (Android/iOS)	Form is usable and login works
TC_CP_03	Page load time	Login page loads within about 3 seconds
TC_CP_04	Login response time (standard_user)	Redirect happens within about 2 seconds
TC_CP_05	Login time (performance_glitch_user)	Measure and record the delay (usually a few seconds)
TC_CP_06	Refresh on the login page	Page reloads with empty fields
TC_CP_07	Slow network (throttled 3G)	Login still completes, with no duplicate submissions
Suggested Priority
High: TC_FN_01, TC_FN_07, TC_NG_01–07, TC_NG_14, TC_SC_01