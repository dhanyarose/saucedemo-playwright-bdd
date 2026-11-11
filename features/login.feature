@regression @login
Feature: SauceDemo authentication
  The login form accepts the documented test account and rejects invalid access.

  @smoke @TC_FN_01
  Scenario: [TC_FN_01] Login with standard_user
    Given I open the SauceDemo login page
    When I log in as the configured valid user
    Then I should be on the Products page

  @TC_FN_02
  Scenario: [TC_FN_02] Login with problem_user
    Given I open the SauceDemo login page
    When I log in with username "problem_user" and password "secret_sauce"
    Then I should be on the Products page

  @TC_FN_06
  Scenario: [TC_FN_06] Login using the Enter key
    Given I open the SauceDemo login page
    When I fill in the login form with username "standard_user" and password "secret_sauce"
    And I press Enter on the login form
    Then I should be on the Products page

  @negative @TC_NG_01
  Scenario: [TC_NG_01] Locked-out user cannot log in
    Given I open the SauceDemo login page
    When I submit the locked-out user credentials
    Then I should see the login error "Sorry, this user has been locked out"

  @TC_NG_02
  Scenario: [TC_NG_02] Invalid username, valid password
    Given I open the SauceDemo login page
    When I log in with username "invalid_user" and password "secret_sauce"
    Then I should see the login error "Username and password do not match any user in this service"

  @TC_NG_03
  Scenario: [TC_NG_03] Valid username, invalid password
    Given I open the SauceDemo login page
    When I log in with username "standard_user" and password "wrong_pass"
    Then I should see the login error "Username and password do not match any user in this service"

  @TC_NG_04
  Scenario: [TC_NG_04] Both invalid
    Given I open the SauceDemo login page
    When I log in with username "abc" and password "xyz"
    Then I should see the login error "Username and password do not match any user in this service"

  @negative @TC_NG_05
  Scenario: [TC_NG_05] Empty credentials are rejected
    Given I open the SauceDemo login page
    When I submit login with username "" and password ""
    Then I should see the login error "Username is required"

  @TC_NG_06
  Scenario: [TC_NG_06] Username only
    Given I open the SauceDemo login page
    When I submit login with username "standard_user" and password ""
    Then I should see the login error "Password is required"

  @TC_NG_07
  Scenario: [TC_NG_07] Password only
    Given I open the SauceDemo login page
    When I submit login with username "" and password "secret_sauce"
    Then I should see the login error "Username is required"

  @TC_NG_08
  Scenario: [TC_NG_08] Username is case-sensitive
    Given I open the SauceDemo login page
    When I log in with username "STANDARD_USER" and password "secret_sauce"
    Then I should see the login error "Username and password do not match any user in this service"

  @TC_NG_09
  Scenario: [TC_NG_09] Password is case-sensitive
    Given I open the SauceDemo login page
    When I log in with username "standard_user" and password "SECRET_SAUCE"
    Then I should see the login error "Username and password do not match any user in this service"

  @TC_NG_10
  Scenario: [TC_NG_10] Leading and trailing spaces in username fail
    Given I open the SauceDemo login page
    When I log in with username " standard_user " and password "secret_sauce"
    Then I should see the login error "Username and password do not match any user in this service"

  @TC_NG_11
  Scenario: [TC_NG_11] Spaces in password fail
    Given I open the SauceDemo login page
    When I log in with username "standard_user" and password " secret_sauce "
    Then I should see the login error "Username and password do not match any user in this service"

  @TC_NG_12
  Scenario: [TC_NG_12] Spaces only fail
    Given I open the SauceDemo login page
    When I log in with username "   " and password "   "
    Then I should see the login error "Username and password do not match any user in this service"

  @TC_NG_13
  Scenario: [TC_NG_13] Username and password swapped fail
    Given I open the SauceDemo login page
    When I log in with username "secret_sauce" and password "standard_user"
    Then I should see the login error "Username and password do not match any user in this service"

  @smoke @TC_FN_07
  Scenario: [TC_FN_07] Logout after login
    Given I am logged in as the configured valid user
    When I log out from the navigation menu
    Then I should return to the login page with empty fields

  @TC_FN_08
  Scenario: [TC_FN_08] Back button after logout
    Given I am logged in as the configured valid user
    When I log out from the navigation menu
    And I use the browser back button
    Then I should remain unauthenticated

  @TC_FN_09
  Scenario: [TC_FN_09] Session persistence after refresh
    Given I am logged in as the configured valid user
    When I refresh the current page
    Then I should remain logged in

  @negative @TC_NG_14
  Scenario: [TC_NG_14] Direct inventory access requires authentication
    Given I open the SauceDemo login page
    When I navigate directly to the inventory page
    Then I should remain unauthenticated
