# Feature: Create Event
#     In order to help the community through different projects
#     As a registered user with leader role
#     I want to create an event

# Background:
#     Given I am logged in the Start Americas Together page

# Scenario: Add new event
#     Given I see the Start Americas Together page
#     # And I scroll the page
#     When I click on the Eventos button
#     # And I should see the events page
#     And I click on Crear Evento Button
#     And I fill '<name>', '<description>','<place>' and '<date>' in the event card
#     And I click on Guardar Evento
#     Then I can see the event created on the Eventos page

# Examples:
#     | name            | description   | place       | date       |
#     | Evento 2022     | Testing       | Cochabamba  | 17/12/2022 |