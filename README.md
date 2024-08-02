Sistema Bancario 
Este proyecto es una aplicación web desarrollada para la gestión de usuarios y cuentas bancarias. Utiliza Node.js, Express.js, EJS y MySQL. A continuación se detallan las instrucciones para la instalación y uso del sistema.

Requisitos
Node.js
XAMPP (incluye Apache y MySQL)
npm (Node Package Manager)

Instalación
Clonar el Repositorio

git clone https://github.com/Ryushen557/Sistema-Bancario-Segunda-Etapa.git
cd Sistema-Bancario-Segunda-Etapa

Instalar Dependencias

npm install

Configurar la Base de Datos

Inicia XAMPP y asegúrate de que Apache y MySQL están en funcionamiento.
Abre phpMyAdmin y crea una base de datos llamada sistema_bancario.
Importa el archivo SQL sistema_bancario.sql localizado en el directorio raíz del proyecto para configurar las tablas necesarias.

Iniciar la Aplicación

npm run dev

La aplicación estará disponible en http://localhost:3000/index

Funcionalidades

Usuarios

Crear (POST): Registro de nuevos usuarios.
Leer (GET): Autenticación y visualización de perfiles.
Actualizar (PUT): Modificación de datos personales.
Eliminar (DELETE): Eliminación de cuentas de usuario.

Cuentas Bancarias

Crear (POST): Creación de nuevas cuentas bancarias.
Leer (GET): Visualización de detalles de cuentas.
Actualizar (PUT): Modificación del balance y detalles.
Eliminar (DELETE): Eliminación de cuentas bancarias.

Cooperativas

Crear (POST): Registro de nuevas cooperativas.
Leer (GET): Visualización de detalles de cooperativas.
Actualizar (PUT): Modificación de información de la cooperativa.
Eliminar (DELETE): Eliminación de cooperativas.

Herramientas Utilizadas

Node.js: Entorno de ejecución para JavaScript en el servidor.
Express.js: Framework web para Node.js.
EJS (Embedded JavaScript): Motor de plantillas para generar HTML dinámico.
MySQL: Sistema de gestión de bases de datos relacional.
XAMPP: Paquete de software que incluye Apache y MySQL.
phpMyAdmin: Herramienta de administración para MySQL

Autores:
Miguel Suarez. 
Rhonny Jaimes. 
Henry Hernandez.
