Feature: Start Americas registration page
    In order to be part of projects and events
    As a volunteer
    I want to create my account in Start Americas page

Background:
	Given I have browsed to the Start Americas Together homepage       
	When I press the login button at the right corner

Scenario Outline: Register on Start Americas page
    When I press the ¿No tienes cuenta? option
	And I fill '<name>', '<lastname>','<email>','<number>','<password>' and '<confirmation>' in the crear cuenta page
	When I press Crear Cuenta start
    Then the user will be created and can login with my '<mail>' and '<pass>'

Examples:
    | name         | lastname  | e-mail             | number   | password    | confirmation | mail               | pass        |
    | Voluntario   | Start     | volStart@gmail.com | 77113344 | voluntario1 | voluntario1  | volStart@gmail.com | voluntario1 |


Scenario: Register on Start Americas page with a google account
    When I click on the button INICIAR SESION CON GOOGLE
    And I click on the button Siguiente of identifier
    And I have entered "S0m0s.Agentes.De.Cambi01" into the google password field
    And I click on the button Siguiente of password
    Then the label Tus proximos eventos should be seen on the screen 