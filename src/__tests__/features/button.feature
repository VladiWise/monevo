Feature: Button component

  Scenario: Button renders with correct text
    Given I have a "yyy" button with text "Click me"
    Then it should display the text "Click me"

  Scenario: Button calls the onClick handler
    Given I have a "primary" button
    When I click the button
    Then the click handler should be called

  Scenario: Button shows loading spinner when pending
    Given I have a "primary" button that is pending
    Then I should see a loading spinner
