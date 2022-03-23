# StarApp Frontend

<img alt="Logo" align="right" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu1tfJ2N0SENG9G86Avbt6qN59vXLDAFYggA5IrspoOX4Q_irRB18laR-At4dTKZyG6VI&usqp=CAU" width="20%" />

<details>
  <summary><strong>Comandos para Inicializar</strong></summary>

#### Comando para instalar Dependencias 

    npm install  

#### Comando para Ejecutar el Proyecto

    npm start
    
- *Comienza a escuchar en el puerto [localhost 5000](http://localhost:5000/)*

</details>

<details>
    <summary><strong>Comandos para instalar</strong></summary>

Abrir una ventana de comandos CMDD
Ejecutar los siguientes comandos para verificar la instalación
    node --version
    npm --version
Crear un proyecto con React Js
    npx create-react-app "Nombre de la aplicacion"
Abrir Visual studio Code y ejecutar el siguiente comando
    npm start
Comandos adicionales crear evento 
    npm i react-router-dom
    npm i reactstrap

</details>

<details>
    <summary><strong>Tecnologías usadas</strong></summary>


[![Material Version](https://img.shields.io/badge/Material--ui-v4.-blue)](https://v4.mui.com/)

Nos ofrece componentes para un desarrollo web más rápido y fácil. Construya su propio sistema de diseño o comience con el diseño de materiales.

[![React Version](https://img.shields.io/badge/React-17.0.2-9cf)](https://es.reactjs.org/)

React te ayuda a crear interfaces de usuario interactivas de forma sencilla. Diseña vistas simples para cada estado en tu aplicación, y React se encargará de actualizar y renderizar de manera eficiente los componentes correctos cuando los datos cambien.

[![Firebase Version](https://img.shields.io/badge/Firebase-4.5.0-yellowgreen)](https://console.firebase.google.com/u/0/?hl=es&pli=1)

Nos ofrece herramientas de Google para compilar infraestructuras de apps, mejorar la calidad de las apps y desarrollar tu empresa

[![Axios Version](https://img.shields.io/badge/Axios-0.21.4-red)](https://www.npmjs.com/package/axios)

Cliente HTTP basado en promesas para el navegador y el nodo.js

[![JavaScript Version](https://img.shields.io/badge/Javascript-ECMA%206-inactive)](https://www.w3schools.com/js/js_es6.asp)

ECMAScript 2015 fue la segunda revisión importante de JavaScript.

[![final-form Version](https://img.shields.io/badge/final--form-4.20.2-yellowgreen)](https://www.npmjs.com/package/final-form)

Para construir grandes formularios, con funcionalidades de validación usadas en este proyecto.

[![xlsx Version](https://img.shields.io/badge/xlsx-0.17.2-success)](https://www.npmjs.com/package/xlsx)

Analizador y escritor para varios formatos de hoja de cálculo. Puré-JS implementación de especificaciones oficiales, documentos relacionados y archivos de prueba. Énfasis en el análisis y la escritura robustez, compatibilidad de funciones de formato cruzado con una representación JS unificada, y compatibilidad del navegador ES3/ ES5 volver a IE6.

[![date-fns Version](https://img.shields.io/badge/date--fns-2.24.0-important)](https://www.npmjs.com/package/date-fns)

date-fns proporciona el conjunto de herramientas más completo, sencillo y consistente para manipular fechas JavaScript en un navegador y Node.js.

[![country-list-spanish Version](https://img.shields.io/badge/country--list--spanish-0.2.1-ff69b4)](https://www.npmjs.com/package/country-list-spanish)

Obtenga el nombre del país en español para cualquier código de país ISO 3166-1 alpha-2, y viceversa.

La lista completa de 262 nombres de países y códigos de este paquete se compone de la siguiente manera:

- 249 elementos de código asignados oficialmente.
- 12 elementos de código excepcionalmente reservados.
- 1 elemento de código adicional añadido para la funcionalidad.

[![react-export-excel Version](https://img.shields.io/badge/react--export--excel-0.5.3-blueviolet)](https://www.npmjs.com/package/react-export-excel)

Una biblioteca de exportación a Excel creada con y para React.

[![react-hook-form v7 Version](https://img.shields.io/badge/react--hook--form-0.5.3-green)](https://www.npmjs.com/package/react-hook-form)

Características
- Construido con el rendimiento, UX y DX en mente
- Abarca la validación de formas nativas
- Integración fuera de caja con bibliotecas de interfaz de usuario
- Tamaño pequeño y sin dependencias
- Sigue el estándar HTML para la validación
- Apoyo Yup, Zod, Superestructura, Joi, chaleco, clase-validador, io-ts, nope o personalizado

[![reactstrap Version](https://img.shields.io/badge/reactstrap-8.10.0-reed)](https://www.npmjs.com/package/reactstrap)

Componentes de React creadas para Bootstrap 5.

Si está usando Bootstrap 4, necesitará usar Reactstrap v8

</details>

<details>
    <summary><strong>Estructura de Carpetas y Folders</strong></summary>

- build

- node modules

- public

- src

    - **assets e images**: Imágenes necesarias, como las insignias, el logo del proyecto. Aquí se colocan las imágenes necesarias.

    - **components**: El proyecto está organizado por componentes, en los components se pueden colocar los archivos de las cuales está conformado el proyecto.
        - **componentes proyectos**: (ordenadas de mayor a menor tamaño o por jerarquia de componentes)
    
               - paginas: Este folder contiene las vistas de las páginas de proyectos.
               - organismos: Este folder contiene como componentes principales un Body, su Header y otros componentes que sean bastante amplios, que sirven como parte del layout de cada página, dependiendo del rol en el caso de "ProyectosAdmins" y "ProyectosVoluntarios". También se tiene "PuertaPermisos" que gestiona los accesos a los usuarios dependiendo del rol.
               - moleculas: Este folder "hijos" de un organismo o a otras "moleculas" como ser los Banners de cada vista, el contenido de los mismos, los formularios de crear y editar, entre otros.
               - atomos: Este folder contiene los componentes más pequeños como ser los botones.
                   (Esta division es algo subjetiva, sujeta al tamaño, dependencias y jerarquia de cada componente)
    
        - **CrearEvento**: Este folder contiene el componente "crearEvento.jsx" y el estilo del componente.
        - **footer**: el footer inicial actualmente no usado
        - **Formulario-evento.component**: Este folder contiene los archivos para el componente del Formulario de Crear Evento, que también es reutilizado en el Formulario de Editar Evento.
        - **Header**: 
            - header.jsx: contiene el componente principal de header
        - **Home**: 
            - Home.jsx: componente principal que contiene los demas componentes, home presenta LandingView si no se esta loggeado o EventosProximos en caso contrario
        - **Perfil**: Folder que contiene las 3 secciones presentes en la vista de Cuenta
        - **templates**: Este folder contiene algunos componentes altamente rehusables
        - **UserTable**: Users.ksx es el componente principal que contiene los otros componentes
    - **routes**
        - **routes** : definición de objeto que relaciona todos los componentes con una ruta
        - **AuthRoutesVerifier**: archivo que alberga funciones de verificación en las rutas
    - **screens:** Algunas de los componentes que se asocian con una ruta en routes
    - **initializer.js:** archivo de configuración para conexión con api de inicio de sesión con google
- .env
- package.json
- README.md

</details>

<details>
    <summary><strong>Arquitectura de software</strong></summary>

    El front esta basado en React el framework que elegimos este semestre.
    React maneja una arquitectura Llamada Flux, que es similar a MVC ya que también contiene , su modelo, vista y controladores pero esta pensada en un flujo de datos unidireccional. Los datos viajan desde la vista por medio de acciones y llegan a un Store desde el cual se actualizará la vista de nuevo.
    La Store sería lo más parecido al modelo de la aplicación. Guarda los datos y estado de la aplicación.
    No hay métodos en la Store que permitan modificar los datos en ella, eso se hace a través de dispatchers y acciones. 
    React utiliza JSX que permite incrustar etiquetas XML/HTML en el archivo de JavaScript, esto implica que JSX es una extensión de sintaxis para JavaScript es decir que en el mismo archivo JSX esistira codigo html javaScript y tambien css. Se tiene que usar un compilador como Babel, que recoge nuestro código JSX y lo compila para generar JavaScript que los navegadores puedan entender.

</details>

<details>
    <summary><strong>Breve explicacion para el agregado de nueva funcionalidad</strong></summary>

**Proyectos**

En el caso de que se quiera implementar un nuevo componente, se debe tomar en cuenta la funcionalidad que será implementada
y que rol de usuario podrá tener acceso a ella.
Por ejemplo, se conoce que el Core team tiene el acceso total a la aplicación al ser un superusuario dentro de la misma, 
el Líder tiene acceso al CRUD de Eventos pero no al de Proyectos y
el Voluntario únicamente tiene acceso a poder ingresar a la aplicación para participar dentro de los eventos y proyectos existentes. 
Por este motivo, se creó el componente "PuertaPermisos.js".
Para usar "PuertaPermisos" se debe importar: "PuertaPermisos" y los "SCOPES" de "map-permisos" en el componente en el que será usado.
(Ver "ContenidoProyecto.js" como ejemplo)

Si el componente es muy pequeño y ningun otro componente depende de este, se lo considera un "atomo".
Las moleculas reciben atomos u otras moleculas.
Los organismos reciben atomos moleculas u otros organismos.
Las paginas son las vistas principales que contienen a los demas componentes y su layout base.
Estas carpetas son para dividir los componentes semanticamente segun su jerarquia o tamaño en el virtual DOM de react.
(Se puede revisar esta metodología de estructuracion de componentes llamada "Atomic Design". Revisar el siguiente enlace:
https://andela.com/insights/structuring-your-react-application-atomic-design-principles/ )

En el caso de que se quiera agregar nuevos permisos o roles, se debe incluir en "map-permisos.js"

El consumo de Endpoints se hace desde los componentes "padre" de la carpeta de "componentes proyectos/paginas" y los datos consumidos y callbacks de funciones son enviados a través de props de react hacia los componentes "hijos" que necesiten los datos y callbacks.
    
    
**Eventos**

Crear un nuevo componente con la extensión ".jsx" y se llama en el archivo "EventsList.js"

</details>

### TechStack

<code><img height="30" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/firebase/firebase.png"></code>
<code><img height="30" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/javascript/javascript.png"></code>
<code><img height="30" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/visual-studio-code/visual-studio-code.png"></code>
<code><img height="30" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/git/git.png"></code>
<code><img height="30" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/terminal/terminal.png"></code>
