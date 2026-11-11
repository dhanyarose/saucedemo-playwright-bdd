@regression @cart
Feature: SauceDemo shopping cart
  Products added from the inventory remain visible in the shopping cart.

  @TC_009 @TC_010 @TC_022
  Scenario: [TC_022] Add one product and verify the cart count
    Given I am on the inventory page with an empty cart
    When I add "Sauce Labs Backpack" to the cart
    Then the cart badge should show "1"
    And the product button should change to Remove for "Sauce Labs Backpack"

  @TC_011
  Scenario: [TC_011] Add multiple products to the cart
    Given I am on the inventory page with an empty cart
    When I add the configured sample products to the cart
    Then the cart badge should show "2"
    And the cart should contain both configured sample products

  @TC_023
  Scenario: [TC_023] Add two different products
    Given I am on the inventory page with an empty cart
    When I add the configured sample products to the cart
    Then the cart badge should show "2"
    And the cart should contain both configured sample products

  @TC_025 @TC_027
  Scenario: [TC_025] Remove an added product
    Given I am on the inventory page with an empty cart
    When I add "Sauce Labs Backpack" to the cart
    And I remove "Sauce Labs Backpack" from the inventory
    Then the cart badge should show "0"

  @TC_028 @TC_029
  Scenario: [TC_028] Cart contents persist when navigating back to inventory
    Given I am on the inventory page with an empty cart
    When I add "Sauce Labs Backpack" to the cart
    And I open the cart
    Then the cart should contain "Sauce Labs Backpack"
    When I navigate back to the inventory page
    And I open the cart
    Then the cart should retain "Sauce Labs Backpack"

  @TC_030
  Scenario: [TC_030] Cart product price matches the inventory price
    Given I am on the inventory page with an empty cart
    When I add "Sauce Labs Backpack" to the cart
    And I open the cart
    Then the inventory price for "Sauce Labs Backpack" should match its cart price
