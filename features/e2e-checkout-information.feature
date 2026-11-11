@end-to-end @checkout @regression
Feature: End-to-end checkout information
  Checkout information is validated before an order overview can be reached.

  @smoke @TC-CHECKOUT-001
  Scenario: [TC-CHECKOUT-001] Navigate from cart to checkout
    Given I have the configured backpack in the cart
    When I open the cart and proceed to checkout
    Then the checkout information form should be displayed

  @TC-CHECKOUT-002
  Scenario: [TC-CHECKOUT-002] Enter all valid checkout information
    Given I have the configured backpack in the cart
    When I proceed through checkout using the configured customer information
    Then the checkout overview should be displayed

  @negative @TC-CHECKOUT-003
  Scenario: [TC-CHECKOUT-003] Submit all fields empty
    Given I have the configured backpack in the cart
    When I open checkout information and submit it empty
    Then the checkout error should contain "First Name is required"

  @negative @TC-CHECKOUT-004
  Scenario: [TC-CHECKOUT-004] Submit without First Name
    Given I have the configured backpack in the cart
    When I submit checkout information without a "first name"
    Then the checkout error should contain "First Name is required"

  @negative @TC-CHECKOUT-005
  Scenario: [TC-CHECKOUT-005] Submit without Last Name
    Given I have the configured backpack in the cart
    When I submit checkout information without a "last name"
    Then the checkout error should contain "Last Name is required"

  @negative @TC-CHECKOUT-006
  Scenario: [TC-CHECKOUT-006] Submit without Zip Code
    Given I have the configured backpack in the cart
    When I submit checkout information without a "postal code"
    Then the checkout error should contain "Postal Code is required"

  @TC-CHECKOUT-009
  Scenario: [TC-CHECKOUT-009] Cancel during checkout
    Given I have the configured backpack in the cart
    When I open checkout information and cancel
    Then I should return to the cart without completing an order
