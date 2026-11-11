@end-to-end @order @regression
Feature: End-to-end order completion
  Orders can be completed in the SauceDemo test application and produce a downloadable order document.

  @smoke @TC-ORDER-001
  Scenario: [TC-ORDER-001] Finish checkout and display confirmation
    Given I have the configured backpack in the cart
    When I complete checkout using the configured customer information
    Then the order confirmation page should be displayed

  @TC-ORDER-002
  Scenario: [TC-ORDER-002] Verify order confirmation details
    Given I have the configured backpack in the cart
    When I complete checkout using the configured customer information
    Then the confirmation should show the success and dispatch messages

  @TC-ORDER-003
  Scenario: [TC-ORDER-003] Refresh confirmation page
    Given I have completed an order with the configured backpack
    When I refresh the order confirmation page
    Then the confirmation remains visible and the cart remains empty

  @TC-ORDER-004
  Scenario: [TC-ORDER-004] Generate and download the order PDF
    Given I have completed an order with the configured backpack
    When I generate the order PDF
    Then a non-empty PDF download should be available

  @TC-ORDER-006
  Scenario: [TC-ORDER-006] Navigate home after order completion
    Given I have completed an order with the configured backpack
    When I navigate home from order completion
    Then I should be on the Products page
