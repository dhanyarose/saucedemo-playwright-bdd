@end-to-end @checkout @regression
Feature: End-to-end checkout overview
  The overview lists selected products and displays consistent totals.

  @smoke @TC-CHECKOUT-010
  Scenario: [TC-CHECKOUT-010] Verify order overview for one product
    Given I have the configured backpack in the cart
    When I proceed through checkout using the configured customer information
    Then the checkout overview should show consistent product and price totals

  @TC-CHECKOUT-011
  Scenario: [TC-CHECKOUT-011] Verify order overview for multiple products
    Given I have the configured sample products in the cart
    When I proceed through checkout using the configured customer information
    Then the checkout overview should show both products and consistent price totals

  @TC-CHECKOUT-012
  Scenario: [TC-CHECKOUT-012] Cancel checkout from overview
    Given I have the configured backpack in the cart
    When I proceed through checkout using the configured customer information
    And I cancel checkout from the overview
    Then I should return to the inventory page without completing an order
