@regression @login
Feature: SauceDemo authentication
  The login form accepts the documented test account and rejects invalid access.

  @smoke @TC_FN_01
  Scenario: [TC_FN_01] Login with standard_user
    Given I open the SauceDemo login page
    When I log in as the configured valid user
    Then I should be on the Products page

  @negative @TC_NG_01
  Scenario: [TC_NG_01] Locked-out user cannot log in
    Given I open the SauceDemo login page
    When I submit the locked-out user credentials
    Then I should see the login error "Sorry, this user has been locked out"

  @negative @TC_NG_05
  Scenario: [TC_NG_05] Empty credentials are rejected
    Given I open the SauceDemo login page
    When I submit login with username "" and password ""
    Then I should see the login error "Username is required"

  @smoke @TC_FN_07
  Scenario: [TC_FN_07] Logout after login
    Given I am logged in as the configured valid user
    When I log out from the navigation menu
    Then I should return to the login page with empty fields

  @negative @TC_NG_14
  Scenario: [TC_NG_14] Direct inventory access requires authentication
    Given I open the SauceDemo login page
    When I navigate directly to the inventory page
    Then I should remain unauthenticated
