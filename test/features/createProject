Feature: Create a project 
  In order to create a project on the platform
  As a core team on Start Americas Together
  I want to create a new project for the volunteers

Scenario Outline: Create a new Medio Ambiente project
  Given the core team user is logged at Start Americas Together homepage
  And I press the Proyectos button
  When I press the button to create a new proyect "CREAR PROYECTO"
  And I fill '<start_date>', '<end_date>','<name>' and '<description>' in the project card 
  And click on Crear Proyecto button
  Then I can see the project created in the Medio Ambiente projects

Examples:
    | start_date      | end_date   | name          | description            |
    | 10/12/2022      | 17/12/2022 | Plantar Vida  | Plantaremos arbolitos  |