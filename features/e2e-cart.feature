@end-to-end @cart @regression
Feature: End-to-end cart operations
  Cart cases use independent browser contexts and configured sample products.

  @smoke @TC-CART-001
  Scenario: [TC-CART-001] Add Sauce Labs Backpack to cart
    Given I am authenticated for the end-to-end suite
    When I add the configured backpack to the cart
    Then the cart badge should show "1"

  @TC-CART-002
  Scenario: [TC-CART-002] Add multiple products to cart
    Given I am authenticated for the end-to-end suite
    When I add the configured sample products to the cart
    Then the cart badge should show "2"
    And the cart should contain both configured sample products

  @TC-CART-003
  Scenario: [TC-CART-003] Open shopping cart and verify item details
    Given I am authenticated with the configured backpack in the cart
    When I open the cart
    Then the cart should show the backpack with quantity "1" and a currency price

  @TC-CART-004
  Scenario: [TC-CART-004] Remove product from inventory page
    Given I am authenticated with the configured backpack in the cart
    When I remove the configured backpack from inventory
    Then the cart badge should show "0"

  @TC-CART-005
  Scenario: [TC-CART-005] Remove product from cart page
    Given I am authenticated with the configured backpack in the cart
    When I open the cart
    And I remove the configured backpack from the cart
    Then the cart should be empty

  @TC-CART-007
  Scenario: [TC-CART-007] Continue shopping from the cart
    Given I am authenticated with the configured backpack in the cart
    When I open the cart
    And I continue shopping from the cart
    Then I should be on the Products page
