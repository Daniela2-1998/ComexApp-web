<h1 align="center"> ComexApp versión web </h1>

> [!IMPORTANT]\
> Actualmente, el README y el proyecto se encuentran en desarrollo por lo que podrán encontrar secciones sin funcionalidad y descripción faltante.
> En este README encontrarán información relativa al proyecto, su estructura, funcionalidad y formas de implementación y de visualización.

## Descripción del proyecto:
ComexApp web es la versión web de un software desarrollador en 2022. Ambas versiones buscan facilitar las operaciones y los registros necesarios para que las empresas dedicadas al comercio internacional 
y/o nacional puedan agilizar sus tareas del día a día. El objetivo de ComexApp web es que las empresas puedan, a partir de un usuario con un rol en específico pueda acceder a determinadas funciones y 
gestionar el negocio junto a sus tareas. Es un sistema web moderno, con una interfaz visual atractiva e intuitiva para los usuarios, de forma tal que la navegación resulte una experiencia sencilla y 
fácil para todo el mundo.

### Roles:
* **Administrador**: tiene las mismas funciones que un **empleado**, pero de momento, también incluye secciones y posibilidades adicionales, como poder administrar usuarios.
* **Empleado**: cumple el resto de las funciones no exclusivas para el **administrador**, las cuáles podrás encontrar más abajo en la sección correspondiente.

## Tecnologías usadas:
* HTML
* CSS
* Bootstrap
* Javascript
* React
* Firebase

El proyecto se creó con React desde la consola con el comando:

```
npx create-react-app comexApp-web
```

Posteriormente, se ingresó en la carpeta creada para volver a abrir la consola e instalar los siguientes paquetes para poder ser usados en el proyecto:

```
// Instalación de Firebase.
npm install firebase

// Instalación del React Router Dom.
npm react-router-dom

// Instalación de Helmet para título e icono del navegador.
npm i react-helmet-async

// Instalación de Bootstrap para el uso de estilos con React.
npm i bootstrap

// Instalación de styled-components para poder crear componentes React con CSS.
npm install styled-components

// Instalación de SweetAlert2 para la creación de mensajes de alerta.
npm install -- save sweetalert2 sweetalert2-react-content

// Instalación de FontAwesome para usar con React.
npm install --save @fortawesome/react-fontawesome

// Instalación de react-player para los videos.
npm install react-player --save

```

Adicionalmente, se creó un link para poder tener acceso a iconos y logos de FontAwesome, el cuál se colocó dentro de la ruta **"/public/index.html"**, en la parte correspondiente a la etiqueta <head></head>. El código utilizado es el siguiente:

```
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous" referrerpolicy="no-referrer" />

```
Por otro lado, para mantener la privacidad de la conexión a la base de datos de Firebase, se utilizó un archivo **.env.local** que es utilizado por el archivo **FirebaseConfig.js** para realizar la conexión a la base de datos correspondiente.

## Funciones:
- [X] Inicio de sesión con usuario y contraseña.
- [X] Creación de registros para las tablas de la base de datos en Firestore y registro de mails y contraseñas para la creación de usuarios con Authentication.
- [X] Inicio con retorno del rol del usuario.
- [X] Sección de comercio internacional para gestión de exportadores, importadores, despachantes, agentes de carga, logística, contenedores y mercaderías. Permite visualización de registros,
consultas individuales, ingreso, modificación y eliminación de cada registro, creación de categorías y proveedores. 
- [ ] Sección de comercio nacional para la gestión de compradores, vendedores, proveedores, transporte, suministros y mercaderías.
- [ ] Sección de operaciones para la gestión de operaciones nacionales e internacionales y vinculación de stock con vendedor y contenedor, registro de cada operación, estado de cada viaje, seguimiento de
la logística, consultas y filtros de busqueda.
- [ ] Sección de stock general para la gestión de todos los productos de la empresa.
- [X] Sección de usuarios para la administración de los usuarios de forma apropiada y responsable. Únicamente disponible para los **administradores**.


## Deploy:
Podes visitar el proyecto en el siguiente link: https://comexapp-251c2.web.app
