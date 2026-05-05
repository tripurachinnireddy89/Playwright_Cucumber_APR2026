Feature: Login & Employee Management

  Background:
    Given user launches application
    And user logs in with valid credentials

@smoke
  Scenario: Valid Login
    Then user should see dashboard

@regression @acceptance
  Scenario: Add new employee
    Given user is on dashboard
    When user clicks on PIM module
    And user clicks on add employee button
    And user enters employee details
    And user clicks on save button
    Then user should see add employee form