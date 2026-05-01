Feature: Login

  Scenario: Valid Login
    Given user launches application
    When user enters login details
    Then user should see dashboard