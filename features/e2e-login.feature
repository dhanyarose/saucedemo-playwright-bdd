@end-to-end @login @regression
Feature: End-to-end login validation
  Login behavior uses the users and non-secret invalid data in test-data/testdata.json.

  @smoke @TC-LOGIN-001
  Scenario: [TC-LOGIN-001] Verify login page loads
    Given I open the SauceDemo login page
    Then the login page should show the username, password, and login controls

  @smoke @TC-LOGIN-002
  Scenario: [TC-LOGIN-002] Login with valid credentials
    Given I open the SauceDemo login page
    When I sign in with the configured end-to-end user
    Then I should be on the Products page

  @negative @TC-LOGIN-003
  Scenario: [TC-LOGIN-003] Login with both fields empty
    Given I open the SauceDemo login page
    When I submit the end-to-end login form with empty fields
    Then the login error should contain "Username is required"

  @negative @TC-LOGIN-004
  Scenario: [TC-LOGIN-004] Login with username only
    Given I open the SauceDemo login page
    When I submit the end-to-end login form with username only
    Then the login error should contain "Password is required"

  @negative @TC-LOGIN-005
  Scenario: [TC-LOGIN-005] Login with password only
    Given I open the SauceDemo login page
    When I submit the end-to-end login form with password only
    Then the login error should contain "Username is required"

  @negative @TC-LOGIN-006
  Scenario: [TC-LOGIN-006] Login with invalid username
    Given I open the SauceDemo login page
    When I submit an invalid username with the configured password
    Then the login error should contain "Username and password do not match any user in this service"

  @negative @TC-LOGIN-007
  Scenario: [TC-LOGIN-007] Login with invalid password
    Given I open the SauceDemo login page
    When I submit the configured username with an invalid password
    Then the login error should contain "Username and password do not match any user in this service"

  @negative @TC-LOGIN-008
  Scenario: [TC-LOGIN-008] Login with invalid username and password
    Given I open the SauceDemo login page
    When I submit invalid end-to-end credentials
    Then the login error should contain "Username and password do not match any user in this service"

  @negative @TC-LOGIN-009
  Scenario: [TC-LOGIN-009] Login using locked_out_user
    Given I open the SauceDemo login page
    When I sign in using the configured "locked" user
    Then the login error should contain "Sorry, this user has been locked out"

  @TC-LOGIN-010
  Scenario: [TC-LOGIN-010] Login using problem_user
    Given I open the SauceDemo login page
    When I sign in using the configured "problem" user
    Then I should be on the Products page

  @TC-LOGIN-011
  Scenario: [TC-LOGIN-011] Login using performance_glitch_user
    Given I open the SauceDemo login page
    When I sign in using the configured "performance" user
    Then I should be on the Products page

  @TC-LOGIN-012
  Scenario: [TC-LOGIN-012] Login using error_user
    Given I open the SauceDemo login page
    When I sign in using the configured "error" user
    Then I should be on the Products page

  @TC-LOGIN-013
  Scenario: [TC-LOGIN-013] Login using visual_user
    Given I open the SauceDemo login page
    When I sign in using the configured "visual" user
    Then the inventory layout should render its product cards and images

  @TC-LOGIN-014
  Scenario: [TC-LOGIN-014] Verify password masking
    Given I open the SauceDemo login page
    When I enter the configured password
    Then the password field should use a masked input type
