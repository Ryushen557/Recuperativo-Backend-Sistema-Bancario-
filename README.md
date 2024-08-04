Sistema Bancario 
Este proyecto es una aplicación web desarrollada para la gestión de usuarios y cuentas bancarias.  Utiliza Node.js, Express.js, EJS y MySQL. A continuación se detallan las instrucciones para la instalación y uso del sistema.
Este sistema 
Requisitos
Node.js
XAMPP (incluye Apache y MySQL)
npm (Node Package Manager)

Pasos para la instalación del repositorio y configuración de la base de datos en XAMPP

1.	Clonar el repositorio:
Abrimos Visual Studio Code y seleccionamos una carpeta vacia, luego abrimos el terminal (Ctrl+Ñ), y copiar el código:
git clone https://github.com/Ryushen557/Recuperativo-Backend-Sistema-Bancario-

3.	Configurar XAMPP:
Inicia XAMPP y asegúrate de que Apache y MySQL estén corriendo, abre phpMyAdmin (normalmente accesible en http://localhost/phpmyadmin).
4.	Importar la base de datos:
En phpMyAdmin, crea una nueva base de datos llamada “sistema_bancario”, luego importa el archivo sistema_bancario.sql ubicado en el repositorio.
5.	Crear .env y colocar los valores indicados:
En la raíz del proyecto creamos el archivo .env y colocamos lo siguiente:

BASEDATOSNOMBRE = sistema_bancario
BASEDATOSCLAVE =
BASEDATOSHOST = localhost
BASEDATOSUSUARIO = root
AUTENTICADOR = fhfhdjashfj

6.	Instalar dependencias: 
Asegúrate de tener Node.js y npm instalados, ejecuta el siguiente código en caso que no lo tengas:
npm install
7.	Iniciar la aplicación:
En el terminal ejecita el código siguiente para ejecutar el servidor:
npm run dev
8.	Acceder a la aplicación:
Abre un navegador web y ve a http://localhost:3000/index , allí encontraras el menú principal del servidor



Autores:
Miguel Suarez.  MASV93
Rhonny Jaimes.   Ryushen557
Henry Hernandez.  RHONNYJAIMES 

Video Explicativo del Sistema:
https://youtu.be/vtjWPQtEwoA

Repositorio de GitHub:
https://github.com/Ryushen557/Recuperativo-Backend-Sistema-Bancario-


