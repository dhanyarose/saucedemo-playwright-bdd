@end-to-end @inventory @regression
Feature: End-to-end inventory and sorting
  Inventory scenarios verify the available products and the supported sort choices.

  @smoke @TC-INV-001
  Scenario: [TC-INV-001] Verify inventory page after login
    Given I am authenticated for the end-to-end suite
    Then the inventory page should show its product heading and sorting control

  @TC-INV-002
  Scenario: [TC-INV-002] Verify all products are displayed without duplication
    Given I am authenticated for the end-to-end suite
    Then the configured product list should be displayed exactly once

  @TC-INV-003
  Scenario: [TC-INV-003] Sort products by Name A to Z
    Given I am authenticated for the end-to-end suite
    When I sort products by "Name (A to Z)"
    Then product names should be sorted "ascending"

  @TC-INV-004
  Scenario: [TC-INV-004] Sort products by Name Z to A
    Given I am authenticated for the end-to-end suite
    When I sort products by "Name (Z to A)"
    Then product names should be sorted "descending"

  @TC-INV-005
  Scenario: [TC-INV-005] Sort products by Price low to high
    Given I am authenticated for the end-to-end suite
    When I sort products by "Price (low to high)"
    Then prices should be sorted "ascending"

  @TC-INV-006
  Scenario: [TC-INV-006] Sort products by Price high to low
    Given I am authenticated for the end-to-end suite
    When I sort products by "Price (high to low)"
    Then prices should be sorted "descending"

  @TC-INV-007
  Scenario: [TC-INV-007] Change sorting options repeatedly
    Given I am authenticated for the end-to-end suite
    When I sort products by "Name (Z to A)"
    Then product names should be sorted "descending"
    When I sort products by "Price (low to high)"
    Then prices should be sorted "ascending"
    When I sort products by "Name (A to Z)"
    Then product names should be sorted "ascending"
