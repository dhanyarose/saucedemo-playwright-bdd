@end-to-end @session @regression
Feature: End-to-end session management
  User logout and application reset return the session to a clean state.

  @smoke @TC-SESSION-001
  Scenario: [TC-SESSION-001] Logout from application
    Given I am authenticated for the end-to-end suite
    When I log out from the navigation menu
    Then I should return to the login page with empty fields

  @TC-SESSION-002
  Scenario: [TC-SESSION-002] Press browser Back after logout
    Given I am authenticated for the end-to-end suite
    When I log out from the navigation menu
    And I use the browser back button
    Then I should remain unauthenticated

  @TC-SESSION-003
  Scenario: [TC-SESSION-003] Reset application state
    Given I am authenticated with the configured sample products in the cart
    When I reset the application state from the navigation menu
    Then the cart should be empty and the inventory should remain available
