@regression @inventory
Feature: SauceDemo inventory and sorting
  Product lists and sort choices are available after authentication.

  @smoke @TC_001 @TC_002 @TC_003
  Scenario: [TC_001] Inventory loads with products and Products heading
    Given I am logged in as the configured valid user
    Then the inventory heading should be "Products"
    And the inventory should contain products

  @TC_016
  Scenario: [TC_016] Default product order is alphabetical
    Given I am logged in as the configured valid user
    Then product names should be sorted "ascending"

  @TC_017
  Scenario: [TC_017] Sort products by descending name
    Given I am logged in as the configured valid user
    When I sort products by "Name (Z to A)"
    Then product names should be sorted "descending"

  @TC_018
  Scenario: [TC_018] Sort products by ascending price
    Given I am logged in as the configured valid user
    When I sort products by "Price (low to high)"
    Then prices should be sorted "ascending"

  @TC_019
  Scenario: [TC_019] Sort products by descending price
    Given I am logged in as the configured valid user
    When I sort products by "Price (high to low)"
    Then prices should be sorted "descending"
