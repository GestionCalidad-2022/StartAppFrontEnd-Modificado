Feature: Login in the page with the credentials
    In order to interact with the functionalities of the web application
    As a registered user
    I want to login with my credentials

Background:
    Given I have browsed to the Start Americas Together login page 

Scenario Outline: Login as voluntary, lider, coreteam
    Given I have entered "<e-mail>" into the email field
    And I have entered "<password>" into the password field
    When I press the "Iniciar Sesión" button
    Then the welcome message should be dispayed on the screen
Examples:
    | e-mail                                 | password   |
    | pruebadev@gmail.com                    | prueba123  |
    | lider.auxiliar@start.auxiliar.com      | lideraux1  |
    | lider.team.start@start.com             | lider1     |
    | core.team.auxiliar@star.auxiliar.com   | coreteam1  |
    | core.team.start@start.com              | coreteam1  |